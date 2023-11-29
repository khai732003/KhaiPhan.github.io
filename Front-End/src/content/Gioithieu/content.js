import React, { useState } from 'react';
import { Container, Card, CardContent, Button, Typography, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Card as BootstrapCard } from 'react-bootstrap';
import '../Gioithieu/content.scss'
export default function AboutPage() {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Designer Chair',
            type: 'Interior Design',
            price: 'from $ 135',
            image: 'image/1.jpg',
        },
        {
            id: 2,
            name: 'Product 2',
            type: 'Type B',
            price: '$15',
            image: 'image/2.jpg',
        },
        // Add more products as needed
    ]);
    return (
        <>

            <div className='about-container'>
                <Box>
                    <Grid xs={12} md={12} className='about-header-container'>
                        <div className='card-header-about-1'>
                            <p id='date-header-about'><strong>October 12 2023</strong></p>
                            <h1 id='title-header-about'><strong>Bird Cage Store</strong></h1>
                            <h2 id='content-header-about-1'>Revive every area in your house for less with furnishings that's on-trend and also economical, also.
                                Find ideal pieces for huge residences, little spaces, houses, workshops.
                                Locate both comfort and also innovative style amongst our choice of furniture. Visit your
                                regional store to browse even more and also purchase.
                                What do you think of the Furniture Store Template?
                            </h2>
                            <Link to="/sanpham" id='shopnowB-header-about'>Shop Now</Link>
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
                                        <strong>Core advantages & reasons
                                            to shop with us.</strong>
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
                                    <button id='btn-Unique-content-about'>
                                        <Link to="/sanpham">Shop Now
                                            <span class="bi bi-chevron-right"></span>
                                        </Link>
                                    </button>
                                </div>
                            </Grid>


                        </Grid>
                    </div>
                </Box>
            </div>

        </>
    );
};
