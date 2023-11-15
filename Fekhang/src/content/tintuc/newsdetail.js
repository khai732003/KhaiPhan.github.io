import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Row, Col } from "react-bootstrap";
import customAxios from "../../CustomAxios/customAxios";
import { Link } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';

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
          `http://localhost:8080/cageshop/api/marketing/list/${id}`
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
      <Container style={{marginTop: 150, marginBottom: 100}}>
        <Row>
          <Col md={5}>
            <div className="left-column">
              <CardMedia
                component="img"
                sx={{ height: 140 }}
                image={marketingData.img}
                alt={marketingData.title}
                className="card-img-top"
              />
              <p>{marketingData.someInfo}</p>
            </div>
          </Col>
          <Col md={7}>
            <div className="right-column">
              <Link to="/news" className="back-link">
                Back
              </Link>
              <div className="centered-line">
                <h3 id="news-date">{marketingData.date}</h3>
              </div>
              <h3 id="title-newsdetail">{marketingData.title}</h3>
              <h4 id="name-newsdetail">{marketingData.name}</h4>
              <p id="info-newsdetail">{marketingData.shortinfo}</p>
              <a
                id="button-newsdetail"
                href="https://vi.wikipedia.org/wiki/B%C3%B3i_c%C3%A1"
              >
                Tìm hiểu thêm
              </a>
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
