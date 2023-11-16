import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import customAxios from '../../../CustomAxios/customAxios';
import { useAuth } from '../../SanPham/Context/AuthContext';

const AddEditStaff = () => {
  const {user} = useAuth();
  const { id } = useParams();
  const { staff, loadStaff, setStaffFromToken } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isEditing = !!id; // 

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    fullname: '',
    gender: '',
    password: '',
    phone: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmlJGeDFoDO2mUm5q3S8O_oc-8O4BYFWjNemRIdQ_6LQ&s',
    address: '',
    roleId: 3,
    managerId: user.userId
  });

  useEffect(() => {
    if (isEditing) {
      getStaff(id);
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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await customAxios.post(
        '/user/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        localStorage.setItem('token', response.data.accessToken);
        setStaffFromToken(response.data.accessToken);
        navigate(-1);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        if (error.response.data.message.includes('email') || error.response.data.message.includes('username')) {
          setError('Email or username already exists.');
        } else {
          setError('An error occurred while registering.');
        }
      } else {
        setError('An error occurred while registering.');
      }
    }
  };

  const getStaff = async (id) => {
    try {
      const response = await customAxios.get(`/user/list/${id}`);
      if (response.status === 200) {
        setFormData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateStaff = async () => {
    try {
      const response = await customAxios.put(`/user/update/${id}`, formData);
      if (response.status === 200) {
        navigate("/staffmanagement");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (isEditing) {
      updateStaff();
    } else {
      handleRegister(event);
    }
  };

  return (
    <div>
      <div className="alert-container">
        {error && <Alert severity="info">{error}</Alert>}
      </div>
      <section className="vh-100" style={{ backgroundColor: "#808080" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-6 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-1.5 text-black">
                      <h2>{id ? "Update Staff" : "Add New Staff"}</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-between align-items-center  mb-1 pb-1">
                          <div className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                            <Button sx={{ fontSize: 18 }} variant="contained"
                              style={{ backgroundColor: '#e0e0e0', color: '#212121' }}
                              startIcon={<ArrowBackIosIcon />} onClick={handleReturnPage}
                            >
                              BACK
                            </Button>
                          </div>
                          <span className="h1 fw-bold mb-0">
                            {id ? "Update Staff" : "Add New Staff"}
                          </span>
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          Email
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            id="form2Example17"
                            type="email"
                            name="email"
                            className="form-control form-control-lg"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Email'
                          />
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          UserName
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Username'
                          />
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          FullName
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Full Name'
                          />
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          Password
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            id="form2Example17"
                            className="form-control form-control-lg"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Password'
                          />
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          Giới Tính:
                        </label>
                        <div className="form-outline mb-4">
                          <select
                            className="form-control form-control-lg"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">-- Chọn Giới Tính --</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                          </select>
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          Phone Number
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Phone Number'
                          />
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          Address
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Address'
                          />
                        </div>
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">
                            {id ? "Update" : "Submit"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddEditStaff;
