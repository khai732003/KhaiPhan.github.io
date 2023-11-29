import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Container, Grid, Paper, TextField, Typography, Select, MenuItem } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import customAxios from '../../CustomAxios/customAxios';
import { useAuth } from '../SanPham/Context/AuthContext';
import './editprofile.scss';

const EditProfile = () => {
  const { id } = useParams();
  const { user, loadUser, setUserFromToken } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isEditing = !!id; // Check if 'id' is present in the URL

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    fullname: '',
    gender: '',
    password: '',
    phone: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmlJGeDFoDO2mUm5q3S8O_oc-8O4BYFWjNemRIdQ_6LQ&s',
    address: '',
    roleId: 2,
    managerId: user.userId
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      getUser(id);
    }
  }, [id, isEditing]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReturnPage = () => {
    navigate(-1);
  };

  const validateForm = () => {
    const errors = {};

    // if (!formData.email.endsWith('@gmail.com')) {
    //   errors.email = 'Email must end with @gmail.com';
    // }

    if (!/^[a-zA-Z\s]*$/.test(formData.fullname) || formData.fullname.length >= 200) {
      errors.fullname = 'Fullname must not contain numbers and should be less than 200 characters';
    }

    if (!/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(formData.password)) {
      errors.password = 'Password must have 1 uppercase letter, 1 number, and be at least 6 characters long';
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone must contain exactly 10 digits';
    }

    try {
      new URL(formData.image);
    } catch (error) {
      errors.image = 'Invalid image URL';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getUser = async (id) => {
    try {
      const response = await customAxios.get(`/user/list/${id}`);
      if (response.status === 200) {
        setFormData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await customAxios.put(`/user/update/${id}`, formData);
      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      if (isEditing) {
        updateUser();
      }
    }
  };

  return (
    <div style={{backgroundColor: 'rgb(248,248,255)'}} className='EditProfile-container'>
      <div className="alert-container">
        {error && <Alert severity="info">{error}</Alert>}
      </div>

      <Container py={5} style={{ backgroundColor: '#fff' }}>

        <form onSubmit={handleSubmit} style={{ paddingTop: '100px' }}>


          <Button
     
            sx={{ fontSize: 18 }}
            variant="contained"
            style={{position:'absolute', top:'15%',left:'5%' }}
            startIcon={<ArrowBackIosIcon />}
            onClick={handleReturnPage}
          >
            BACK
          </Button>


          <Typography variant="h4" sx={{ mb: 4 }}>Edit Profile</Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            error={!!validationErrors.email}
            helperText={validationErrors.email}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            readOnly
            style={{ margin: '20px 0' }}
          />
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            required
            error={!!validationErrors.fullname}
            helperText={validationErrors.fullname}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            error={!!validationErrors.password}
            helperText={validationErrors.password}
            style={{ margin: '20px 0' }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            error={!!validationErrors.phone}
            helperText={validationErrors.phone}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            style={{ margin: '20px 0' }}
          />
          <Select
            label="Gender"
            variant="outlined"
            fullWidth
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            style={{ margin: '0px 0 20px 0 ' }}
          >
            <MenuItem value="">-- Select Gender --</MenuItem>
            <MenuItem value="Nam">Male</MenuItem>
            <MenuItem value="Nữ">Female</MenuItem>
          </Select>
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            fullWidth
            style={{ margin: '0px 0 20px 0' }}
          >
            {id ? "Update" : "Submit"}
          </Button>
        </form>
      </Container>

    </div>
  );
};

export default EditProfile;
