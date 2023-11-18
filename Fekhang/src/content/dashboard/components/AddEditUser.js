import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import customAxios from "../../../CustomAxios/customAxios";
import { useAuth } from "../../SanPham/Context/AuthContext";
import "../styles/addedituser.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


const AddEditUser = () => {
  const { id } = useParams();
  const { user, loadUser, setUserFromToken } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isEditing = !!id; // Check if 'id' is present in the URL
  const [validationErrors, setValidationErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    fullname: "",
    gender: "",
    password: "",
    phone: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmlJGeDFoDO2mUm5q3S8O_oc-8O4BYFWjNemRIdQ_6LQ&s",
    address: "",
    roleId: 2,
    managerId: user.userId,
  });

  useEffect(() => {
    if (isEditing) {
      getUser(id);
    }
  }, [id, isEditing]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setValidationErrors({
      ...validationErrors,
      [e.target.name]: null,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    return username.length > 5;
  };

  const validatePassword = (password) => {
    // Password validation logic (customize as needed)
    // Example: Password must have at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleReturnPage = () => {
    navigate(-1);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation logic
    const errors = {};
    if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!validateUsername(formData.name)) {
      errors.name = "Username must be more than 5 characters";
    }
    if (!validateUsername(formData.fullname)) {
      errors.fullname = "Fullname must be more than 5 characters";
    }
    if (!validatePassword(formData.password)) {
      errors.password = "Password must be strong";
    }
    if (!validatePhoneNumber(formData.phone)) {
      errors.phone = "Invalid phone number (10 digits)";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      const response = await customAxios.post("/user/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (
          error.response.data.message.includes("email") ||
          error.response.data.message.includes("username")
        ) {
          setError("Email or username already exists.");
        } else {
          setError("An error occurred while registering.");
        }
      } else {
        setError("An error occurred while registering.");
      }
    }
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
        navigate("/usermanagement");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isEditing) {
      updateUser();
    } else {
      handleRegister(event);
    }
  };

  return (
    <div>
    <div className="add-edit-container" style={{paddingTop:'70px', margin:'0'}}>
      <div className="form-add-edit">
        <form onSubmit={handleSubmit} style={{ width: 500 }}>
          <div
            className="d-flex justify-content-between align-items-center  mb-1 pb-1"
            style={{ paddingRight: 100 }}
          >
            <div className="mb-5 pb-lg-2" style={{ color: "#393f81", position:'absolute', left:'10%',top:'20%' }}>
              <Button
                sx={{ fontSize: 18 }}
                variant="outlined"
                
                startIcon={<ArrowBackIosIcon />}
                onClick={handleReturnPage}
              >
                BACK
              </Button>
            </div>
            <span className="h1 fw-bold mb-0">
              {id ? "Update User" : "Add New User"}
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
              className={`form-control form-control-lg ${
                validationErrors.email ? "is-invalid" : ""
              }`}
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter Your Email"
            />
            {validationErrors.email && (
              <div className="invalid-feedback">{validationErrors.email}</div>
            )}
          </div>

          <label className="form-label" htmlFor="form2Example17">
            User Name
          </label>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="form2Example17"
              className={`form-control form-control-lg ${
                validationErrors.name ? "is-invalid" : ""
              }`}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter Your Username"
            />
            {validationErrors.name && (
              <div className="invalid-feedback">{validationErrors.name}</div>
            )}
          </div>

          <label className="form-label" htmlFor="form2Example17">
            Full Name
          </label>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="form2Example17"
              className={`form-control form-control-lg ${
                validationErrors.fullname ? "is-invalid" : ""
              }`}
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              required
              placeholder="Enter Your FullName"
            />
            {validationErrors.fullname && (
              <div className="invalid-feedback">
                {validationErrors.fullname}
              </div>
            )}
          </div>

          <label className="form-label" htmlFor="form2Example17">
            Password
          </label>
          <div className="form-outline mb-4" style={{ position: "relative" }}>
            <input
              id="form2Example17"
              className={`form-control form-control-lg ${
                validationErrors.password ? "is-invalid" : ""
              }`}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter Your Password"
            />
            {validationErrors.password && (
              <div className="invalid-feedback">
                {validationErrors.password}
              </div>
            )}
            {/* Eye icon for password toggle */}
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
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
              className={`form-control form-control-lg ${
                validationErrors.phone ? "is-invalid" : ""
              }`}
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="Enter Your Phone Number"
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
              placeholder="Enter Your Address"
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
  );
};

export default AddEditUser;
