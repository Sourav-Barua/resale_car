import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillCheckCircleFill } from "react-icons/bs";


const AdvertisementCard = ({ advertised }) => {
    const { productImage, productName, productDescription, resalePrice, category } = advertised;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl p-5">
                <figure><img src={productImage} alt="Shoes" /></figure>
                <div className="card-body">
                    <div className='flex items-center'>
                        <h2 className="card-title">{productName}</h2>
                        {

                            advertised.verified && <BsFillCheckCircleFill className='text-primary ml-2'></BsFillCheckCircleFill>

                        }
                    </div>
                    <p>{productDescription.length > 100 ? `${productDescription.slice(0, 100)}...` : productDescription}</p>
                    <div className="card-actions justify-between">
                        <h2 className='text-lg font-semibold'>Price : {resalePrice} tk</h2>
                        <Link to={`../category/${category}`}>
                            <button className="btn btn-primary">see details</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertisementCard;