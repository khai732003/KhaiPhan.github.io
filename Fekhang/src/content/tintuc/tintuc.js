import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import ImageSlider from './slideshow';
import NewsPage from './listitem';
import '../tintuc/newspage.scss'
export default function tintuc() {
  return (
    <>
      <Header />
      <Box  minHeight="calc(100vh - 120px)">
        <Grid container display="flex" justifyContent="center" alignItems="center"> 
          <Grid item xs={12} md={7}  justifyContent="center" alignItems="center"  className='slide-s'>
              <ImageSlider />
          </Grid>
          <Grid item xs={12} md={3.5} display="flex" justifyContent="center" alignItems="center">
              <NewsPage />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}
