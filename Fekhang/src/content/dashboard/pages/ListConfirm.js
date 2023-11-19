// ListConfirm.js
import React, { useState, useEffect } from 'react';
import customAxios from '../../../CustomAxios/customAxios';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import PaginationComponent from './PaginationComponent';
import { useAuth } from '../../SanPham/Context/AuthContext';

const ITEMS_PER_PAGE = 5;

const ListConfirm = ({ triggerUpdate, setTriggerUpdate }) => {
  const {user} = useAuth();
  const [notificationsConfirmed, setNotificationsConfirmed] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get(`/order/list-all-orderPaid-by/${user.userId}/CONFIRMED`);
        setNotificationsConfirmed(response.data);
      } catch (error) {
        console.error('Error fetching confirmed data:', error);
      }
    };

    fetchData();
  }, [triggerUpdate]); // Include triggerUpdate as a dependency

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Get the list of items for the current page
  const currentItems = notificationsConfirmed.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
    <Container style={{color:'#3f51b5', textAlign:'center', height:'72.5vh'}}>
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
            {currentItems.map(notification => (
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

      <PaginationComponent items={notificationsConfirmed} onPageChange={handlePageChange} />

    </Container>
  );
};

export default ListConfirm;

