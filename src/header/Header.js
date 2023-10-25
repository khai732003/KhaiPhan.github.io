import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../header/Header.scss'
import React, { useState, useEffect } from 'react'; 
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useCart } from '../content/SanPham/Context/CartContext';
function Header(props) {

    // const [user, loading, error] = useAuthState(auth);
    // const [name, setName] = useState("");
    // const navigate = useNavigate();
    // const fetchUserName = async () => {
    //     try {
    //         const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    //         const doc = await getDocs(q);
    //         const data = doc.docs[0].data();
    //         setName(data.name);
    //     } catch (err) {
    //         console.error(err);
    //         alert("An error occured while fetching user data");
    //     }
    // };
    // useEffect(() => {
    //     if (loading) return;
    //     if (!user) return navigate("/");
    //     fetchUserName();
    // }, [user, loading]);




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

                            <div className="custom-dropdown" >
                                <NavLink to="/sanpham" style={{ textDecoration: 'none', color: '#535b62' }} className="nav-link">SẢN PHẨM <span class="bi bi-caret-down-fill" /></NavLink>
                                <div className="dropdown-menu">
                                    <NavLink to="/profile" className="dropdown-item nav-link">
                                        Đăng Nhập
                                    </NavLink>
                                    <NavLink to="/apitest" className="dropdown-item nav-link">
                                        Đăng Ký
                                    </NavLink>
                                </div>
                            </div>

                            <div className="custom-dropdown" >
                                <NavLink to="/dichvu" style={{ textDecoration: 'none', color: '#535b62' }} className="nav-link">DỊCH VỤ <span class="bi bi-caret-down-fill" /></NavLink>

                                <div className="dropdown-menu">
                                    <Link to="/staffnew" className="dropdown-item nav-link">
                                        Đăng Nhập
                                    </Link>
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
                            {/* {user ? (
                                <div className="custom-dropdown" >
                                <NavLink to="/sanpham" style={{ textDecoration: 'none', color: '#535b62',border:'1px solid black',borderRadius:'7px' }} className="nav-link"><span class="bi bi-person-video2" /></NavLink>
                                <div className="dropdown-menu">
                                    <NavLink to="/profile" className="dropdown-item nav-link">
                                        Thông Tin
                                    </NavLink>
                                    <NavLink className="dropdown-item nav-link">
                                    <span  style={{cursor:'pointer'}}>Đăng Xuất</span>
                                    </NavLink>
                                </div>
                            </div>
                            ) : (
                                <div className="custom-dropdown">
                                    <Button className="btn btn-outline-secondary btnhead" >
                                        <i class="bi bi-person-circle"></i>
                                    </Button>
                                    <div className="dropdown-menu">
                                        <NavLink to="/login" className="dropdown-item nav-link">
                                           Đăng nhập
                                        </NavLink>
                                        
                                    </div>
                                </div>
                            )
                            } */}
                            <Button variant="outline-secondary" to="/profile" className='btn' title='Giỏ Hàng' >
                                <i className=" bi-cart-check"></i>
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container >
            </Navbar >
        </div >
    );
}

export default Header;