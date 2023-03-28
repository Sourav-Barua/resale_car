import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../Modal/BookingModal';
import CategoryCard from './CategoryCard';

const Category = () => {
    const categoriesProducts = useLoaderData();
    const [modalProduct, setModalProduct] = useState()
    console.log()
    return (
        <div>
            <p className='text-3xl font-semibold text-center text-primary my-5'>{categoriesProducts[0].category.toUpperCase()}</p>
            <div>
                {
                    categoriesProducts.map(product => <CategoryCard product={product} key={product.key} setModalProduct={setModalProduct}></CategoryCard>)
                }
            </div>
            <div>
                {
                    modalProduct && <BookingModal
                        setModalProduct={setModalProduct}
                        modalProduct={modalProduct}
                    />
                }
            </div>
        </div>
    );
};

export default Category;