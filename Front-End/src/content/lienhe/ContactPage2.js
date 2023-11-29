
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import '../lienhe/ContactPage2.scss';
import { hover } from '@testing-library/user-event/dist/hover';
export default function ContactPage2() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., send data to a server)
        console.log('Form Data:', formData);
    };
    return (
        <>
            <div className='fullscreen-login-container' style={{fontFamily:'Roboto Slab'}} >
                <div className='container-form-contact'>
                    <div className='contact-content-form'>
                        <div>
                            <div className='icon-contact-content'><p id='content-icon-contact'><span class="bi bi-geo-alt" style={{ fontSize: '30px', color: 'red' }}></span><span style={{ fontSize: '20px', paddingLeft: '15px ' }}>Address:</span></p>
                                <p style={{ color: 'rgb(24, 41, 45)', fontSize: '15px' }}> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000</p>
                            </div>
                            <div className='icon-contact-content'><p id='content-icon-contact'><span class="bi bi-envelope-at" style={{ fontSize: '30px', color: 'blue' }}></span><span style={{ fontSize: '20px', paddingLeft: '15px ' }}>Email:</span></p>
                                <p ><a href="mailto:hcmuni.fpt.edu.vn"  style={{ color: 'rgb(24, 41, 45)', fontSize: '15px' }}>hcmuni.fpt.edu.vn</a></p>
                            </div>
                            <div className='icon-contact-content'> <p id='content-icon-contact'><span class="bi bi-telephone " style={{ fontSize: '30px', color: 'green' }}></span><span style={{ fontSize: '20px', paddingLeft: '15px ' }}>Phone Number:</span></p>
                                <p style={{ color: 'rgb(24, 41, 45)', fontSize: '15px' }}> 19009477</p>
                            </div>
                            <div className='icon-contact-content'><p id='content-icon-contact'><span class="bi bi-facebook" style={{ fontSize: '30px', color: 'blue' }}></span><span style={{ fontSize: '20px', paddingLeft: '15px ' }}>Facebook:</span></p>
                                <p> <a href='https://www.facebook.com/FPTU.HCM' style={{ color: 'rgb(24, 41, 45)', fontSize: '15px'}}>https://www.facebook.com/FPTU.HCM</a></p>
                            </div>
                        </div>
                    </div>
                    <div className='input-container-contact-1'>
                        <h2 id='content-input-container-contact-1'>Contact Us</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                placeholder='Full name'
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                placeholder='Email'
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                placeholder='Phone Number'
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                            <textarea
                                placeholder='Message'
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit" className='submitform-btn'>Submit</button>
                        </form>
                    </div>
                </div>



            </div>

        </>
    )
}
