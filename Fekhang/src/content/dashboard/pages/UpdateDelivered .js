// UpdateDelivered.js
import React, { useState, useEffect } from 'react';
import customAxios from '../../../CustomAxios/customAxios';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const UpdateDelivered = ({ triggerUpdate, setTriggerUpdate }) => {
  const [notificationsDelivering, setNotificationsDelivering] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get('/order/list-all-orderPaid-by/DELIVERING');
        setNotificationsDelivering(response.data);
      } catch (error) {
        console.error('Error fetching delivering data:', error);
      }
    };

    fetchData();
  }, [triggerUpdate]); // Include triggerUpdate as a dependency

  const handleUpdateDelivered = async (orderId) => {
    try {
      const updateDeliveredResponse = await customAxios.put(`/shipping/update/status/${orderId}?newStatus=DELIVERED`);
      console.log('Update delivered response:', updateDeliveredResponse.data);
      setTriggerUpdate((prev) => prev + 1); // Update triggerUpdate to trigger useEffect in parent
    } catch (error) {
      console.error('Error updating delivered status:', error);
    }
  };

  return (
    <Container style={{color:'#3f51b5', textAlign:'center'}}>
      <Typography variant="h4" className="header" gutterBottom>
        Delivering Orders
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
            {notificationsDelivering.map(notification => (
              <TableRow key={notification.id}>
                <TableCell>{notification.id}</TableCell>
                <TableCell>{notification.name}</TableCell>
                <TableCell>{notification.shipStatus}</TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdateDelivered(notification.id)}>
                    UPDATE DELIVERED
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

export default UpdateDelivered;
