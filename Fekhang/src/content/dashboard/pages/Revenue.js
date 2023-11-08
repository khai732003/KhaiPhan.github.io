// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const Revenue = () => {
//   const sampleDataString = {
//     "2023-11-07": 640000.0,
//     "2023-11-06": 260000.0
//   };

//   const revenueData = Object.keys(sampleDataString).map((data) => ({
//     data,
//     revenue: sampleDataString[data],
//   }));

//   return (
//     <div className="user-management-page" style={{ paddingTop: "100px" }}>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={revenueData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="data" />
//           <YAxis domain={["auto", "auto"]} />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="revenue"
//             stroke="#8884d8"
//             name="Doanh thu"
//           />
//         </LineChart>
//       </ResponsiveContainer>

//       <div>
//         <h2>Danh sách doanh thu</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Data</th>
//               <th>Doanh thu</th>
//             </tr>
//           </thead>
//           <tbody>
//             {revenueData.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.data}</td>
//                 <td>{item.revenue}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Revenue;

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
        const response = await customAxios.get(
          "/by-date"
        );
        if (response.status !== 200) {
          throw Error("Network response was not ok");
        }
        const apiData = response.data;
        console.log(apiData);
        if (Array.isArray(apiData)) {
          const combinedData = Object.entries(apiData[0]).map(
            ([date, revenue]) => ({
              date: date,
              revenue: revenue,
            })
          );
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

  return (
    <Container maxWidth="lg" style={{ paddingTop: "20px", backgroundColor: "darkgray" }}>
      <CssBaseline />
      <Box mt={7.4} mb={0}>
        <Typography variant="h4" component="div" gutterBottom>
          Biểu Đồ Doanh Thu
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
                name="Doanh thu"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      <Paper>
        <Row>
          <Col sm={7}>
            <div>
              <h2>Danh sách doanh thu</h2>
              <Table className="table table-bordered table-striped">
                <TableHead className="table-list-revenue-head">
                  <TableRow>
                    <TableCell className="list-revenue">Data</TableCell>
                    <TableCell className="list-revenue">Doanh thu</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-list-reveneu-body">
                  {itemsToDisplay.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.revenue}</TableCell>
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
            <h3>Tổng Số Doanh Thu</h3>
              <Table className="user-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="user-management-header">
                      Total Data Revenue
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="revenue-total-body">   
                    {products}
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


// import React, { useState, useEffect } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import customAxios from "../../../CustomAxios/customAxios";
// import "../styles/revenue.css";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   Box,
//   CssBaseline,
//   Typography,
// } from "@mui/material";

// const URL = "https://6548df44dd8ebcd4ab23c85c.mockapi.io/venue";

// const Revenue = () => {
//   const [revenueData, setRevenueData] = useState([]);
//   const [products, setProducts] = useState([]);

//   const getRevenueData = async () => {
//     try {
//       const res = await customAxios.get(URL);
//       setRevenueData(res.data);
//       console.log(res.data);
//     } catch (error) {
//       console.error("Error fetching revenue data:", error);
//     }
//   };

// const getListProducts = async () => {
//   const res = await customAxios.get(`/doanh-thu`);
//   setProducts(res.data);
//   console.log(res.data);
// };

//   useEffect(() => {
//     getRevenueData();
//     getListProducts();
//   }, []);

//   return (
//     <Container maxWidth="lg">
//       <CssBaseline />
//       <Box mt={7.4} mb={0}>
//         <Typography variant="h4" component="div" gutterBottom>
//           Doanh Thu
//         </Typography>
//       </Box>

//       <Paper className="revenue-chart">
//         <Box p={2}>
//           <ResponsiveContainer width="100%" height={400}>
//             <LineChart data={revenueData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="data" />
//               <YAxis domain={["auto", "auto"]} />
//               <Tooltip />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="revenue"
//                 stroke="#8884d8"
//                 name="Doanh thu"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </Box>
//       </Paper>

//       <Paper>
//         <Row>
//           <Col sm={7}>
//             <div>
//               <h2>Danh sách doanh thu</h2>
//               <table className="table table-bordered table-striped">
//                 <thead>
//                   <tr>
//                     <th>Data</th>
//                     <th>Doanh thu</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {revenueData.map((item, index) => (
//                     <tr key={index}>
//                       <td>{item.data}</td>
//                       <td>{item.revenue}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </Col>

//           <Col sm={5}>
//             <Box p={3} className="revenue-total-table">
//               <table className="user-table">
//                 <thead>
//                   <tr>
//                     <th className="user-management-header">
//                       Total Data Revenue
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="revenue-total-body">
//                   {products &&
//                     products.map((product, index) => (
//                       <tr key={product.id}>
//                         <td className="user-management-td smaller-text">
//                           {product.data}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </Box>
//           </Col>
//         </Row>
//       </Paper>
//     </Container>
//   );
// };

// export default Revenue;
