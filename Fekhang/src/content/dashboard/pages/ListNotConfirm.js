// ListNotConfirm.js
import React, { useState, useEffect } from 'react';
import customAxios from '../../../CustomAxios/customAxios';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import PaginationComponent from './PaginationComponent';

const ITEMS_PER_PAGE = 5;

const ListNotConfirm = ({ triggerUpdate, setTriggerUpdate }) => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Get the list of items for the current page
  const currentItems = notifications.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleConfirm = async (orderId) => {
    try {
      const confirmResponse = await customAxios.post('/shipping/add', {
        shippingDate: "2023-10-26T15:37:00.000",
        status: "CONFIRMED",
        orderId: orderId,
      });
      console.log('Confirmation response:', confirmResponse.data);
      setTriggerUpdate((prev) => prev + 1);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <>
    <Container style={{color:'#3f51b5', textAlign:'center', height:'72.5vh'}}>
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
            {currentItems.map(notification => (
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

      <PaginationComponent items={notifications} onPageChange={handlePageChange} />

    </Container>
    </>
  );
};

export default ListNotConfirm;
