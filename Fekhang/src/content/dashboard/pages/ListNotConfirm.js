import React, { useState, useEffect } from 'react';
import customAxios from '../../../CustomAxios/customAxios';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import PaginationComponent from './PaginationComponent';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 5;

const ListNotConfirm = () => {
  const navigate = useNavigate();
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserIds, setSelectedUserIds] = useState({}); // Use an object to store userId for each item

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get('/order/list-all-orderPaid-by/NOT_CONFIRM');
        setNotifications(response.data);

        const staffResponse = await customAxios.get('/user/liststaffandfalse');
        setStaffList(staffResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [triggerUpdate]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = notifications.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeliverd = () => {
    navigate('/listdelivered');
  }

  const handleConfirm = async (orderId) => {
    try {
      const confirmResponse = await customAxios.post('/shipping/add', {
        shippingDate: "2023-10-26T15:37:00.000",
        status: "CONFIRMED",
        orderId: orderId,
        userId: selectedUserIds[orderId] || '', // Get the userId from the state
      });
      console.log('Confirmation response:', confirmResponse.data);
      setTriggerUpdate(true);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <>
      <div style={{ paddingTop: '6rem', paddingBottom: '1rem' }}>
        <Button variant='contained' onClick={handleDeliverd}>
          Show Delivered
        </Button>
      </div>
      <Container style={{ color: '#3f51b5', textAlign: 'center', height: '70.3vh' }}>
        <Typography variant="h4" className="header" gutterBottom>
          Waiting Confirm
        </Typography>

        <TableContainer component={Paper} style={{height:'53vh'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Ship Status</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>{notification.id}</TableCell>
                  <TableCell>{notification.name}</TableCell>
                  <TableCell>{notification.shipStatus}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleConfirm(notification.id)}>
                      UPDATE CONFIRMED
                    </Button>
                  </TableCell>
                  <TableCell>
                    {/* User selection dropdown for each item */}
                    <Select
                      value={selectedUserIds[notification.id] || ''}
                      onChange={(e) =>
                        setSelectedUserIds((prev) => ({ ...prev, [notification.id]: e.target.value }))
                      }
                      style={{ marginBottom: '16px' }}
                    >
                      <MenuItem value='' disabled>
                        Select User
                      </MenuItem>
                      {staffList.map((staff) => (
                        <MenuItem key={staff.id} value={staff.id}>
                          {staff.name}
                        </MenuItem>
                      ))}
                    </Select>
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
