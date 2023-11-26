import React, { useState, useEffect } from 'react';
import customAxios from '../../../CustomAxios/customAxios';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Pagination } from '@mui/material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid";
const ITEMS_PER_PAGE = 5;

const ListDelivered = ({ triggerUpdate }) => {
  const [notificationsDelivered, setNotificationsDelivered] = useState([]);
  const [page, setPage] = useState(1);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
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

  const handleShowDetail = async (orderId) => {
    try {
      const detailResponse = await customAxios.get(
        `/product/select-by-order/${orderId}`
      );
      setSelectedItemDetails(detailResponse.data);
      setOpenDetailDialog(true);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
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
              <TableCell>Detail</TableCell>
              <TableCell>Ship Status</TableCell>
              <TableCell>Ship By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map(notification => (
              <TableRow key={notification.id}>
                <TableCell>{notification.id}</TableCell>
                <TableCell>
                    <Button onClick={() => handleShowDetail(notification.id)}>
                      Show Details
                    </Button>
                  </TableCell>
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
      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Item Details</DialogTitle>
        <DialogContent>
          {/* Render the details of the selected item */}
          {selectedItemDetails && (
            <Grid container spacing={2}>
              {selectedItemDetails.map((product) => (
                <Grid item key={product.id} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <img
                        src={product.productImage}
                        alt={product.name}
                        style={{ maxWidth: "100%" }}
                      />
                      <Typography
                        style={{ color: "red", marginTop: "1rem" }}
                        variant="h5"
                      >
                        {product.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Grid container spacing={2}>
                        {/* Product details */}
                        <Grid item xs={6}>
                          <Typography variant="h6" style={{ color: "blue" }}>
                            Category Details
                          </Typography>
                          <Typography>Name: {product.category.name}</Typography>
                          <hr />

                          <Typography>Code: {product.code}</Typography>
                          <Typography>Stock: {product.stock}</Typography>
                          <Typography>
                            Extra Price: {product.extraPrice}
                          </Typography>
                          <Typography>
                            Total Price: {product.totalPrice}
                          </Typography>
                          {/* Add more product details as needed */}
                        </Grid>

                        {/* Cage details */}
                        <Grid item xs={6}>
                          <Typography variant="h6" style={{ color: "blue" }}>
                            Cage Details
                          </Typography>
                          <Typography gutterBottom>
                            Description: {product.cage.description}
                          </Typography>
                          <Typography>
                            Shape: {product.cage.shape.shapeName} - Price:{" "}
                            {product.cage.shape.price}
                          </Typography>
                          <Typography>
                            Material: {product.cage.material.materialName} -
                            Price: {product.cage.material.price}
                          </Typography>
                          <Typography>
                            Size: {product.cage.size.sizeName} - Price:{" "}
                            {product.cage.size.price}
                          </Typography>
                          <Typography>
                            MinSpokes: {product.cage.size.minspokes} -
                            MaxSpokes: {product.cage.size.maxspokes} 
                          </Typography>
                          <Typography>
                            Spokes: {product.cage.spokes} 
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <hr />
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDetailDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

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
