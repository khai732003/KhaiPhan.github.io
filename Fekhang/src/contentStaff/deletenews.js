import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ModalDelete = (props) => {
    const { show, handleClose, idToDelete, handleDelete } = props;

    const handleDeleteNews = async () => {
        try {
            const res = await axios.delete(`https://6821-2402-800-637c-840e-79ac-59ee-21bd-28ff.ngrok.io/cageshop/api/marketing/delete/${idToDelete}`);
            if (res)
                handleDelete();
            toast.success('Delete sucessful !');
            handleClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete News</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this news item?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteNews}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default ModalDelete;
