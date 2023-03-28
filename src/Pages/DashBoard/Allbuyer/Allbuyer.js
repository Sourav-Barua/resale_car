import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loader from '../../Loader/Loader';
import AdminDeletingModal from '../../Modal/AdminDeletingModal.js/AdminDeletingModal';

const Allbuyer = () => {

    const { data: allBuyers = [], refetch, isLoading } = useQuery({
        queryKey: ["all-buyers"],
        queryFn: () => fetch("http://localhost:5000/all-buyers",)
            .then(res => res.json())
    })
    const [Id, setId] = useState(null)
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <p className='text-secondary text-2xl my-5 text-center font-semibold'>All Buyer</p>
            <div>
                {
                    allBuyers.length === 0 && <p className='text-accent text-center'>No Item Found</p>
                }
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <tbody>

                            {
                                allBuyers?.map((buyer, i) => <tr className='border-8 border-slate-300 md:table-row flex flex-col text-center'>
                                    <th className='hidden md:table-cell'>{i + 1}</th>
                                    <td>{buyer.email}</td>
                                    <td>{buyer.role}</td>
                                    <td>
                                        <label onClick={() => setId(buyer._id)} htmlFor="adminDeletingModal" className="btn btn-sm btn-error">DELETE</label>
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

export default Allbuyer;