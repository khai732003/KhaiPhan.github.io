import React, { useState, useEffect } from 'react';
import customAxios from '../../../CustomAxios/customAxios';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Pagination } from '@mui/material';

const ITEMS_PER_PAGE = 5;

const ListDelivered = ({ triggerUpdate }) => {
  const [notificationsDelivered, setNotificationsDelivered] = useState([]);
  const [page, setPage] = useState(1);

  // Hàm này sẽ lấy nameBy dựa trên orderId
  const getNameBy = async (orderId) => {
    try {
      const response = await customAxios.get(`/user/shipBy/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching delivered data:', error);
      return '';
    }
  };

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
    <Container className="history-order-container" >
      <Typography variant="h4" className="header" gutterBottom>
        Delivered Orders
      </Typography>

      <TableContainer component={Paper} style={{ height: '57vh' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Ship Status</TableCell>
              <TableCell>Ship By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map(notification => (
              <TableRow key={notification.id}>
                <TableCell>{notification.id}</TableCell>
                <TableCell>{notification.name}</TableCell>
                <TableCell>{notification.shipStatus}</TableCell>
                <TableCell>
                  {/* Sử dụng orderId từ notification để gọi API */}
                  {notification.id && (
                    <NameByComponent orderId={notification.id} getNameBy={getNameBy} />
                  )}
                </TableCell>
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
          marginY: 2,
        }}
        shape="rounded"
        color="primary"
      />

    </Container>
  );
};

// Component mới để lấy nameBy dựa trên orderId
const NameByComponent = ({ orderId, getNameBy }) => {
  const [nameBy, setNameBy] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await getNameBy(orderId);
      setNameBy(result);
    };

    fetchData();
  }, [orderId, getNameBy]);

  return <span>{nameBy}</span>;
};

export default ListDelivered;
