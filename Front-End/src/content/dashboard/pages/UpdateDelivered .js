// UpdateDelivered.js
import React, { useState, useEffect } from 'react';
import customAxios from '../../../CustomAxios/customAxios';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import PaginationComponent from './PaginationComponent';
import { useAuth } from '../../SanPham/Context/AuthContext';

const ITEMS_PER_PAGE = 5;

const UpdateDelivered = ({ triggerUpdate, setTriggerUpdate }) => {
  const {user} = useAuth();
  const [notificationsDelivering, setNotificationsDelivering] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get(`/order/list-all-orderPaid-by/${user.userId}/DELIVERING`);
        setNotificationsDelivering(response.data);
      } catch (error) {
        console.error('Error fetching delivering data:', error);
      }
    };

    fetchData();
  }, [triggerUpdate]); // Include triggerUpdate as a dependency

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Get the list of items for the current page
  const currentItems = notificationsDelivering.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
    <Container style={{color:'#3f51b5', textAlign:'center', height:'72.5vh'}}>
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
            {currentItems.map(notification => (
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

      <PaginationComponent items={notificationsDelivering} onPageChange={handlePageChange} />

    </Container>
  );
};

export default UpdateDelivered;
