import React from 'react';
import toast from 'react-hot-toast';

const DeletingModal = ({ modalData, setModalData, refetch }) => {
    console.log(modalData)
    const handleSubmit = (id, productName) => {
        fetch(`http://localhost:5000/products/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success(`${productName} deleted successfuly`)
                    refetch()
                }
            })
    }
    return (
        <div>
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="deletingModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure to delete {modalData?.productName}?</h3>

                    <div className="modal-action">
                        <label onClick={() => handleSubmit(modalData.poductId ? modalData.poductId : modalData?._id, modalData?.productName)} htmlFor="deletingModal" className="btn">Yay!</label>
                        <label onClick={() => setModalData(null)} className="btn btn-secondary">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeletingModal;