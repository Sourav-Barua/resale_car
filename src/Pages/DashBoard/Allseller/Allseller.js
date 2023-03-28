import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Loader from '../../Loader/Loader';
import AdminDeletingModal from '../../Modal/AdminDeletingModal.js/AdminDeletingModal';

const Allseller = () => {
    const { data: allSellers = [], refetch, isLoading } = useQuery({
        queryKey: ["all-sellers"],
        queryFn: () => fetch("http://localhost:5000/all-sellers")
            .then(res => res.json())
    })
    const [Id, setId] = useState(null)
    const handleVerified = (email, id, verified) => {

        const user = {
            isVerified: verified
        }
        fetch(`http://localhost:5000/products/${email}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    fetch(`http://localhost:5000/users/verify/${id}`, {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success(verified ? "verified!" : "unverified")
                                refetch()
                            }

                        })
                        .catch(er => console.log(er))
                }
            })
            .catch(er => console.log(er))
    }
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <p className='text-secondary text-2xl my-5 text-center font-semibold'>All seller</p>
            <div>
                {
                    allSellers.length === 0 && <p className='text-accent text-center'>No Item Found</p>
                }
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <tbody>

                            {
                                allSellers?.map((seller, i) => <tr className='border-8 border-slate-300 md:table-row flex flex-col text-center'>
                                    <th className='hidden md:table-cell'>{i + 1}</th>
                                    <td>{seller?.name}</td>
                                    <td>{seller.email}</td>
                                    <td>
                                        {
                                            seller.verified === true ? <button onClick={() => handleVerified(seller.email, seller._id, false)} className='btn btn-sm btn-primary'>
                                                verfied
                                            </button> :
                                                <button onClick={() => handleVerified(seller.email, seller._id, true)} className='btn btn-sm btn-accent'>
                                                    Unverfied
                                                </button>

                                        }

                                    </td>
                                    <td>
                                        <label onClick={() => setId(seller._id)} htmlFor="adminDeletingModal" className="btn btn-sm btn-error">DELETE</label>
                                    </td>
                                </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            {
                Id && <AdminDeletingModal
                    id={Id}
                    setId={setId}
                    refetch={refetch}
                ></AdminDeletingModal>
            }
        </div>
    );
};

export default Allseller;