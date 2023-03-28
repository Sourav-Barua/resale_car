import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useAdminRoute from '../../../Hookes/useAdminRoute/useAdminRoute';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const OrderCard = ({ order, setModalData }) => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdminRoute(user?.email)
    const { productImage, productName, location, _id } = order;


    return (
        <tr className='border-8 border-slate-300 md:table-row flex flex-col text-center'>

            <td>
                <div className="md:flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={productImage} alt="" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{productName}</div>
                        <div className="text-sm opacity-50">{location}</div>
                    </div>
                </div>
            </td>
            <td>

                <span className="badge badge-ghost badge-sm">{order.resalePrice ? order.resalePrice : order.productPrice} tk</span>
            </td>
            <th>
                {
                    isAdmin ? <label htmlFor="deletingModal" onClick={() => setModalData(order)} className="btn btn-accent btn-error">DELETE</label> :
                        order.paid === true ? <button className='btn btn-primary text-white btn-sm'>paid</button> : <Link to={`../payment/${_id}`}><button className="btn btn-accent btn-xs">Pay</button></Link>

                }

            </th>
        </tr>
    );
};

export default OrderCard;