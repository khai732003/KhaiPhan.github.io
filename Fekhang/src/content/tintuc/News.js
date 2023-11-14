import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import ".././tintuc/news.scss";
import customAxios from "../../CustomAxios/customAxios";

const News = () => {
  const [marketingData, setMarketingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API một lần để lấy dữ liệu
        const response = await customAxios.get("http://localhost:8080/cageshop/api/marketing/list");
        setMarketingData(response.data);
      } catch (error) {
        console.error("Error fetching marketing data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="new-page">
      <Row>
         <Col md={12} style={{ marginBottom: 20 }}>
          <div className="text-slider-container">
            <p className="text-slider">
              Nguyễn Phước Thiênn Ân Nguyễn Phước Thiênn Ân Nguyễn Phước Thiênn
              Ân Nguyễn Phước Thiênn Ân
            </p>
          </div>
        </Col>
        {/* Cột 1: Tỉ lệ 5 */}
        <Col md={5}>
          {marketingData.length > 0 && (
            <div style={{ backgroundColor: "#cce5ff", padding: "20px" }}>
              <h2>{marketingData[0].title}</h2>
              <p>{marketingData[0].info}</p>
              {marketingData[0].img && <img src={marketingData[0].img} alt="Column 1" />}
            </div>
          )}
        </Col>

        {/* Cột 2: Tỉ lệ 3 */}
        <Col md={3}>
          {marketingData.length > 1 && (
            <div style={{ backgroundColor: "#ffcccc", padding: "20px" }}>
              <h2>{marketingData[1].title}</h2>
              <p>{marketingData[1].info}</p>
              {marketingData[1].img && <img src={marketingData[1].img} alt="Column 2" />}
            </div>
          )}
        </Col>

        {/* Cột 3: Tỉ lệ 4 */}
        <Col md={4}>
          {marketingData.length > 2 && (
            <div style={{ backgroundColor: "#c2f0c2", padding: "20px" }}>
              <h2>Cột 3</h2>
              {marketingData.slice(2).map((data, index) => (
                <div key={index}>
                  <p>{data.shortinfo}</p>
                  {data.img && <img src={data.img} alt={`Column 3 - ${index}`} />}
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default News;