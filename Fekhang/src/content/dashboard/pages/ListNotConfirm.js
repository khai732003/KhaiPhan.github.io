import React, { useState, useEffect } from 'react';
import customAxios from '../../../CustomAxios/customAxios';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import ListConfirm from './ListConfirm';
import UpdateDelivered from './UpdateDelivered ';

const ListNotConfirm = ({ triggerUpdate, setTriggerUpdate }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get('/order/list-all-orderPaid-by/NOT_CONFIRM');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [triggerUpdate]); // Include triggerUpdate as a dependency

  const handleConfirm = async (orderId) => {
    try {
      const confirmResponse = await customAxios.post('/shipping/add', {
        shippingDate: "2023-10-26T15:37:00.000",
        status: "CONFIRMED",
        orderId: orderId,
      });
      console.log('Confirmation response:', confirmResponse.data);
      setTriggerUpdate((prev) => prev + 1); // Update triggerUpdate to trigger useEffect in parent
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <>
    <Container style={{color:'#3f51b5', textAlign:'center'}}>
      <Typography variant="h4" className="header" gutterBottom>
        Waiting Confirm
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
            {notifications.map(notification => (
              <TableRow key={notification.id}>
                <TableCell>{notification.id}</TableCell>
                <TableCell>{notification.name}</TableCell>
                <TableCell>{notification.shipStatus}</TableCell>
                <TableCell>
                  <Button onClick={() => handleConfirm(notification.id)}>
                    UPDATE CONFIRMED
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>

    </>
    
  );
};

export default ListNotConfirm;
