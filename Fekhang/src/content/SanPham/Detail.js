import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import Header from '../../header/Header';
// import Footer from '../../footer/Footer';
import CircularProgress from '@mui/material/CircularProgress'; // Import the CircularProgress component
import { Box, Grid } from '@mui/material';
import './Scss/productdetail.scss';
import { Card } from 'react-bootstrap';
import { CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';
import {


    CardHeader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,

} from '@mui/material';
export default function DetailProductPage() {
    const [productdetail, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://652b64fe4791d884f1fdc2d3.mockapi.io/swp/products')
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setNewsData(data);
                } else {
                    console.error('Data from API is not an array:', data);
                }
            })
            .catch((err) => {
                setError(err);
                console.error('Error fetching data:', err);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when done fetching
            });
    }, []);

    const additionalImages = ['https://images.unsplash.com/photo-1587502536575-6dfba0a6e017?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1964',
     'https://images.unsplash.com/photo-1570651851409-93d5add773d7?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1887', 
     'https://images.unsplash.com/photo-1497290756760-23ac55edf36f?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1887']; // Replace with actual image URLs
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const addToCart = () => {
        // Implement your "Add to Cart" logic here
        alert('Added to cart');
    };
    const newsid = useParams();
    const newsData = productdetail.find((obj) => obj.id === newsid.id);

    if (loading) {
        // Display a loading indicator while fetching data
        return (
            <div className="loading-container" style={{ position: 'absolute', top: '50%', left: '50%' }}>

                <CircularProgress />
            </div>
        );
    }

    if (error) {
        // Handle the error condition, e.g., display an error message.
        return <div>Error: {error.message}</div>;
    }

    if (!productdetail) {
        // Handle the case where the productdetail object is not found.
        return <div>productdetail not found</div>;
    }

    return (
        <div className="full-container-details">
            <Box className="product-container-productdetail">
                <Grid container spacing={2} className="container-productdetail" display="flex" alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={11} margin="15vh 0">
                        <Container maxWidth="md">
                            <Card>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={7}>
                                        <CardMedia
                                            id='image-container-productdetail'
                                            component="img"
                                            alt="Product"
                                            image={selectedImage || 'https://images.unsplash.com/photo-1682687982468-4584ff11f88a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80-image.jpg'}
                                        />
                                        <List>
                                            {additionalImages.map((image, index) => (
                                                <div
                                                    key={index}
                                                    button
                                                    onClick={() => handleImageClick(image)}
                                                    style={{ display: 'inline-block' }}
                                                    className='container-sub-image'
                                                >
                                                    <div className='image-sub-container-productdetail' style={{ width: '10%', display: 'block' }}>
                                                        
                                                        <img
                                                            src={image}
                                                            alt={`Product Thumbnail ${index}`}

                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <div className='content-productdetail'>
                                            <h5 style={{ fontSize: '17px', fontWeight: '400', letterSpacing: '1px', fontFamily: 'fantasy' }} className='text-uppercase'>{newsData.category}</h5>
                                            <h3 style={{ fontSize: '45px', fontWeight: 'bold', padding: '10px 0' }}>{newsData.name}</h3>
                                            <p style={{ lineHeight: '1.8', color: '#757a7f' }}> {newsData.info}</p>
                                            <div className="price-content-productdetail">
                                                <span style={{ fontSize: '20px', fontWeight: 'bold', textDecoration: 'line-through' }}>{"$" + newsData.totalPrice}</span> <span style={{ fontSize: '30px', fontWeight: 'bold', marginLeft: '30px', color: 'red' }}>{"$" + ((newsData.totalPrice) - (newsData.totalPrice * newsData.cupon))}</span>   

                                                <div class="product-configuration">
                                                    <div class="color-choose" >
                                                        <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: 'bold', color: '#738990' }}>Color</span>
                                                        <div>
                                                            <input type="radio" data-image="yellow" id="yellow" name="color" value="yellow" />
                                                            <label for="yellow"><span></span></label>
                                                        </div>
                                                        <div>
                                                            <input type="radio" data-image="red" id="red" name="color" value="red" />
                                                            <label for="red"><span></span></label>
                                                        </div>
                                                        <div>
                                                            <input type="radio" data-image="green" id="green" name="color" value="green" />
                                                            <label for="green"><span></span></label>
                                                        </div>
                                                    </div>
                                                    <Button className="addtocart-product-configuration" variant="contained" color="primary" onClick={addToCart} display="block">
                                                        Add to Cart
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className='infomation-content-productdetail' style={{ marginTop: '20px', lineHeight: '0.5' }}>
                                                <h5 className="text-uppercase" style={{ fontSize: '17px', fontWeight: '400', letterSpacing: '1px', fontFamily: 'fantasy', marginBottom: '20px    ' }}>infomation</h5>
                                                <p>Chiều cao: {newsData.height}</p>
                                                <p>Chu vi: {newsData.perimeter}</p>
                                                <p>Chất liệu khung: {newsData.material}</p>
                                                <p>Tải trọng tối đa: {newsData.maxweight}</p>
                                                <p>Khoảng cách giữa các nan: {newsData.spaceb}</p>
                                                <p>Cách gia công: {newsData.type}</p>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Container>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
