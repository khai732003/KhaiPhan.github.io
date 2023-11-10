// ListConfirm.js
import React, { useState, useEffect } from 'react';
import customAxios from '../../../CustomAxios/customAxios';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const ListConfirm = ({ triggerUpdate, setTriggerUpdate }) => {
  const [notificationsConfirmed, setNotificationsConfirmed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get('/order/list-all-orderPaid-by/CONFIRMED');
        setNotificationsConfirmed(response.data);
      } catch (error) {
        console.error('Error fetching confirmed data:', error);
      }
    };

    fetchData();
  }, [triggerUpdate]); // Include triggerUpdate as a dependency

  const handleUpdateStatus = async (orderId) => {
    try {
      const updateStatusResponse = await customAxios.put(`/shipping/update/status/${orderId}?newStatus=DELIVERING`);
      console.log('Update status response:', updateStatusResponse.data);
      setTriggerUpdate((prev) => prev + 1); // Update triggerUpdate to trigger useEffect in parent
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <Container className="history-order-container">
      <Typography variant="h4" className="header" gutterBottom>
        Confirmed Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Ship Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notificationsConfirmed.map(notification => (
              <TableRow key={notification.id}>
                <TableCell>{notification.id}</TableCell>
                <TableCell>{notification.name}</TableCell>
                <TableCell>{notification.shipStatus}</TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdateStatus(notification.id)}>
                    UPDATE STATUS
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListConfirm;
