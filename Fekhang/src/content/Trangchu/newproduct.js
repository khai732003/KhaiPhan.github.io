import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import '../Trangchu/product.scss';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Gửi yêu cầu đến API khi component được mount
        axios.get('http://localhost:8080/cageshop/api/product/top3')
            .then(response => {
                // Cập nhật state 'products' với dữ liệu từ API
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // Truyền mảng rỗng để chỉ gửi yêu cầu khi component được mount


    const handleGoToProduct = () =>{
        navigate('/sanpham')
    }
    const renderStarRating = (rating) => {
        // Hàm hiển thị đánh giá sao giống như trong phiên bản trước
        // ...
    };

    function formatCurrency(amount) {
        return amount.toLocaleString('en-US');
      }
    return (
        <div className='newproduct'>
            <Container className='Container'>
                <h1><center> <strong> <span style={{ color: '#cc6119' }}> NEW</span>  PRODUCT</strong></center></h1>
                <h4 id='title'><center>At the forefront of ornamental bird care</center></h4>
                <Row>
                    {products.map((product) => (
                        <Col md={4} key={product.id} className='Col'>
                            <div className='cardi'>
                                <Image src={product.productImage} alt={product.name} fluid />
                                <h3>{product.name}</h3>
                                {/* <div className="rating">
                                    {renderStarRating(product.rating)}
                                </div> */}
                                <p>Price: {formatCurrency(product.totalPrice)} VND</p>
                                <Button variant="primary" onClick={handleGoToProduct}>Go to shop</Button>
                                {/* <p>Coupon: {product.coupon}</p> */}
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default NewProduct;
