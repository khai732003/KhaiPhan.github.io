import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import customAxios from "../../../CustomAxios/customAxios";
import "../styles/revenue.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  CssBaseline,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

const Revenue = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [products, setProducts] = useState('');
  const itemsPerPage = 5;

  const [page, setPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = revenueData.slice(startIndex, endIndex);

  const getListProducts = async () => {
    const res = await customAxios.get(`/doanh-thu`);
    setProducts(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get("/by-date");
        if (response.status !== 200) {
          throw Error("Network response was not ok");
        }
    
        const apiData = response.data;
        console.log(apiData);
    
        if (Array.isArray(apiData)) {
          const combinedData = apiData.map((item) => ({
            date: Object.keys(item)[0],
            revenue: Object.values(item)[0],
          }));
          setRevenueData(combinedData);
        } else {
          console.error("API data is not an array:", apiData);
        }
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };
    

    fetchData();
    getListProducts();
  }, []);

  function formatCurrency(amount) {
    return amount.toLocaleString('en-US');
  }

  return (
    <Container maxWidth="lg" style={{ paddingTop: "20px", backgroundColor: "darkgray" }}>
      <CssBaseline />
      <Box mt={7.4} mb={0}>
        <Typography variant="h4" component="div" gutterBottom>
          Revenue Chart
        </Typography>
      </Box>

      <Paper className="revenue-chart">
        <Box p={2}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      <Paper>
        <Row>
          <Col sm={7}>
            <div>
              <h2>List of Revenue</h2>
              <Table className="table table-bordered table-striped">
                <TableHead className="table-list-revenue-head">
                  <TableRow>
                    <TableCell className="list-revenue">Date</TableCell>
                    <TableCell className="list-revenue">Revenue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-list-reveneu-body">
                  {itemsToDisplay.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{formatCurrency(item.revenue)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                count={Math.ceil(revenueData.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                className="revenue-pagination"
              />
            </div>
          </Col>

          <Col sm={5}>
            <Box p={2} className="revenue-total-table">
            <h3>Total Revenue</h3>
              <Table className="user-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="user-management-header">
                      Total Data Revenue
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="revenue-total-body">   
                    {formatCurrency(products)}
                </TableBody>
              </Table>
            </Box>
          </Col>
        </Row>
      </Paper>
    </Container>
  );
};

export default Revenue;

