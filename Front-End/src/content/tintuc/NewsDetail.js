import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Row, Col } from "react-bootstrap";
import customAxios from "../../CustomAxios/customAxios";
import { Link } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import './newsdetail.scss';
import { Button } from "@mui/material";
const NewsDetail = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marketingData, setMarketingData] = useState([]);
  const { id } = useParams(); // Assuming you want to get the 'id' parameter from the URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get(
          `/marketing/list/${id}`
        );
        setMarketingData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="full-container-details">
      <Header />
      <Container style={{ marginTop: 150, marginBottom: 100, backgroundColor: '#f8f8ff', padding: '80px 80px' }}>
        <Row>
          <Col md={5}>
            <div className="left-column">
              <CardMedia

                component="img"
                sx={{ height: 600, borderRadius: '5px' }}
                image={marketingData.img}
                alt={marketingData.title}
                className="card-img-top"
              />
              <p>{marketingData.someInfo}</p>
            </div>
          </Col>
          <Col md={7}>
            <div className="right-column" style={{ marginLeft: '50px', textAlign: 'left' }}>
              <Link to="/news" className="back-link">
                <Button
                  variant="contained"
                  style={{ marginBottom: '50px' }}
                >
                  Back
                </Button>
              </Link>
              <div className="centered-line">
                <h3 id="news-date">{marketingData.date}</h3>
              </div>
              <h3 id="title-newsdetail" style={{ fontSize: '40px', marginBottom: '20px' }}>{marketingData.title}</h3>
              <h4 id="name-newsdetail" style={{ fontSize: '20px', marginBottom: '40px', color: 'grey' }}>{marketingData.name}</h4>
              <p id="info-newsdetail" style={{ textAlign: 'justify' }}>{marketingData.shortinfo}</p>
              <Link 
                id="button-newsdetail"
                to="https://vi.wikipedia.org/wiki/B%C3%B3i_c%C3%A1"
              >
                <Button 
                variant="outlined"
                color="success"
                >
                  Tìm hiểu thêm
                </Button>
              </Link>
              <p>{marketingData.content}</p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default NewsDetail;
