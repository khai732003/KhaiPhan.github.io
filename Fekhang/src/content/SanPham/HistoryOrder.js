import React, { useEffect, useState } from "react";
import customAxios from "../../CustomAxios/customAxios"; // Thay đường dẫn đến customAxios bằng đường dẫn thực tế
import { useAuth } from "./Context/AuthContext";
import {
  Container,
  Typography,
  Paper,
  Divider,
  Grid,
  StepLabel,
  Step,
  Box,
  Stepper,
  Button,
} from "@mui/material";
import "./Scss/HistoryDetail.scss";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
export default function HistoryOrder() {
  const [checkF, setCheckF] = useState(false);
  const [orders, setOrders] = useState([]);
  const [listDetail, setListDetail] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Gọi API sử dụng customAxios để lấy danh sách các đơn hàng đã thanh toán của người dùng với userId là 3
    customAxios
      .get(`/order/list-by-user-and-pay-status/${user.userId}/PAID`)
      .then((response) => {
        // Lưu kết quả trả về vào state
        setOrders(response.data);
  
        // Accumulate all orderDetails into a single list
        const allOrderDetails = response.data.reduce((acc, order) => {
          return acc.concat(order.orderDetails);
        }, []);
  
        // Set listDetail to the accumulated orderDetails
        setListDetail(allOrderDetails);
  
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  
  useEffect(() => {
    console.log(listDetail);
  
    // Extract and log the IDs of each orderDetail
    const orderDetailIds = listDetail.map(orderDetail => orderDetail.id);
    console.log('OrderDetail IDs:', orderDetailIds);
  }, [listDetail]);
  

  const handleFeedBack = (productId) => {
    navigate(`/addfeedback/${productId}`);
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

  // useEffect(() => {
  //   const checkUserPurchase = async () => {
  //     try { 
  //       const orderDetailIds = listDetail.map(orderDetail => orderDetail.id);
        
  //       const response = await customAxios.get(`/feedback/check-by-orderdetail/${orderDetailIds}`);
  //       setCheckF(response.data);
  //       console.log(response.data)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  
  //   checkUserPurchase();
  // }, [listDetail]);
  // console.log(checkF)
  

  const steps = ["CONFIRMED", "DELIVERING", "DELIVERED"];

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
        Lịch sử đơn hàng
      </Typography>
      {orders.map((order) => (
        <Paper key={order.id} elevation={3} className="order-paper">
          <Typography variant="h6" className="order-id" style={{marginRight: "auto"}}>
            <Button onClick={() => handleShowDetail(order.id)}>
              Show Details
            </Button>
          </Typography>
          <Grid container spacing={2}>
            <Grid item sm={12}>
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
            <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
              <Typography variant="h6" className="order-id" gutterBottom>
                Code: {order.id}
              </Typography>
              <Typography className="order-info">
                Create Date :<span style={{ fontWeight: '80', color: 'rgb(60,179,113)' }}> {new Date(order.createDate).toLocaleString()}</span><br />
                Address: {order.address}<br />
                Total Price: <span style={{ color: 'rgb(127,255,0)' }}>{order.total_price}</span><br />
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              {order.orderDetails.map((product) => (
                <div key={product.id} className="order-details">
                  <Typography variant="subtitle1" gutteBottom className="product-info">
                    {product.name} x{product.quantity}<br />
                    Total product price: {product.totalCost}
                  </Typography>
                  {order.shipStatus === "DELIVERED" && (
                    <Button onClick={() => handleFeedBack(product.productId)}>
                      FeedBack
                    </Button>
                  )}
                </div>
              ))}
            </Grid>
          </Grid>
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
                              <Typography
                                variant="h6"
                                style={{ color: "blue" }}
                              >
                                Category Details
                              </Typography>
                              <Typography>
                                Name: {product.category.name}
                              </Typography>
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
                              <Typography
                                variant="h6"
                                style={{ color: "blue" }}
                              >
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
        </Paper>
      ))}
    </Container>
  );
}
