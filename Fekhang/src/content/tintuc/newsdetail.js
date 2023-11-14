import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Grid } from '@mui/material';
import customAxios from '../../CustomAxios/customAxios'; // Điều chỉnh đường dẫn này dựa trên cấu trúc dự án của bạn
import '../tintuc/newsdetail.scss';

export default function DetailNewsPage() {
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    customAxios.get(`/marketing/list/${id}`)
      .then((response) => {
        if (response.data) {
          setNewsData(response.data);
        } else {
          console.error('Data from API is not valid:', response.data);
        }
      })
      .catch((err) => {
        setError(err);
        console.error('Error fetching data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container" style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!newsData || !newsData.id) {
    return <div>News not found</div>;
  }

  return (
    <div className="full-container-details">
      <Header />
      <Box className="Box-newsdetail">
        <Grid container spacing={2} className="container-newsdetail">
          <Grid item xs={12} md={7.5} style={{ paddingLeft: '13vw' }}>
            <Grid item xs={12} md={9}>
              <div style={{ marginTop: '70px' }}>
                <Link to='/tintuc' style={{ textDecoration: 'none', color: 'white', padding: '8px 15px', backgroundColor: 'rgb(38, 250, 161)', marginBottom: '30px', display: 'block', width: 'fit-content', borderRadius: '3px' }}> Back</Link>
                <div className="centered-line">
                  <span className="text">WELCOME</span>
                  <h3 id="news-date">{newsData.date}</h3>
                </div>
              </div>
              <h2 id="title-newsdetail">{newsData.title}</h2>
              <h3 id='name-newsdetail'>{newsData.name}</h3>
              <p id="info-newsdetail">{newsData.shortinfo}</p>
              <a id='button-newsdetail' href='https://vi.wikipedia.org/wiki/B%C3%B3i_c%C3%A1'>Tìm hiểu thêm</a>
              <p>{newsData.content}</p>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4.5} className="colored-background">
            <div id='box-newsdetail'>
              <img src={newsData.img} alt={newsData.title} id="img-newsdetail" />
            </div>
          </Grid>
        </Grid>
      </Box>
      <Footer></Footer>
    </div>
  );
}
