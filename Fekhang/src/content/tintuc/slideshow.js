import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Typography from '@mui/material/Typography';
import { slides } from '../../share/listOfnews';
import '../tintuc/slideshow.scss'
const ImageSlider = () => {
    return (
        <>
            <div className='slideshow' >
                <Carousel>
                    {slides.map((src, index) => (
                        <Carousel.Item key={index}>
                            <img
                              
                                className="d-block w-100"
                                src={src.src}
                                alt={`Slide ${index + 1}`}
                            />
                            <div className='S-content'>
                                <h2>{src.title}</h2>
                                <span>{src.Eng}</span>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default ImageSlider;
