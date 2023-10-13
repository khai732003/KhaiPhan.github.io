import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Typography from '@mui/material/Typography';
import '../tintuc/slideshow.scss'
import { listofnews } from '../../share/listOfnews';
import { Link } from 'react-router-dom';
const ImageSlider = () => {
    return (
        <>
            <div className='container-news'>
                <Carousel className='slideshow-news' controls={false}>
                    {listofnews.map((src, index) => (
                        <Carousel.Item key={index}>
                            <img
                                src={src.img}
                                alt={`Slide ${index + 1}`}
                            />
                            <div className='S-content'>
                                <Link to={`newsdetail/${src.id}`} style={{ textDecoration: 'none' }}>
                                    <span id='news-d'>{src.date}</span>
                                    <span id='news-l'>{src.title}</span>
                                    <span id='news-short'>{src.shortinfo}</span>
                                </Link>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default ImageSlider;
