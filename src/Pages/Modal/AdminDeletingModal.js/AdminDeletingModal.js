import React from 'react';
import toast from 'react-hot-toast';

const AdminDeletingModal = ({ id, setId, refetch }) => {
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data?.acknowledged) {
                    toast.success("Success deleted the users!")
                    refetch()
                }
            })
            .catch(er => console.log(er))
    }
    return (
        <div>
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="adminDeletingModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are sure to delete?</h3>
                    <div className="modal-action">
                        <label onClick={() => handleDelete(id)} htmlFor="adminDeletingModal" className="btn">Yay!</label>
                        <label onClick={() => setId(null)} className="btn btn-secondary">Cancel</label>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDeletingModal;