import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Advertisement from '../Advertisement/Advertisement';
import Banner from '../Bannner/Banner';
import Category from '../Category/Category';

const Home = () => {
    const { setDrawer } = useContext(AuthContext)
    setDrawer(false)
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <Advertisement></Advertisement>
        </div>
    );
};

export default Home;