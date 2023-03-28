import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../AuthProvider/AuthProvider';

const BookingModal = ({ setModalProduct, modalProduct }) => {
    const { productName, resalePrice, mobileNumber, location, productImage, _id } = modalProduct;
    const { user } = useContext(AuthContext)
    const handleSubmit = event => {
        event.preventDefault()
        const form = event.target;
        const userName = form.userName.value;
        const userEmail = form.userEmail.value;
        const productPrice = form.productPrice.value;
        const mobileNumber = form.mobileNumber.value;
        const location = form.location.value;
        const bookingProduct = {
            userName,
            userEmail,
            productPrice,
            mobileNumber,
            location,
            productName,
            productImage,
            productId: _id
        }
        fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(bookingProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success(`${bookingProduct.productName} successfully added!`)
                    form.reset()
                    setModalProduct(null)
                }
            })
            .catch(er => console.log(er))
    }
    return (
        <div>
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="bookinModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="bookinModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{productName}</h3>
                    <form onSubmit={handleSubmit} className=''>
                        <input name='userName' defaultValue={user?.displayName} disabled placeholder="Product Name" className="input input-bordered w-full max-w-xs mb-2" /><br></br>
                        <input name='userEmail' disabled defaultValue={user?.email} placeholder="Product origianl Price" className="input input-bordered w-full max-w-xs mb-2" /><br></br>
                        <input name='productPrice' disabled defaultValue={resalePrice} placeholder="Product Resale Price" className="input input-bordered w-full max-w-xs mb-2" /><br></br>
                        <input name='mobileNumber' placeholder="Mobile Number" type="number" defaultValue={mobileNumber} className="input input-bordered w-full max-w-xs mb-2" required /><br></br>
                        <input name='location' type="text" defaultValue={location} placeholder="Location" className="input input-bordered w-full max-w-xs mb-2" required /><br></br>
                        <button type='submit' className='btn'>Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;