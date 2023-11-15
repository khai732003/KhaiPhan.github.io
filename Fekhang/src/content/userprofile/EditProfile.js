import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import customAxios from '../../CustomAxios/customAxios';
import { useAuth } from '../SanPham/Context/AuthContext';

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

    if (!formData.email.endsWith('@gmail.com')) {
      errors.email = 'Email must end with @gmail.com';
    }

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
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-between align-items-center  mb-1 pb-1">
                          <div className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                            <Button
                              sx={{ fontSize: 18 }}
                              variant="contained"
                              style={{ backgroundColor: '#e0e0e0', color: '#212121' }}
                              startIcon={<ArrowBackIosIcon />}
                              onClick={handleReturnPage}
                            >
                              BACK
                            </Button>
                          </div>
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          Email
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            id="form2Example17"
                            type="email"
                            name="email"
                            className={`form-control form-control-lg ${validationErrors.email ? 'is-invalid' : ''}`}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Email'
                          />
                          {validationErrors.email && (
                            <div className="invalid-feedback">{validationErrors.email}</div>
                          )}
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
                            readOnly
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
                            className={`form-control form-control-lg ${validationErrors.fullname ? 'is-invalid' : ''}`}
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Full Name'
                          />
                          {validationErrors.fullname && (
                            <div className="invalid-feedback">{validationErrors.fullname}</div>
                          )}
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          Password
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            id="form2Example17"
                            className={`form-control form-control-lg ${validationErrors.password ? 'is-invalid' : ''}`}
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Password'
                          />
                          {validationErrors.password && (
                            <div className="invalid-feedback">{validationErrors.password}</div>
                          )}
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
                            className={`form-control form-control-lg ${validationErrors.phone ? 'is-invalid' : ''}`}
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter Your Phone Number'
                          />
                          {validationErrors.phone && (
                            <div className="invalid-feedback">{validationErrors.phone}</div>
                          )}
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

export default EditProfile;
