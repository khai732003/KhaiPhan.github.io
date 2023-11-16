import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import '../Trangchu/slideshow.scss';

const ImageSlider = () => {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        // Gửi yêu cầu đến API khi component được mount
        axios.get('http://localhost:8080/cageshop/api/product/top3')
            .then(response => {
                // Lưu dữ liệu từ API vào state 'slides'
                setSlides(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // Truyền mảng rỗng để chỉ gửi yêu cầu khi component được mount

    return (
        <div className='slideshow'>
            <Carousel style={{ width: '60%', height:'550px', }}>
                {slides.map((slide, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={slide.productImage} // Điều chỉnh tên thuộc tính tương ứng từ API trả về
                            alt={`Slide ${index + 1}`}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default ImageSlider;
