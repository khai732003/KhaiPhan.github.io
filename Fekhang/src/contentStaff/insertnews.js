import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import customAxios from '../CustomAxios/customAxios';

const ModalAddNews = (props) => {
  const { show, handleClose, handleUpdate } = props;
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    info: '',
    shortinfo: '',
    img: null, // Update to store the File object
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'img') {
      // Handle file input separately
      const file = files[0];
      handleFileUpload(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileUpload = async (file) => {
    console.log('File:', file);
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'klbxvzvn'); // Replace with your Cloudinary upload preset
        const response = await axios.post('https://api.cloudinary.com/v1_1/dcr9jaohf/image/upload', formData);
        console.log('Response:', response); // Check the response from Cloudinary
        const uploadedImage = response.data.secure_url;
        console.log(uploadedImage);
        setFormData({
          ...formData,
          img: uploadedImage,
        });
       
  
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
console.log(formData);

  const handleSubmit = async () => {
    try {
      // Use formData.img for the uploaded image URL
      const res = await customAxios.post('/marketing/add', formData);

      if (res) {
        toast.success('Create successful!');
        handleUpdate();
        handleClose();
      } else {
        toast.error('Error ..');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form.');
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
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
              <Form.Label>Image Upload</Form.Label>
              <TextField
                type="file"
                name="img"
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton color="primary" component="label" htmlFor="upload-button">
                        <CloudUploadIcon />
                      </IconButton>
                      <input
                        type="file"
                        id="upload-button"
                        style={{ display: 'none' }}
                        accept="image/*"
                      />
                    </InputAdornment>
                  ),
                }}
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
  );
};

export default ModalAddNews;
