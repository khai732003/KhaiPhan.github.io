import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../header/Header.scss";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../content/SanPham/Context/CartContext";
import { useLocation } from "react-router-dom";
import { useAuth } from "../content/SanPham/Context/AuthContext";
import { styled } from "@mui/material/styles";
import Badge, { BadgeProps } from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Stack from "@mui/material/Stack";
import BookIcon from "@mui/icons-material/Book";
import Cart from "../content/SanPham/Cart";
import NavbBar from "../content/dashboard/components/NavbBar";
function Header(props) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isCartOpen, toggleCart } = useCart();
  const isLoggedIn = user;
  const location = useLocation();
  const [hasCusPro, setHasCusPro] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Kiểm tra xem người dùng có đang ở trang đăng nhập hoặc đăng ký không
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isSuccess = location.pathname === "/paysuccess";
  // const isDashBoard = location.pathname === '/dashboard';
  const isUserManager = location.pathname === "/usermanagement";
  const isStaffManager = location.pathname === "/staffmanagement";
  const isAdmin = location.pathname === "/admin";
  const isAdminProfile = location.pathname === "/adminprofile";
  const isAddUser = location.pathname === "/add-user";
  // const isUpdateUser = location.pathname === "/update/*";
  const userIdPattern = /^\/update-user\/\d+$/;
  const isUpdateUser = userIdPattern.test(location.pathname);
  const isRevenue = location.pathname === "/revenue";
  const isTimeLine = location.pathname === "/timeline";
  const isProductManager = location.pathname === "/productmanagement";
  const isAddProduct = location.pathname === "/addproduct";
  const isUpdateProduct = location.pathname === "/update-product";
  const isAddAccessories = location.pathname === "/addaccessories";
  // const isUpdateProduct = location.pathname === "/update/*";
  // Sửa thành regex kiểm tra đường dẫn "/update-product" hoặc "/update/{số}"
  const isUpdateProduct1 = /^\/update-product\/\d+$/.test(location.pathname);
  const isError = location.pathname === "/error";
  const isVoucher = location.pathname === "/voucher";
  const isPaypal = location.pathname === "/paypal";
  // const isListConfirm = location.pathname === "/listconfirm";
  const isAddEditUser = location.pathname === "/add-edit-user";
  const isAddCategory = location.pathname === "/add-edit-category";
  const isFeedBack = location.pathname === "/list-feedback";
  const islistdevered = location.pathname === "/listdelivered";
  const isVoucherList = location.pathname === "/list-voucher";
  const isCustomList = location.pathname === "/custom-list";
  const isAddShape = location.pathname === "/add-shape";
  const isAddMaterial = location.pathname === "/add-material";
  const isAddSize = location.pathname === "/add-size";
  const isMaterial = location.pathname === "/list-material";
  const isSize = location.pathname === "/list-size";
  const isShape = location.pathname === "/list-shape";
  const isUpdateSize = /^\/update-size\/\d+$/.test(location.pathname);
  const isUpdateShape = /^\/update-shape\/\d+$/.test(location.pathname);
  const isUpdateMaterial = /^\/update-material\/\d+$/.test(location.pathname);
  const isCustomProductManagement = location.pathname === "/custom-product";
  const isNotConfirm = location.pathname === "/listnotconfirm";

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const handleOnLogout = () => {
    logout();
  };

  const handleCustome = () => {
    const cusProId = localStorage.getItem("cusPro");
    navigate(`/customdetail/${cusProId}`);
  };

  useEffect(() => {
    // Kiểm tra xem có "cusPro" trong Local Storage không
    const cusProInLocalStorage = localStorage.getItem("cusPro");
    setHasCusPro(!!cusProInLocalStorage);
  }, [localStorage.getItem("cusPro")]);

  if (isLoginPage || isRegisterPage || isSuccess || isPaypal || isError) {
    return null;
  }

  if (
    isUserManager ||
    isNotConfirm ||
    isAdmin ||
    isAddUser ||
    isUpdateUser ||
    isRevenue ||
    isProductManager ||
    isAddProduct ||
    isStaffManager ||
    isVoucher ||
    isAdminProfile ||
    isAddAccessories ||
    isTimeLine ||
    // isListConfirm ||
    isAddEditUser ||
    isAddCategory ||
    isFeedBack ||
    islistdevered ||
    isVoucherList ||
    isUpdateProduct1 ||
    isUpdateProduct ||
    isCustomList ||
    isAddShape ||
    isAddMaterial ||
    isAddSize ||
    isMaterial ||
    isShape ||
    isSize ||
    isUpdateSize ||
    isUpdateShape ||
    isUpdateMaterial ||
    isCustomProductManagement
  ) {
    return <NavbBar />;
  }

  return (
    <div className="fixed-header">
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ padding: "0 0 " }}
      >
        <Container
          fluid
          style={{ backgroundColor: "white", paddingRight: 0, paddingLeft: 0 }}
        >
          <Navbar.Brand className="brand " to="\">
            <Link to="/">
              <img
                className="logo"
                src="https://static.vecteezy.com/system/resources/previews/008/462/030/non_2x/minimalist-simple-bird-home-logo-design-free-vector.jpg"
              ></img>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "200px" }}
              navbarScroll
            >
              <NavLink to="/" activeClassName="active" className="nav-link">
                HOME PAGE
              </NavLink>
              <NavLink to="/Gioithieu" className="nav-link">
                INTRODUCTION
              </NavLink>

              <div cla>
                <div
                  className="custom-dropdown"
                  onMouseEnter={toggleDropdown}
                  onMouseLeave={toggleDropdown}
                >
                  <NavLink
                    to="/sanpham"
                    style={{ textDecoration: "none", color: "#535b62" }}
                    className="nav-link"
                  >
                    <span style={{ paddingRight: "5px" }}>PRODUCTS</span>
                    <span class="bi bi-chevron-down"></span>
                  </NavLink>

                  {isDropdownVisible && (
                    <div className="dropdown-content">
                      <NavLink to="/sanpham">PRODUCT PAGE</NavLink>
                      <NavLink to="/custom">CUSTOM PAGE</NavLink>
                    </div>
                  )}
                </div>
              </div>

              <div className="custom-dropdown">
                <NavLink
                  to="/dichvu"
                  style={{ textDecoration: "none", color: "#535b62" }}
                  className="nav-link"
                >
                  SERVICE
                </NavLink>
              </div>
              <NavLink to="/news" activeClassName="active" className="nav-link">
                NEWS
              </NavLink>
              <NavLink
                to="/contact"
                activeClassName="active"
                className="nav-link"
              >
                CONTACT
              </NavLink>
            </Nav>

            <Nav className="toggle-avatar-cart">
              {/* Nút giỏ hàng */}

              {isLoggedIn ? (
                <div className="wel-user">
                  <div className="wel">
                    Welcome to {user.fullName}
                    {user.image}
                  </div>
                  <div className="custom-dropdown">
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                      className="avatar"
                    >
                      <Avatar alt="User Avatar" src={user.image} />
                    </StyledBadge>

                    <div className="dropdown-menu">
                      <NavLink to="/profile" className="dropdown-item nav-link">
                        Profile
                      </NavLink>
                      {user.role === "ADMIN" && (
                        <NavLink to="/admin" className="dropdown-item nav-link">
                          Admin Dashboard
                        </NavLink>
                      )}

                      {user.role === "MANAGER" && (
                        <NavLink
                          to="/staffmanagement"
                          className="dropdown-item nav-link"
                          onClick={() => navigate("/staffmanagement")}
                        >
                          Management Dashboard
                        </NavLink>
                      )}

                      {user.role === "STAFF" && (
                        <>
                          <NavLink
                            to="/staffnew"
                            className="dropdown-item nav-link"
                            onClick={() => navigate("/staffnew")}
                          >
                            NEW MARKETING
                          </NavLink>
                          <NavLink
                            to="/listconfirm"
                            className="dropdown-item nav-link"
                            onClick={() => navigate("/staffnew")}
                          >
                            LIST CONFIRMING
                          </NavLink>
                        </>
                      )}

                      {user.role === "CUSTOMER" && (
                        <>
                          <NavLink
                            to="/history"
                            className="dropdown-item nav-link"
                          >
                            HISTORY ORDER
                          </NavLink>
                          <NavLink
                            to="/localorder"
                            className="dropdown-item nav-link"
                          >
                            MY ORDER
                          </NavLink>
                        </>
                      )}
                      <div
                        className="dropdown-item nav-link"
                        onClick={handleOnLogout}
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Hiển thị các tùy chọn đăng nhập/đăng ký khi không có người dùng đăng nhập
                <div className="custom-dropdown">
                  <div className="login-register-user">
                    <div className="nav-link-login">
                      <NavLink to="/login" activeClassName="active">
                        <Stack direction="row" spacing={2}>
                          <Button>SIGN IN</Button>
                        </Stack>
                      </NavLink>
                    </div>
                    <div className="nav-link-register">
                      <NavLink to="/register" activeClassName="active">
                        <Stack direction="row" spacing={2}>
                          <Button>SIGN UP</Button>
                        </Stack>
                      </NavLink>
                    </div>
                  </div>
                </div>
              )}
              <IconButton
                aria-label="cart"
                onClick={toggleCart}
                className="cart"
              >
                <ShoppingCartIcon />
                <Cart />
              </IconButton>
              {hasCusPro && (
                <Button onClick={handleCustome} style={{ width: "3rem" }}>
                  <BookIcon />
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
