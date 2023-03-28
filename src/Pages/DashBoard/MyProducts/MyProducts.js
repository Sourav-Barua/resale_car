import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import DeletingModal from '../../Modal/DeletingModal';

const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const [modalData, setModalData] = useState(null)



    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ["my-products"],
        queryFn: () => fetch(`http://localhost:5000/my-products/${user?.email}`, {
            headers: {
                auhtorization: `Bearer ${localStorage.getItem("AccessToken")}`
            }
        })
            .then(res => res.json())
    })

    const handleAdvertise = (id, advertise) => {
        const product = {
            isAdvertised: advertise
        }
        fetch(`http://localhost:5000/advertisment/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                refetch()
            })
    }


    console.log(myProducts)
    return (
        <div>
            <h2 className='text-secondary text-center font-semibold my-5 text-2xl'>My Products</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <tbody>

                        {
                            myProducts?.map(product => <tr key={product._id} className="border-8 border-slate-300 md:table-row flex flex-col text-center">

                                <td>
                                    <div className="md:flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product?.productImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product?.productName}</div>
                                            <div className="text-sm opacity-50">{product?.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {product?.resalePrice} tk
                                </td>
                                <td>
                                    <button className='btn btn-primary btn-sm'>{product.paid ? "SOLD" : "AVAILABLE"}</button>
                                </td>
                                <td>
                                    <label onClick={() => setModalData(product)} htmlFor="deletingModal" className="btn btn-error btn-xs">Delete</label>
                                </td>
                                <td>
                                    {
                                        !product.paid && <>
                                            {
                                                product.advertise === true ? <label onClick={() => handleAdvertise(product._id, false)} className="btn btn-dark btn-xs">undo</label> : <label onClick={() => handleAdvertise(product._id, true)} className="btn btn-secondary btn-xs">Advertised</label>
                                            }
                                        </>
                                    }
                                </td>

                            </tr>
                            )
                        }


                    </tbody>


                </table>
            </div>
            {
                modalData && <DeletingModal
                    modalData={modalData}
                    setModalData={setModalData}
                    refetch={refetch}
                ></DeletingModal>
            }
        </div>
    );
};

export default MyProducts;