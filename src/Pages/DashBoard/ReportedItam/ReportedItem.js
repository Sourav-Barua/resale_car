import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DeletingModal from '../../Modal/DeletingModal';
import OrderCard from '../MyOrders/OrderCard';

const ReportedItem = () => {
    const [modalData, setModalData] = useState(null)

    const { data: reporteItems = [], refetch } = useQuery({
        queryKey: ["report"],
        queryFn: () => fetch("http://localhost:5000/report")
            .then(res => res.json())
    })

    console.log(reporteItems)
    return (
        <div>
            <p className='text-secondary text-2xl my-5 text-center font-semibold'>Reported Item</p>
            <div>
                {
                    reporteItems.length === 0 && <p className='text-accent text-center'>No Item Found</p>
                }
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">


                        <tbody>
                            {
                                reporteItems?.map(order => <OrderCard setModalData={setModalData} key={order._id} order={order}></OrderCard>)
                            }
                        </tbody>


                    </table>
                </div>
            </div>
            {
                modalData && <DeletingModal
                    setModalData={setModalData}
                    modalData={modalData}
                    refetch={refetch}
                ></DeletingModal>
            }
        </div>
    );
};

export default ReportedItem;