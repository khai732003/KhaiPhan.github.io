import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../header/Header.scss'
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
function Header(props) {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

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

                            <div className="custom-dropdown nav-link" >
                                <NavLink to="/sanpham" style={{ textDecoration: 'none', color: '#535b62' }}>SẢN PHẨM <span class="bi bi-caret-down-fill"/></NavLink>
                                <div className="dropdown-menu">
                                    <NavLink to="/profile" className="dropdown-item nav-link">
                                        Đăng Nhập
                                    </NavLink>
                                    <NavLink to="/signup" className="dropdown-item nav-link">
                                        Đăng Ký
                                    </NavLink>
                                </div>
                            </div>

                            <div className="custom-dropdown nav-link" >
                                <NavLink to="/sanpham" style={{ textDecoration: 'none', color: '#535b62' }} >DỊCH VỤ <span class="bi bi-caret-down-fill"/></NavLink>
                                
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
                            <div className="custom-dropdown">
                                <Button className="btn btn-outline-secondary btnhead" >
                                    <i class="bi bi-person-circle"></i>
                                </Button>
                                <div className="dropdown-menu">
                                    <NavLink to="/login" className="dropdown-item nav-link">
                                        Đăng Nhập
                                    </NavLink>
                                    <NavLink to="/signup" className="dropdown-item nav-link">
                                        Đăng Ký
                                    </NavLink>
                                </div>
                            </div>
                            <Button variant="outline-secondary" to="/profile" className='btn' title='Giỏ Hàng'>
                                <i className=" bi-cart-check"></i>
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;