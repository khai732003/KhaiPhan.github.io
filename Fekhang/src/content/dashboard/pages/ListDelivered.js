import React, { useState, useEffect } from 'react';
import customAxios from '../../../CustomAxios/customAxios';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Pagination } from '@mui/material';

const ITEMS_PER_PAGE = 5;

const ListDelivered = ({ triggerUpdate }) => {
  const [notificationsDelivered, setNotificationsDelivered] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get('/order/list-all-orderPaid-by/DELIVERED');
        setNotificationsDelivered(response.data);
      } catch (error) {
        console.error('Error fetching delivered data:', error);
      }
    };

    fetchData();
  }, [triggerUpdate]);

  // Tính toán chỉ mục bắt đầu và kết thúc cho mỗi trang
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Lấy danh sách các mục cho trang hiện tại
  const currentItems = notificationsDelivered.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container className="history-order-container">
      <Typography variant="h4" className="header" gutterBottom>
        Delivered Orders
      </Typography>

      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Ship Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map(notification => (
              <TableRow key={notification.id}>
                <TableCell>{notification.id}</TableCell>
                <TableCell>{notification.name}</TableCell>
                <TableCell>{notification.shipStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(notificationsDelivered.length / ITEMS_PER_PAGE)}
        page={page}
        onChange={handlePageChange}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginY: 2, // Điều chỉnh khoảng cách giữa bảng và trang trình chiếu
        }}
        shape="rounded" // Thiết lập hình dạng là hình tròn
        color="primary" // Màu chữ là màu đen
      />

    </Container>
  );
};

export default ListDelivered;
