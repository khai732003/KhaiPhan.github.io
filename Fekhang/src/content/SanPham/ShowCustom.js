import React, { useState, useEffect } from 'react';
import customAxios from '../../CustomAxios/customAxios';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import './Scss/Detail.scss';
import { Box, Grid, Container, Card, CardMedia, List, Button } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useAuth } from './Context/AuthContext';
import ClearIcon from '@mui/icons-material/Clear';

function ShowCustom() {

    const { user } = useAuth();
    const { productId } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    let orderId = localStorage.getItem('orderId');

    useEffect(() => {
        customAxios
            .get(`/product/select/${productId}`)
            .then((response) => {
                setProductDetail(response.data);
                setLoading(false);
                setTotalPrice(response.data.totalPrice)
            })
            .catch((error) => {
                console.error('Error fetching product detail:', error);
                setLoading(false);
            });
    }, [productId]);


    const handleBuy = async (id) => {

        if (!user) {
            localStorage.setItem('isDetailReturn', 'true');
            localStorage.setItem('proId', productId);
            localStorage.setItem('toBuy', window.location.pathname);
            navigate("/login")
            return;
        }
        try {
            console.log(id)
            if (!orderId) {
                const address = user.address;

                const orderResponse = await customAxios.post('/order/add', {
                    "name": "Tổng hóa đơn",
                    "status": "pending",
                    "paymentMethod": "credit card",
                    "address": address,
                    "city": "Đà Nẵng",
                    "content": "Đóng gói cẩn thận nhé",
                    "shipDate": "2023-10-15",
                    userId: user.userId
                });

                orderId = orderResponse.data.id;
                localStorage.setItem('orderId', orderId);
            }

            await customAxios.post('/order_detail/add', {
                quantity: 1,
                hirePrice: productDetail.hirePrice,
                name: productDetail.name,
                totalOfProd: productDetail.totalPrice,
                hirePrice: productDetail.hirePrice,
                note: `Sản phẩm là ${id}`,
                orderId: orderId,
                productId: productDetail.id,
                totalCost: 1234567
            });
            console.log(orderId)
            navigate(`/order/${orderId}`);
        } catch (error) {
            console.error("Lỗi khi tạo order và order detail:", error);
        }
    };
    const handleCustomProduct = (id) => {
        navigate(`/customeproduct/${id}`);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
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
    const handleCancel = () => {
        localStorage.removeItem("cusPro");
        localStorage.removeItem("orderId");
        navigate("/sanpham");
    }

    return (
        <div className="full-container-details" style={{ padding: '7rem 0rem' }}>
            <Box className="product-container-productdetail">
                <Grid container spacing={2} className="container-productdetail" justifyContent="center">
                    <Grid item xs={12} md={11} style={{ margin: '' }}>
                        <Container maxWidth="md" >
                            <div >

                                <div className="list-acc">
                                    <div>
                                        Accessory
                                    </div>
                                    {productDetail.accessories.map((accessory, index) => (
                                        <div key={index} className="sub-acc">
                                            <strong>{accessory.description}:</strong> ${accessory.price}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Card style={{ padding: '2rem', borderRadius: '1rem' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={5}>
                                        <CardMedia
                                            style={{ borderRadius: '1rem', width: '20rem', height: '26rem' }}
                                            id='image-container-productdetail'
                                            component="img"
                                            alt="Product"
                                            image={productDetail.productImage}
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
                                            {/* <p style={{ lineHeight: '1.6', color: '#757a7f', marginBottom: '20px' }}>
                                                {productDetail.info}
                                            </p> */}
                                            <div style={{ marginBottom: '20px', fontSize: '24px', color: 'black' }}>
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

                                            <Button className='custom-button-cancel' startIcon={<ClearIcon />} onClick={handleCancel}>
                                                Cancel
                                            </Button>
                                            <Button className='custom-button-buy' variant="contained" startIcon={<AttachMoneyIcon />} onClick={() => handleBuy(productDetail.id)}>
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

export default ShowCustom;