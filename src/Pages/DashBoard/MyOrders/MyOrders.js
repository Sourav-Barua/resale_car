import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Loader from '../../Loader/Loader';
import OrderCard from './OrderCard';

const MyOrders = () => {
    const { user } = useContext(AuthContext)

    const { data: myOrders = [], isLoading } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: () => fetch(`http://localhost:5000/bookings/${user?.email}`, {
            headers: {
                auhtorization: `Bearer ${localStorage.getItem("AccessToken")}`
            }
        })
            .then(res => res.json())
    })
    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <p className='text-2xl font-semibold text-center text-secondary my-5'>My Orders</p>
            <div className="overflow-x-auto w-full">
                {
                    myOrders?.length === 0 && <p className='text-accent text-center'>No Item Found</p>
                }
                <table className="table w-full">


                    <tbody>
                        {
                            myOrders?.map(order => <OrderCard key={order._id} order={order}></OrderCard>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyOrders;