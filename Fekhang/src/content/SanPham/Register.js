import React, { useState } from "react";
import customAxios from "../../CustomAxios/customAxios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { Alert, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./Scss/Login-Register.scss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const { user, loadUser, setUserFromToken } = useAuth();
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
    roleId: 4,
    managerId: null,
  });

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
      errors.password = "Password must have at least 1 Uppercase letter, 1 number and more than 5 characters ";
    }
    if (!validatePhoneNumber(formData.phone)) {
      errors.phone = "Invalid phone number (10 digits)";
    }
    if (!agreeTerms) {
      errors.agreeTerms = "You must agree to the terms and conditions";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await customAxios.post(
        "http://localhost:8080/cageshop/api/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      const { accessToken } = response.data;

      // Lưu token vào localStorage
      localStorage.setItem("token", accessToken);
      setUserFromToken(accessToken);
      navigate("/");
      console.log("Dữ liệu từ server:", response.data.accessToken);
    } catch (error) {
      // Kiểm tra xem error.response và error.response.data.message có tồn tại hay không
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Kiểm tra nếu chuỗi chứa từ 'email' hoặc 'username'
        if (
          error.response.data.message.includes("email") ||
          error.response.data.message.includes("username")
        ) {
          setError("Email hoặc tên người dùng đã tồn tại.");
        } else {
          setError("Đã xảy ra lỗi khi đăng kí.");
        }
      } else {
        // Nếu không có thông báo từ server, hiển thị thông báo lỗi chung
        setError("Đã xảy ra lỗi khi đăng kí.");
      }
    }
  };

  const handleReturnPage = () => {
    window.history.back();
  };

  return (
    <div className="vh-100" style={{padding:'100px 0 1250px 0',margin:'-70px 0',height:'300vh'}}>
      <div className="alert-container">
        {" "}
        {/* Thêm class "alert-container" để áp dụng CSS */}
        {error && <Alert severity="info">{error}</Alert>}
      </div>
      <section  >
        <div >
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0" >
                  <div className="col-md-6 col-lg-6 d-flex align-items-center" >
                    <div className="card-body p-4 p-lg-1.5 text-black" style={{backgroundColor:'#fff'}}>
                      <form onSubmit={handleRegister}>
                        <div className="d-flex justify-content-left align-items-center  ">
                          {/* <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i> */}
                          <div
                            className="mb-5 pb-lg-2"
                            style={{ color: "#393f81" }}
                          >
                            <Button
                              sx={{ fontSize: 18 }}
                              variant="contained"
                              
                              startIcon={<ArrowBackIosIcon />}
                              onClick={handleReturnPage}
                            >
                              BACK
                            </Button>
                          </div>
                        </div>
                        <p style={{textAlign:'center', fontSize:'40px', fontWeight:'bold'}}>REGISTER</p>
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
                            <div className="invalid-feedback">
                              {validationErrors.email}
                            </div>
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
                            <div className="invalid-feedback">
                              {validationErrors.name}
                            </div>
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
                        <div
                          className="form-outline mb-4"
                          style={{ position: "relative" }}
                        >
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
                            <option value="">-- Gender --</option>
                            <option value="Nam">Male</option>
                            <option value="Nữ">Female</option>
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
                            <div className="invalid-feedback">
                              {validationErrors.phone}
                            </div>
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

                        <React.Fragment>
                          <Button onClick={handleClickOpen("paper")}>
                          Store Terms
                          </Button>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            scroll={scroll}
                            aria-labelledby="scroll-dialog-title"
                            aria-describedby="scroll-dialog-description"
                          >
                            <DialogTitle id="scroll-dialog-title">
                            Store Terms
                            </DialogTitle>
                            <DialogContent dividers={scroll === "paper"}>
                              <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}
                              >
                                {[...new Array(1)]
                                  .map(
                                    () =>
                                      `
                                      
                                      Acceptance of Terms:
                                      
                                      Users must accept all terms and conditions before registering an account.
                                      Registration Information:
                                      
                                      Users are required to provide accurate, complete, and up-to-date registration information.
                                      Age Restrictions:
                                      
                                      Only individuals of a certain age are allowed to register. If the website is for users under 18, parental or guardian consent may be required.
                                      Account Security:
                                      
                                      Users are responsible for safeguarding their login information and personal details.
                                      Privacy Policy:
                                      
                                      Describes how user information will be collected, used, and protected, in accordance with the privacy policy.`
                                  )
                                  .join("\n")}
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>Đóng</Button>
                            </DialogActions>
                          </Dialog>
                        </React.Fragment>
                        <hr />

                        <div className="form-check mb-4">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="agreeTermsCheckbox"
                            checked={agreeTerms}
                            onChange={() => setAgreeTerms(!agreeTerms)}
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="agreeTermsCheckbox"
                          >
                           I agree to the store's terms.
                          </label>
                          {validationErrors.agreeTerms && (
                            <div className="invalid-feedback">
                              {validationErrors.agreeTerms}
                            </div>
                          )}
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Register Now
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 d-none d-md-block">
                    <img
                      src="https://images.unsplash.com/photo-1552826580-0d47cf898dee?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmlyZCUyMGNhZ2V8ZW58MHx8MHx8fDA%3D"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "0 1rem 1rem 0", height: "100%",marginLeft:'30px'}}
                    />
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

export default Register;
