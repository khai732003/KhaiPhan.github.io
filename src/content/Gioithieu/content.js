import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Card, CardContent, Button, Typography, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Card as BootstrapCard } from 'react-bootstrap';
import '../Gioithieu/content.scss'
import axios from 'axios';
import { Sync } from '@mui/icons-material';
export default function AboutPage() {
    const [productsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);


    const getProduct = async () => {
        const res = await axios.get('https://652b64fe4791d884f1fdc2d3.mockapi.io/swp/products');
        if (res) {
            setNewsData(res.data);
            console.log(res.data);
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <>

            <div className='about-container'>
                <Box>
                    <Grid xs={12} md={12} className='about-header-container'>
                        <div className='card-header-about'>
                            <p id='date-header-about'><strong>October 12 2023</strong></p>
                            <h1 id='title-header-about'><strong>Bird Cage Store</strong></h1>
                            <h2 id='content-header-about'>Revive every area in your house for less with furnishings that's on-trend and also economical, also.
                                Find ideal pieces for huge residences, little spaces, houses, workshops.
                                Locate both comfort and also innovative style amongst our choice of furniture. Visit your
                                regional store to browse even more and also purchase.
                                What do you think of the Furniture Store Template?
                            </h2>
                            <Link id='shopnowB-header-about' to="/sanpham">Shop Now</Link>
                            <div className='shop-header-about'>
                                <h2>London, UK</h2>
                                <h3>Chestnut Street 22, 163</h3>
                            </div>
                        </div>
                    </Grid>
                    <div className='feature-content-about'>
                        <div className='container-content-about'>
                            <div className='card-content-about'>
                                <div className='scrip-content-about'>
                                    <h3 id='intro-script-content-about'>OUR SHOP FEATURES</h3>
                                    <h1 id='title-script-content-about'>
                                        <strog>Core advantages & reasons
                                            to shop with us.</strog>
                                    </h1>
                                    <p id='content-script-content-about'>In our store, you would find all the necessary styles and pieces of furniture,
                                        which would perfectly suit your needs.
                                        Furniture Store Template contains all you need for the successful site creation.
                                    </p>
                                </div>

                                <div className='icons-content-about'>
                                    <div className='element-icons-about'>
                                        <span><i class="bi bi-cart3"></i></span>
                                        <p>Wide Selection</p>
                                    </div>
                                    <div className='element-icons-about' style={{ borderLeft: '0.2px solid grey', borderRight: '0.2px solid grey', padding: '0 25px' }}>
                                        <span><i class="bi bi-box2-heart"></i></span>
                                        <p>Fast Delivery</p>
                                    </div>
                                    <div className='element-icons-about'>
                                        <span><i class="bi bi-people"></i></span>
                                        <p>Friendly Staff</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Unique style */}
                    <div className='Unique-content-about'>
                        <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid item md={5.5} style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='Unique-content-about-container'>
                                    <p id='intro-Unique-content-about'>INTERIOR DESIGN COLLECTION</p>
                                    <h1 id='title-Unique-content-about'>Create Your Unique Style</h1>
                                    <p id='content-Unique-content-about'>Our designers would help you to create an awesome style, properly combining different elements of your decor.</p>
                                    <Link to="/sanpham" id='btn-Unique-content-about'>
                                        Shop Now
                                    </Link>
                                </div>
                            </Grid>
                            {/* {loading ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '20%' }}>
                                    <center>
                                        <CircularProgress />
                                    </center>
                                </div>
                            ) : ( */}
                            <div>
                                {productsData.slice(0, 2).map((product) => (
                                    <Grid key={product.id} item md={4.25}>
                                        <div className='container-content-about-container'>
                                            <div className='product-content-about-container'>
                                                <img src={product.productImage} alt={product.name} />
                                                <CardContent style={{ padding: 'none' }}>
                                                    <Link id='link-product-content-about-container' to={`productdetail/${product.id}`}>Read More</Link>
                                                    <h5> <strong>{product.name}</strong></h5>
                                                    <p style={{ fontSize: '18px' }}>{product.enail}</p>
                                                    <p style={{ fontSize: '18px' }}><strong>{product.price}</strong></p>
                                                </CardContent>
                                            </div>
                                        </div>
                                    </Grid>
                                ))}
                            </div>
                            {/* )} */}
                        </Grid>
                    </div>
                </Box>
            </div>

        </>
    );
};
