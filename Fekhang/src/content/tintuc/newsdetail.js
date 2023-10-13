import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import { listofnews } from '../../share/listOfnews';
import '../tintuc/newsdetail.scss';
import { Box, Grid } from '@mui/material';

export default function DetailNewsPage() {
  const newsid = useParams();
  const News = listofnews.find((obj) => {
    return obj.id === newsid.id;
  });

  return (
    <div className="full-container-details">
      <Header />
      <Box className="Box-newsdetail">
        <Grid container spacing={2} className="container-newsdetail">
          <Grid item xs={12} md={7.5} style={{ paddingLeft: '13vw' }}>
            <Grid item xs={12} md={9}>
              <div style={{ marginTop: '100px' }}>
                <div className="centered-line">
                  <span className="text">WELCOME</span>
                  <h3 id="news-date">{News.date}</h3>
                </div>
              </div>
              <h2 id="title-newsdetail">{News.title}</h2>
              <h3 id='name-newsdetail'>{News.name}</h3>
              <p id="info-newsdetail">{News.shortinfo}</p>
             <a  id='button-newsdetail' href='https://vi.wikipedia.org/wiki/B%C3%B3i_c%C3%A1'>Tìm hiểu thêm</a>
              <p>{News.content}</p>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4.5} className="colored-background">
            <div id='box-newsdetail'>
              <img src={News.img} alt={News.title} id="img-newsdetail" />
            </div>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}
