import React, { useState, useEffect } from 'react';
import customAxios from '../../../CustomAxios/customAxios';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const ListDelivered = ({ triggerUpdate }) => {
  const [notificationsDelivered, setNotificationsDelivered] = useState([]);

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
  }, [triggerUpdate]); // Include triggerUpdate as a dependency

  return (
    <Container className="history-order-container">
    <Typography variant="h4" className="header" gutterBottom>
    Delivered Orders
    </Typography>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notificationsDelivered.map(notification => (
            <TableRow key={notification.id}>
              <TableCell>{notification.id}</TableCell>
              <TableCell>{notification.name}</TableCell>
              <TableCell>{notification.shipStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
  );
};

export default ListDelivered;
