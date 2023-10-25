import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../header/Header.scss'
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../content/SanPham/Context/CartContext';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../content/SanPham/Context/AuthContext';
function Header(props) {
    
    
    const { user, logout } = useAuth();
    const { isCartOpen, toggleCart } = useCart();
    const isLoggedIn = user;
    const location = useLocation();

    // Kiểm tra xem người dùng có đang ở trang đăng nhập hoặc đăng ký không
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const isSuccess = location.pathname === '/paysuccess';

    const handleOnLogout = () => {
        logout();
    }

    // Nếu người dùng đang ở trang đăng nhập hoặc đăng ký, ẩn Navigation
    if (isLoginPage || isRegisterPage || isSuccess) {
        return null;
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
                                    <NavLink to="/apitest" className="dropdown-item nav-link">
                                        Đăng Ký
                                    </NavLink>
                                </div>
                            </div>

                            <div className="custom-dropdown" >
                                <NavLink to="/dichvu" style={{ textDecoration: 'none', color: '#535b62' }} className="nav-link">DỊCH VỤ <span class="bi bi-caret-down-fill" /></NavLink>

                                <div className="dropdown-menu">
                                    <NavLink to="/login" className="dropdown-item nav-link">
                                        Đăng Nhập
                                    </NavLink>
                                    <NavLink to="/signup" className="dropdown-item nav-link">
                                        Đăng Ký
                                    </NavLink>
                                </div>
                            </div>
                            <NavLink to="/tintuc" activeClassName="active" className="nav-link">TIN TỨC</NavLink>
                            <NavLink to="/dichvu" activeClassName="active" className="nav-link">LIÊN HỆ</NavLink>
                        </Nav>

                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Nav>
                            {/* Nút giỏ hàng */}
                            <Button variant="outline-secondary" to="/cart" className="btn" title="Giỏ Hàng" onClick={toggleCart}>
                                <i className="bi bi-cart-check"></i>
                            </Button>
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
                                        <NavLink className="dropdown-item nav-link" onClick={handleOnLogout}>
                                            Logout
                                        </NavLink>
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
                            
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;