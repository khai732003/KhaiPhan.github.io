import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../../CustomAxios/customAxios";
import { useAuth } from "./Context/AuthContext";
import "./Scss/Login-Register.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, FormControlLabel, Checkbox } from "@mui/material";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = ({ currentPath }) => {
  const orderId = localStorage.getItem("orderId");
  const { user, loadUser, setUserFromToken } = useAuth();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
   const [usernameError, setUsernameError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    name: localStorage.getItem("rememberedUsername") || "",
    password: "",
  });

  useEffect(() => {
    const rememberPassword = localStorage.getItem("rememberPassword");
    if (rememberPassword === "true") {
      setShowPassword(true);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRememberPasswordChange = () => {
    setRememberMe((prevRememberMe) => !prevRememberMe);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.name) {
      setPasswordError("Both username and password are required.");
      return;
    }
    try {
      const response = await customAxios.post("/user/authenticate", formData);
      const token = response.data;
      localStorage.setItem("token", token);
      setUserFromToken(token);
      localStorage.setItem("success", "true"); // Set the "success" item in localStorage
      setSuccessMessage("Login successful!");

      localStorage.setItem("isReturningFromLogin", "true");

      const toBuyPath = localStorage.getItem("toBuy");

      if (toBuyPath) {
        navigate(toBuyPath);
      } else if (currentPath) {
        navigate(currentPath);
      } else {
        navigate(-1);
      }
      if (rememberMe) {
        localStorage.setItem("rememberedUsername", formData.name);
        localStorage.setItem("rememberPassword", "true");
      } else {
        localStorage.removeItem("rememberedUsername");
        localStorage.removeItem("rememberPassword");
      }
      // Your additional code using scrollTopValue
      const myElement = document.getElementById("yourElementId");
      if (myElement) {
        const scrollTopValue = myElement.scrollTop;
        // Your additional code using scrollTopValue
      }
    } catch (error) {
      console.error("Login failed:", error);
      setSuccessMessage(""); 
      setPasswordError("Invalid Username or Password.");
      setUsernameError("Invalid Username or Password.");
      
    }
  };

  const handleReturnPage = () => {
    navigate(-1);
  };

  const handleOnRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleCloseSuccessMessage = (event, reason) => {
    if (reason === "clickaway" || !event.currentTarget) {
      return;
    }
    setSuccessMessage("");
  };

  return (
    <div>
      <section className="vh-100" >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" >
                <div className="row g-0" >
                  <div className="col-md-6 col-lg-5 d-none d-md-block" >
                    <img
                      src="https://images.unsplash.com/photo-1552826580-0d47cf898dee?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmlyZCUyMGNhZ2V8ZW58MHx8MHx8fDA%3D"
                      alt="login form"
                      className="img-fluid rounded-left"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center"  >
                    <div className="card-body p-4 p-lg-5 text-black" style={{ backgroundColor: "#fff" }}>
                      <form onSubmit={handleLogin}>
                      <Stack spacing={2} style={{ marginBottom: "20px" }}>
                          {/* Display error message if there's an issue */}
                          {passwordError && (
                            <Alert
                              severity="error"
                              onClose={() => setPasswordError("")}
                            >
                              {passwordError}
                            </Alert>
                          )}
                        </Stack>
                        <div className="d-flex justify-content-between mb-3 pb-1">
                          <span className="h1 fw-bold mb-0">LOGIN</span>
                          <div
                            className="mb-5 pb-lg-2"
                            style={{ color: "#393f81" }}
                          >
                            <Button
                              sx={{ fontSize: 18 }}
                              variant="contained"
                              
                              startIcon={<ArrowBackIcon />}
                              onClick={handleReturnPage}
                            >
                              BACK
                            </Button>
                          </div>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>
                        <div className="form-outline mb-4">
                          <TextField
                            id="form2Example17"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Your Username"
                            error={!!usernameError}
                          />
                        </div>
                        <div
                          className="form-outline mb-4"
                          style={{ position: "relative" }}
                        >
                          <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            id="form2Example27"
                            className={`form-control form-control-lg ${
                              passwordError ? "is-invalid" : ""
                            }`}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Your Password"
                            error={!!passwordError}
                            // helperText={passwordError}
                          />
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

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={rememberMe}
                              onChange={handleRememberPasswordChange}
                            />
                          }
                          label="Remember Me"
                        />

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>

                        {/* <Stack sx={{ width: "100%" }} spacing={2}>
                          <Alert onClose={() => {}}>
                            This is a success alert — check it out!
                          </Alert>
                          <Alert
                            action={
                              <Button color="inherit" size="small">
                                UNDO
                              </Button>
                            }
                          >
                            This is a success alert — check it out!
                          </Alert>
                        </Stack> */}
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                          onClick={handleOnRegister}
                        >
                          Don't have an account?{" "}
                          <a href="#!" style={{ color: "#E33539" }}>
                            Register here
                          </a>
                        </p>
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

export default Login;
