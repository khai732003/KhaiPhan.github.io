import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../Trangchu/slideshow.scss';
const ImageSlider = () => {
    const [slide , setslide ]= ([
        
    ])
    return (

        <div className='slideshow'>
            <Carousel style={{ width: '100%', height:'550px' }}>
                <Carousel.Item >
                    <img
                        className="d-block w-100"
                        src="image/1.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="image/2.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="image/3.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );

};


export default ImageSlider;