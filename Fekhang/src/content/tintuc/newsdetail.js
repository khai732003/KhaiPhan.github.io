import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import CircularProgress from '@mui/material/CircularProgress'; // Import the CircularProgress component
import '../tintuc/newsdetail.scss';
import { Box, Grid } from '@mui/material';
import listOfnews from '../../share/listOfnews';
import zIndex from '@mui/material/styles/zIndex';

export default function DetailNewsPage() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://652b64fe4791d884f1fdc2d3.mockapi.io/swp/news')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNewsData(data);
        } else {
          console.error('Data from API is not an array:', data);
        }
      })
      .catch((err) => {
        setError(err);
        console.error('Error fetching data:', err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when done fetching
      });
  }, []);

  const newsid = useParams();
  const News = newsData.find((obj) => obj.id === newsid.id);

  if (loading) {
    // Display a loading indicator while fetching data
    return (
      <div className="loading-container" style={{position:'absolute', top:'50%',left:'50%'}}>

        <CircularProgress />
      </div>
    );
  }

  if (error) {
    // Handle the error condition, e.g., display an error message.
    return <div>Error: {error.message}</div>;
  }

  if (!News) {
    // Handle the case where the News object is not found.
    return <div>News not found</div>;
  }

  return (
    <div className="full-container-details">
      <Header />
      <Box className="Box-newsdetail" >
        <Grid container spacing={2} className="container-newsdetail">
          <Grid item xs={12} md={7.5} style={{ paddingLeft: '13vw' }}>
            <Grid item xs={12} md={9}>
              <div style={{ marginTop: '70px' }}>
                <Link to='/tintuc' style={{ textDecoration: 'none', color: 'white', padding: '8px 15px', backgroundColor: 'rgb(38, 250, 161)', marginBottom: '30px', display: 'block', width: 'fit-content', borderRadius: '3px' }}> Back</Link>
                <div className="centered-line">
                  <span className="text">WELCOME</span>
                  <h3 id="news-date">{News.date}</h3>
                </div>
              </div>
              <h2 id="title-newsdetail">{News.title}</h2>
              <h3 id='name-newsdetail'>{News.name}</h3>
              <p id="info-newsdetail">{News.shortinfo}</p>
              <a id='button-newsdetail' href='https://vi.wikipedia.org/wiki/B%C3%B3i_c%C3%A1'>Tìm hiểu thêm</a>
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
      <Footer></Footer>
    </div>
  );
}
