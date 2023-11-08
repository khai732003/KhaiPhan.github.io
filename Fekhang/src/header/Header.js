import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../header/Header.scss'
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../content/SanPham/Context/CartContext';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../content/SanPham/Context/AuthContext';

import Cart from '../content/SanPham/Cart';
import NavBar from '../content/dashboard/components/NavbBar';
function Header(props) {

    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { isCartOpen, toggleCart } = useCart();
    const isLoggedIn = user;
    const location = useLocation();

    // Kiểm tra xem người dùng có đang ở trang đăng nhập hoặc đăng ký không
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const isSuccess = location.pathname === '/paysuccess';
    // const isDashBoard = location.pathname === '/dashboard';
    const isUserManager = location.pathname === '/usermanagement';
    const isStaffManager = location.pathname === '/staffmanagement';
    const isAdmin = location.pathname === '/admin';
    const isAdminProfile = location.pathname === '/adminprofile';
    const isAddUser = location.pathname === '/add-user';
    // const isUpdateUser = location.pathname === "/update/*";
    const isUpdateUser = /^\/update\/\d+$/.test(location.pathname);
    const isRevenue = location.pathname === "/revenue";
    const isTimeLine = location.pathname === "/timeline";
    const isProductManager = location.pathname === "/productmanagement";
    const isAddProduct = location.pathname === '/addproduct';
    // const isUpdateProduct = location.pathname === "/update/*";
    const isUpdateProduct = /^\/update\/\d+$/.test(location.pathname);
    const isError = location.pathname === '/error';
    const isVoucher = location.pathname === '/voucher';
    const isPaypal= location.pathname === '/paypal';
    const handleOnLogout = () => {

        logout();
    }

    if (isLoginPage || isRegisterPage || isSuccess || isPaypal || isError) {
        return null;
    }

    if(isUserManager || isAdmin || isAddUser || isUpdateUser || isRevenue || isProductManager || isAddProduct || isUpdateProduct || isStaffManager || isVoucher || isAdminProfile || isTimeLine){
        return <NavBar/>

    }

    return (
        <div className='fixed-header'>
            <Navbar expand="lg" className="bg-body-tertiary" style={{ padding: '0 0 ' }}>
                <Container fluid style={{ backgroundColor: 'white' }}>
                    <Navbar.Brand className='brand ' href="/"><img className='logo' src='https://static.vecteezy.com/system/resources/previews/008/462/030/non_2x/minimalist-simple-bird-home-logo-design-free-vector.jpg'></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '200px' }}
                            navbarScroll
                        >
                            <NavLink to="/" activeClassName="active" className="nav-link">TRANG CHỦ</NavLink>
                            <NavLink to="/Gioithieu" className="nav-link">GIỚI THIỆU</NavLink>

                            <div className="custom-dropdown" >
                                <NavLink to="/sanpham" style={{ textDecoration: 'none', color: '#535b62' }} className="nav-link">SẢN PHẨM <span class="bi bi-caret-down-fill" /></NavLink>
                                <div className="dropdown-menu">
                                    <NavLink to="/sanpham" className="dropdown-item nav-link">
                                        Sản Phẩm
                                    </NavLink>
                                    {/* <NavLink to="/apitest" className="dropdown-item nav-link">
                                        Đăng Ký
                                        
                                    </NavLink> */}
                                </div>
                            </div>

                            <div className="custom-dropdown" >
                                <NavLink to="/dichvu" style={{ textDecoration: 'none', color: '#535b62' }} className="nav-link">DỊCH VỤ <span class="bi bi-caret-down-fill" /></NavLink>

                                {/* <div className="dropdown-menu">
                                    <NavLink to="/staffnew" className="dropdown-item nav-link">
                                        Đăng Nhập
                                    </NavLink>
                                    <NavLink to="/signup" className="dropdown-item nav-link">
                                        Đăng Ký
                                    </NavLink>
                                </div> */}
                            </div>
                            <NavLink to="/tintuc" activeClassName="active" className="nav-link">TIN TỨC</NavLink>
                            <NavLink to="/contact" activeClassName="active" className="nav-link">LIÊN HỆ</NavLink>
                        </Nav>

                        {/* <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                        <Nav>
                            {/* Nút giỏ hàng */}
                            

                            {isLoggedIn ? (

                                // Hiển thị nút "Logout" khi có người dùng đăng nhập
                                <div className="custom-dropdown">
                                    <Button className="btn btn-outline-secondary btnhead">
                                        <i className="bi bi-person-circle"></i>
                                    </Button>
                                    <div className="dropdown-menu">
                                        <NavLink to="/profile" className="dropdown-item nav-link">
                                            Profile
                                        </NavLink>
                                        {user.role === "ADMIN" && (
                                        <NavLink to="/admin" className="dropdown-item nav-link" >
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
                                            <NavLink
                                                to="/staffnew"
                                                className="dropdown-item nav-link"
                                                onClick={() => navigate("/staffnew")}
                                            >
                                                NEW MARKETING
                                            </NavLink>
                                        )}
                                        {user.role === "CUSTOMER" && (
                                            <>
                                            <NavLink
                                                to="/history"
                                                className="dropdown-item nav-link"
                                                // onClick={() => navigate("/staffnew")}
                                            >
                                                HISTORY ORDER
                                            </NavLink>
                                            <NavLink
                                                to="/localorder"
                                                className="dropdown-item nav-link"
                                                // onClick={() => navigate("/staffnew")}
                                            >
                                                WISHLIST ORDER
                                            </NavLink>
                                            </>
                                            
                                        )}
                                        <div className="dropdown-item nav-link" onClick={handleOnLogout}>
                                            Logout
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Hiển thị các tùy chọn đăng nhập/đăng ký khi không có người dùng đăng nhập
                                <div className="custom-dropdown">
                                    <Button className="btn btn-outline-secondary btnhead">
                                        <i className="bi bi-person-circle"></i>
                                    </Button>
                                    <div className="dropdown-menu">
                                        <NavLink to="/login" className="dropdown-item nav-link">
                                            Đăng Nhập
                                        </NavLink>
                                        <NavLink to="/register" className="dropdown-item nav-link">
                                            Đăng Ký
                                        </NavLink>
                                    </div>
                                </div>
                            )}
                            <Button variant="outline-secondary" to="/cart" className="btn" title="Giỏ Hàng" onClick={toggleCart}>
                                <i className="bi bi-cart-check"></i>
                                <Cart />
                            </Button>

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;