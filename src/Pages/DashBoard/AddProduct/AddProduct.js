import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate=useNavigate()
    const onSubmit = data => {
        console.log(data)
        const image = data.productImage[0]
        const formData = new FormData();
        formData.append('image', image);
        console.log(process.env.REACT_APP_imgDbKey)
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgDbKey}`, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((result) => {

                if (result.data.display_url) {
                    const time = new Date().toLocaleDateString()
                    const productInfo = {
                        productName: data.productName,
                        originalPrice: data.productPrice,
                        resalePrice: data.resalePrice,
                        location: data.location,
                        productDescription: data.productDescription,
                        mobileNumber: data.mobileNumber,
                        yearOfPurchase: data.yearOfPurchase,
                        productImage: result.data.display_url,
                        postTime: time,
                        category: data.category.toUpperCase(),
                        email: user?.email

                    }

                    fetch(`http://localhost:5000/products`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(productInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.acknowledged) {
                                toast.success(`${productInfo?.productName} products successfully added`)
                                navigate("../my-product")
                                reset()
                            }
                        })
                        .catch(er => console.log(er))
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }
    return (
        <div className="flex flex-col items-center">
            <h2 className='text-2xl font-semibold text-secondary my-5'>Add Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='border-2 border-primary p-10 bg-slate-400 rounded-md shadow-lg'>
                <input {...register('productName', { required: true })} type="text" placeholder="Product Name" className="input input-bordered w-full max-w-xs mb-2" /><br></br>
                <input {...register('productPrice', { required: true })} type="number" placeholder="Product origianl Price" className="input input-bordered w-full max-w-xs mb-2" /><br></br>
                <input {...register('resalePrice', { required: true })} type="number" placeholder="Product Resale Price" className="input input-bordered w-full max-w-xs mb-2" /><br></br>
                <input {...register('mobileNumber', { required: true })} type="text" placeholder="Mobile Number" className="input input-bordered w-full max-w-xs mb-2" /><br></br>
                <input {...register('location', { required: true })} type="text" placeholder="Location" className="input input-bordered w-full max-w-xs mb-2" /><br></br>
                <input {...register('productDescription', { required: true })} type="text" placeholder="Description" className="input input-bordered w-full max-w-xs mb-2" /><br></br>
                <input {...register('yearOfPurchase', { required: true })} type="number" placeholder="Year of Purchase" className="input input-bordered w-full max-w-xs mb-2" /><br></br>
                <input {...register('productImage', { required: true })} type="file" className="file-input file-input-bordered file-input-dark w-full max-w-xs mb-2" /><br></br>
                <input {...register('category', { required: true })} type="text" placeholder="Category" className="input input-bordered w-full max-w-xs mb-2" /><br></br>
                <button type='submit' className='btn btn-primary w-full'>Add</button>
            </form>
        </div>
    );
};

export default AddProduct;