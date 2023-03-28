import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutForm = ({ paymentData }) => {
    const [cardError, setCardError] = useState("")
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [processing, setProcessing] = useState(false)

    const stripe = useStripe();
    const elements = useElements();
    const { productPrice, userEmail, productName, _id, productId } = paymentData;
    console.log(productId)

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("AccessToken")}`
            },
            body: JSON.stringify({ productPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [productPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
        } else {
            setCardError("")
        }
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: userEmail,
                        name: productName
                    },
                },
            },

        );

        if (confirmError) {
            setCardError(confirmError.message)
        }
        if (paymentIntent.status === "succeeded") {
            console.log(paymentIntent)
            const paymentInfo = {
                productName: productName,
                email: userEmail,
                transactionId: paymentIntent.id,
                productId
            }

            fetch("http://localhost:5000/payments", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(paymentInfo)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        fetch(`http://localhost:5000/bookings/${_id}`, {
                            method: "PUT"
                        })
                            .then(res => res.json())
                            .then(data => {
                                setTransactionId(paymentIntent.id)
                            })
                            .catch(er => console.log(er))
                    }
                })
                .catch(er => console.log(er))

        }

        setProcessing(false)
    };







    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" className="btn btn-sm btn-secondary my-2" disabled={!stripe || !clientSecret || processing}>
                Pay
            </button>
            <p className="text-xs text-rose-600">{cardError}</p>
            {
                transactionId && <div>
                    <p className="text-xl font-semibold text-success">Your Payment successfully completed!!</p>
                    <p className="font-semibold">Tour Transaction id: <span className="font-bold">{transactionId}</span></p>
                </div>
            }
        </form>
    );
};
export default CheckoutForm;