


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ModalAddNews = (props) => {
    const { show, handleClose, handleUpdate } = props;
    const [News, setNews] = useState([]);


    const [formData, setFormData] = useState({
        name: '',
        title: '',
        info: '',
        shortinfo: '',
        date: '',
        img: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        let res = await axios.post('https://652b64fe4791d884f1fdc2d3.mockapi.io/swp/news', formData);

        if (res) {
            toast.success("Create succesful !");
            handleUpdate();
            handleClose();
        } else {
            toast.error("Error ..");
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Insert News</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Info</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Info"
                                name="info"
                                value={formData.info}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Short Info</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Short Info"
                                name="shortinfo"
                                value={formData.shortinfo}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Image URL"
                                name="img"
                                value={formData.img}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
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
    )
}
export default ModalAddNews