import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe('pk_test_51MpacUKbVSX1XrbywqnRXHbAHLN0cNvnzXaFdCo9hZbEFQjJBJn6pINwl25FvVfPyMjfiRWGDDJhgFElDwjwyNLg00TucPo3Te');
const Payment = () => {
    const paymentData = useLoaderData()


    return (
        <div className='w-96 mx-auto border-2 bg-slate-100 mt-10 p-5'>
            <h2 className='text-xl font-semibold text-purple-700 my-2'>Payment : {paymentData?.productName}</h2>
            <h3 className='font-semibold my-2'>Amount : {paymentData.productPrice} tk</h3>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        paymentData={paymentData}
                    />
                </Elements>

            </div>
        </div>
    );
};

export default Payment;