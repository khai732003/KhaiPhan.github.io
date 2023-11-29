import React, { useState, useEffect } from "react";
import customAxios from "../../CustomAxios/customAxios";
import { useAuth } from "./Context/AuthContext";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ConfirmEmail from "./ConfirmEmail";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import VerifiedIcon from "@mui/icons-material/Verified";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LocalOrder() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = user.userId;
        const response = await customAxios.get(`/order/list-by-user/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

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

  // useEffect(() => {
  //   // Check if the user has any orders
  //   customAxios.get(`/order/exists/${user.userId}`)
  //     .then(response => {
  //       if (!response.data) {
  //         navigate('/');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error checking orders existence:', error);
  //     });
  // }, [user.userId, navigate]);

  const steps = ["CONFIRMED", "DELIVERING", "DELIVERED"];

  const handleDelete = (orderId) => {
    setOrderIdToDelete(orderId);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    setDeleting(true);

    customAxios
      .delete(`/order/delete/${orderIdToDelete}`)
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.filter((o) => o.id !== orderIdToDelete)
        );

        // Kiểm tra nếu orderIdToDelete giống với giá trị của localStorage
        if (orderIdToDelete == localStorage.getItem("orderId")) {
          localStorage.removeItem("orderId");
        }

        setDeleteConfirmationOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      })
      .finally(() => {
        setDeleting(false);
        setOrderIdToDelete(null);
      });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setOrderIdToDelete(null);
  };

  const handleReOrder = (orderId) => {
    localStorage.setItem("orderId", orderId);
    navigate(`/order/${orderId}`);
  };

  const getStepNumber = (shipStatus) => {
    switch (shipStatus) {
      case "NOT-CONFIRMED":
        return 0;
      case "CONFIRMED":
        return 1;
      case "DELIVERING":
        return 2;
      case "DELIVERED":
        return 3;
      default:
        return 0; // Set a default step number if the status is unknown
    }
  };

  return (
    <Container className="history-order-container">
      <Typography variant="h4" className="header" gutterBottom>
        My Orders
      </Typography>
      {orders.map((order) => (
        <Paper key={order.id} elevation={3} className="order-paper">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} container>
              <Typography
                variant="h6"
                className="order-id"
                style={{ marginRight: "auto" }}
              >
                <Button onClick={() => handleShowDetail(order.id)}>
                  Show Details
                </Button>
              </Typography>
              <Grid item sm={1}>
                <Typography variant="h6" className="order-id" gutterBottom>
                  CODE: {order.id}
                </Typography>
              </Grid>
              <Grid item sm={10}>
                <Box sx={{ width: "100%" }}>
                  <Stepper
                    activeStep={getStepNumber(order.shipStatus)}
                    alternativeLabel
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Grid>
              <Grid item sm={1}>
                {order.payStatus === "NOT_PAY" && (
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(order.id)}
                    disabled={deleting}
                  >
                    {deleting ? <CircularProgress size={24} /> : "REMOVE"}
                  </Button>
                )}
                {order.payStatus === "PAID" && <div></div>}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4} style={{ textAlign: "left" }}>
              <Typography className="order-info">
                Create Date:{" "}
                <span style={{ fontWeight: "80", color: "rgb(60,179,113)" }}>
                  {new Date(order.createDate).toLocaleString()}
                </span>
                <br />
                Address: {order.address}
                <br />
                Ship price: {order.shipPrice}
                <br />
                Total:{" "}
                <span style={{ color: "rgb(127,255,0)" }}>
                  {order.total_price}
                </span>
                <br />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>PRODUCT</Typography>
              {order.orderDetails.map((product) => (
                <div key={product.id} className="order-details">
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    className="product-info"
                  >
                    {product.name} x{product.quantity} {product.totalCost} VND
                    <br />
                    {/* Tổng giá sản phẩm: {product.totalCost} */}
                  </Typography>
                </div>
              ))}
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Grid item xs={12} sm={6}>
                {order.payStatus === "NOT_PAY" && (
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => handleReOrder(order.id)}
                    >
                      RE-ORDER
                    </Button>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {order.payStatus === "NOT_PAY" &&
                  order.orderDetails.length > 0 && (
                    <div>
                      <ConfirmEmail orderId2={order.id} />
                    </div>
                  )}
                {order.payStatus === "PAID" && (
                  <div>
                    <Typography gutterBottom>
                      <VerifiedIcon fontSize="small" />
                      PAY COMPLETE
                    </Typography>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
      {/* Hộp thoại xác nhận xóa */}
      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Do you want to delete order ID {orderIdToDelete} ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

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
    </Container>
  );
}
