import React, { useState, useEffect } from 'react';
import customAxios from '../../CustomAxios/customAxios';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Grid, Container, Card, CardMedia, List, Button } from '@mui/material';
import './Scss/Detail.scss';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAuth } from './Context/AuthContext';
import { useCart } from './Context/CartContext';

function Detail() {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [productDetail, setProductDetail] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const { productId } = useParams();

    useEffect(() => {
        customAxios
            .get(`/product/select/${productId}`)
            .then((response) => {
                setProductDetail(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching product detail:', error);
                setLoading(false);
            });
    }, [productId]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleAddToCart = () => {
        const { id, name, stock, totalPrice, productImage, code } = productDetail; // Lấy giá trị từ productDetail
        addToCart({ id, name, stock, totalPrice, productImage, code }); // Truyền giá trị vào hàm addToCart
        window.alert(`Added ${name} to the cart!`);
    };
    

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    if (!productDetail) {
        return <div>Product not found</div>;
    }

    return (
        <div className="full-container-details" style={{ paddingBottom: '3rem' }}>
            <Box className="product-container-productdetail">
                <Grid container spacing={2} className="container-productdetail" justifyContent="center">
                    <Grid item xs={12} md={11} style={{ margin: '' }}>
                        <Container maxWidth="md" >
                            <Card style={{ padding: '2rem', borderRadius: '1rem' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={5}>
                                        <CardMedia
                                            style={{ borderRadius: '1rem', width: '20rem', height: '26rem' }}
                                            id='image-container-productdetail'
                                            component="img"
                                            alt="Product"
                                            image={selectedImage || productDetail.productImage}

                                        />
                                        <List style={{ paddingTop: '1rem', paddingBottom: '0' }}>
                                            {productDetail.productDetailImage && productDetail.productDetailImage.map((image, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => handleImageClick(image)}
                                                    style={{ display: 'inline-block', cursor: 'pointer' }}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Product Thumbnail ${index}`}
                                                        style={{ width: '4rem', height: '4rem', marginRight: '1rem', borderRadius: '0.5rem' }}
                                                    />
                                                </div>
                                            ))}
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={7} style={{ position: 'relative' }}>
                                        <div style={{ padding: '20px' }}>
                                            <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
                                                {productDetail.name}
                                            </h3>
                                            <p style={{ lineHeight: '1.6', color: '#757a7f', marginBottom: '20px' }}>
                                                {productDetail.info}
                                            </p>
                                            <div style={{ marginBottom: '20px', fontSize: '24px', color: 'red' }}>
                                                ${productDetail.totalPrice}
                                            </div>
                                            <div style={{ marginBottom: '20px' }}>
                                                <h5 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                                                    Product Configuration
                                                </h5>
                                                <div className="color-choose">
                                                    {productDetail.colors && productDetail.colors.map((color, index) => (
                                                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                            <input type="radio" id={color} name="color" value={color} />
                                                            <label htmlFor={color} style={{ marginLeft: '5px' }}>{color}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                        <div style={{ position: 'absolute', bottom: '5rem', width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                                            <Button className='custom-button-cart' variant="contained" startIcon={<AddShoppingCartIcon />} onClick={handleAddToCart}>
                                                Add to Cart
                                            </Button>
                                            <Button className='custom-button-buy' variant="contained" startIcon={<AttachMoneyIcon />} onClick={() => alert('Added to cart')}>
                                                Buy Now
                                            </Button>
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

export default Detail;
