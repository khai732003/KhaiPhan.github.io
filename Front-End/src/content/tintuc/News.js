import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import ".././tintuc/news.scss";
import customAxios from "../../CustomAxios/customAxios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Footer from "../../footer/Footer";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const News = () => {
  const [marketingData, setMarketingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page in column 3
  const [showSlider, setShowSlider] = useState(false);
  const [selectedShortinfo, setSelectedShortinfo] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [voucher, setVoucher] = useState([]);

  const socialMediaData = [
    {
      link: "https://www.facebook.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png",
    },
    {
      link: "https://www.instagram.com",
      logo: "https://www.logo.wine/a/logo/Instagram/Instagram-Logo.wine.svg",
    },
    {
      link: "https://www.twitter.com",
      logo: "https://www.logo.wine/a/logo/Twitter/Twitter-Logo.wine.svg",
    },
    {
      link: "https://www.facebook.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png",
    },
    {
      link: "https://www.instagram.com",
      logo: "https://www.logo.wine/a/logo/Instagram/Instagram-Logo.wine.svg",
    },
    {
      link: "https://www.twitter.com",
      logo: "https://www.logo.wine/a/logo/Twitter/Twitter-Logo.wine.svg",
    },
    {
      link: "https://www.facebook.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png",
    },
    {
      link: "https://www.instagram.com",
      logo: "https://www.logo.wine/a/logo/Instagram/Instagram-Logo.wine.svg",
    },
    {
      link: "https://www.twitter.com",
      logo: "https://www.logo.wine/a/logo/Twitter/Twitter-Logo.wine.svg",
    },
    {
      link: "https://www.facebook.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png",
    },
    {
      link: "https://www.instagram.com",
      logo: "https://www.logo.wine/a/logo/Instagram/Instagram-Logo.wine.svg",
    },
    {
      link: "https://www.twitter.com",
      logo: "https://www.logo.wine/a/logo/Twitter/Twitter-Logo.wine.svg",
    },

    // Add more social media links and logos as needed
  ];

  const handleIconClick = (link) => {
    window.open(link, "_blank");
  };

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleCheckmarkClick = (id, shortinfo) => {
    // If the same id is clicked again, toggle the slider visibility
    setShowSlider((prev) => (prev && selectedItemId === id ? false : true));
    setSelectedShortinfo(shortinfo);
    setSelectedItemId(id);
  };

  const handleDetailClick = (id) => {
    navigate(`/detail-news/${id}`);
  };

  const renderColumn3Content = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return marketingData
      .slice(2)
      .slice(startIndex, endIndex)
      .map((data, index) => (
        <div
          key={index}
          className={`column3-item ${
            selectedItemId === data.id ? "active" : ""
          }`}
        >
          <div className="column3-title">
            <div>
              <p>{data.title}</p>
            </div>
            <div>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => handleDetailClick(data.id)}
                  className="detail-button"
                >
                  Detail
                </Button>
              </Stack>
              <div
                className="arrow-down"
                onClick={() => {
                  handleCheckmarkClick(data.id, data.shortinfo);
                }}
              >
                &#9660;
              </div>
            </div>
          </div>

          {showSlider &&
            selectedShortinfo &&
            data.shortinfo === selectedShortinfo && (
              <div className="slider">
                <p>{selectedShortinfo}</p>
              </div>
            )}
        </div>
      ));
  };

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        // Gọi API một lần để lấy dữ liệu
        const response = await customAxios.get(
          "/voucher/get-all"
        );
        setVoucher(response.data);
      } catch (error) {
        console.error("Error fetching marketing data:", error);
      }
    };
    
    fetchData1();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API một lần để lấy dữ liệu
        const response = await customAxios.get(
          "/marketing/list"
        );
        setMarketingData(response.data);
      } catch (error) {
        console.error("Error fetching marketing data:", error);
      }
    };

    fetchData();
  }, []);
  const [currentColor, setCurrentColor] = useState("rgba(255, 0, 0, 1)"); // Start with red

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Change the color every second
      setCurrentColor(generateRandomColor());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  const generateRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgba(${red}, ${green}, ${blue}, 1)`;
  };

  return (
    <Container className="container-fluid-news">
      <Row>
        <Col md={12} style={{ marginBottom: 20 }}>
          <div className="text-slider-container">
            {voucher.map((amount, index) => (
              <span key={index} style={{ color: currentColor }} className="text-slider">
                {amount.code}
              </span>
            ))}
          </div>
        </Col>
        {/* Cột 1: Tỉ lệ 5 */}
        <Col md={5}>
          {marketingData.length > 0 && (
            <div style={{ backgroundColor: "#cce5ff", padding: "20px" }}>
              <h2>Hot</h2>
              <h4>{marketingData[0].title}</h4>
              <p>{marketingData[0].info}</p>
              {marketingData[0].img && (
                <img src={marketingData[0].img} alt="Column 1" style={{height:'100%', width:'100%'}}/>
              )}
            </div>
          )}

          <Carousel style={{ marginTop: "20px" }}>
            {marketingData.slice(1, 4).map((data) => (
              <Carousel.Item key={data.id}>
                <img
                  className="d-block w-100"
                  src={
                    "https://themewagon.com/wp-content/uploads/2020/12/news.jpg"
                  }
                  alt={data.title}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        {/* Cột 2: Tỉ lệ 3 */}
        <Col md={3}>
          {marketingData.length > 1 && (
            <div style={{ backgroundColor: "#ffcccc", padding: "20px" }}>
              <h2>{marketingData[1].title}</h2>
              <p>{marketingData[1].info}</p>
              {marketingData[1].img && (
                <img src={marketingData[1].img} alt="Column 2" style={{height:'100%', width:'100%'}}/>
              )}
            </div>
          )}
          <hr />
          {marketingData.length > 1 && (
            <div style={{ backgroundColor: "#ffcccc", padding: "20px" }}>
              <h2>{marketingData[2].title}</h2>
              <p>{marketingData[2].info}</p>
              {marketingData[2].img && (
                <img src={marketingData[2].img} alt="Column 2" style={{height:'100%', width:'100%'}}/>
              )}
            </div>
          )}
        </Col>

        {/* Cột 3: Tỉ lệ 4 */}
        <Col md={4} style={{ marginBottom: 200 }}>
          {marketingData.length > 2 && (
            <div style={{ backgroundColor: "#c2f0c2", padding: "20px" }}>
              <h2>List of News</h2>
              {renderColumn3Content()}
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Pagination
                  count={Math.ceil((marketingData.length - 2) / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </Stack>
            </div>
          )}
        </Col>
        <hr/>
        {/* Cột 4: Slide Follow Us */}
        <Container>
          <Row>
            {/* About My Team */}
            <Col md={12} style={{ marginBottom: 20 }}>
              <div className="d-flex align-items-center justify-content-center">
                <h3>About My Team</h3>
              </div>
              <br />
            </Col>

            {/* Carousel */}
            <div style={{ paddingRight: 15, paddingLeft: 15 }}>
            <Col md={12}>
              <Carousel
                style={{
                  width: "100%", // Adjust to your needs
                  height: "300px", // Set a fixed height or adjust as needed
                  margin: "auto",
                  overflow: "hidden",
                }}
              >
                <Carousel.Item className="carousel-innerr">
                  {/* Slide 1 */}
                  <img
                    className="d-block w-100"
                    src="https://i0.wp.com/htmlcodex.com/wp-content/uploads/2021/01/free-bootstrap-magazine-template.jpg?w=800&ssl=1"
                    alt="Follow Us Slide 1"
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  {/* Slide 2 */}
                  <img
                    className="d-block w-100"
                    src="https://i0.wp.com/htmlcodex.com/wp-content/uploads/2021/04/free-news-website-template.jpg?w=800&ssl=1"
                    alt="Follow Us Slide 2"
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  {/* Slide 3 */}
                  <img
                    className="d-block w-100"
                    src="https://i0.wp.com/htmlcodex.com/wp-content/uploads/2021/04/free-news-website-template.jpg?w=800&ssl=1"
                    alt="Follow Us Slide 3"
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
            </div>
          </Row>
          <br/>
        </Container>

        {/* Cột 5: Slide Social Media Icons */}
        <Col md={12} style={{ marginBottom: 20 }}>
          <div className="logo-wrapper">
            <div className="logo-container">
              {socialMediaData.map((item, index) => (
                <div key={index} className="logo-item">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <img src={item.logo} alt={`Social Media ${index + 1}`} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default News;
