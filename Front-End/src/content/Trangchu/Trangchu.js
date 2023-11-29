import React from 'react'
import '../Trangchu/content.scss'
import ImageSlider from './slideshow'
import ProductSearch from './find'
import NewProduct from './newproduct'
import WhyChooseUs from './Ad'
import Footer from '../../footer/Footer'
import Header from '../../header/Header'

export default function Trangchu() {
    return (
        <div style={{paddingTop: '7rem'}}>
            <Header/>
            <ImageSlider />
            {/* <ProductSearch /> */}
            <NewProduct />
            <WhyChooseUs />
        </div>
    )
}

