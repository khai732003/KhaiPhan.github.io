import React, { useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import '../Trangchu/product.scss'
const NewProduct = () => {
    // Define a state variable to hold product data
    const [products, setProducts] = useState([
        {
            id: 1,
            imageSrc: 'image/b1.jpg',
            title: 'Product 1 Title',
            rating: 4,
            price: 49.99,
            coupon: 'ABC123',
        },
        {
            id: 2,
            imageSrc: 'image/b2.jpg',
            title: 'image/b2.jpg',
            rating: 4.5,
            price: 59.99,
            coupon: 'XYZ456',
        },
        {
            id: 3,
            imageSrc: 'image/b3.jpg',
            title: 'Product 3 Title',
            rating: 5,
            price: 69.99,
            coupon: 'DEF789',
        },
        {
            id: 1,
            imageSrc: 'image/b4.jpg',
            title: 'Product 1 Title',
            rating: 4,
            price: 49.99,
            coupon: 'ABC123',
        },
        {
            id: 2,
            imageSrc: 'image/b5.jpg',
            title: 'Product 2 Title',
            rating: 4.5,
            price: 59.99,
            coupon: 'XYZ456',
        },
        {
            id: 3,
            imageSrc: 'image/b6.jpg',
            title: 'Product 3 Title',
            rating: 5,
            price: 69.99,
            coupon: 'DEF789',
        },
        // Add more products as needed
    ]);

    return (
        <div className='newproduct'>
            <Container className='Container'>
                <h1><center > <strong>SẢN PHẨM <span style={{ color: '#cc6119' }}>MỚI</span></strong></center></h1>
                <h4 id='title'><center>Đi đầu trong lĩnh vực chăm sóc chim cảnh</center></h4>
                <Row>
                    {products.map((product) => (
                        <Col md={4} key={product.id} className='Col'>
                            <div className='cardi'>
                                <Image src={product.imageSrc} alt={product.title} fluid />
                                <h3>{product.title}</h3>
                                <div className="rating">
                                    {/* Display star rating based on the product's 'rating' */}
                                    {renderStarRating(product.rating)}
                                </div>
                                <p>Price: ${product.price.toFixed(2)}</p>
                                <Button variant="primary">Add to Cart</Button>
                                <p>Coupon: {product.coupon}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

// Helper function to render star rating
const renderStarRating = (rating) => {
    // You can implement your own logic to display star rating based on 'rating'
    // For simplicity, I'm using a basic example here
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={i <= rating ? 'star filled' : 'star empty'}>
                ★
            </span>
        );
    }
    return stars;
};

export default NewProduct;
