import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const Category = () => {

    const { data: categories, isLoading } = useQuery({
        queryKey: ["products-category"],
        queryFn: () => fetch("http://localhost:5000/poducts-category")
            .then(res => res.json())
    })
    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='my-10 bg-slate-100 py-10'>
            <h2 className='text-3xl font-semibold text-primary text-center mb-5'>All Categories</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    categories.map((category, i) => <Link key={i} className='p-5 border-2 text-center text-lg font-semibold text-secondary hover:bg-slate-200 rounded-md cursor-pointer' to={`../category/${category}`}>{category.toUpperCase()}</Link>)
                }
            </div>
        </div>
    );
};

export default Category;