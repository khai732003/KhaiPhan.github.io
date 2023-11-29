import React, { useState, useEffect } from "react";
import customAxios from "../../../CustomAxios/customAxios";
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
} from "@mui/material";
import PaginationComponent from "./PaginationComponent";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid";

const ITEMS_PER_PAGE = 5;

const ListNotConfirm = () => {
  const navigate = useNavigate();
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserIds, setSelectedUserIds] = useState({}); // Use an object to store userId for each item
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get(
          "/order/list-all-orderPaid-by/NOT_CONFIRM"
        );
        setNotifications(response.data);

        const staffResponse = await customAxios.get("/user/liststaffandfalse");
        setStaffList(staffResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
    navigate("/listdelivered");
  };

  const handleConfirm = async (orderId) => {
    try {
      const confirmResponse = await customAxios.post("/shipping/add", {
        shippingDate: "2023-10-26T15:37:00.000",
        status: "CONFIRMED",
        orderId: orderId,
        userId: selectedUserIds[orderId] || "", // Get the userId from the state
      });

      console.log("Confirmation response:", confirmResponse.data);
      setTriggerUpdate(true);
      toast.success("Shipping successful!");
    } catch (error) {
      console.error("Error confirming order:", error);
      toast.error("Choose a staff to deliver");
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

  return (
    <>
      <div style={{ paddingTop: "6rem", paddingBottom: "1rem" }}>
        <Button variant="contained" onClick={handleDeliverd}>
          Show Delivered
        </Button>
      </div>
      <Container
        style={{ color: "#3f51b5", textAlign: "center", height: "70.3vh" }}
      >
        <Typography variant="h4" className="header" gutterBottom>
          Waiting Confirm
        </Typography>

        <TableContainer component={Paper} style={{ height: "53vh" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Ship Status</TableCell>
                <TableCell>Ship by</TableCell>
                <TableCell>Detail</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>{notification.id}</TableCell>
                  <TableCell>{notification.name}</TableCell>
                  <TableCell>{notification.shipStatus}</TableCell>
                  <TableCell>
                    {/* User selection dropdown for each item */}
                    <Select
                      value={selectedUserIds[notification.id] || ""}
                      onChange={(e) =>
                        setSelectedUserIds((prev) => ({
                          ...prev,
                          [notification.id]: e.target.value,
                        }))
                      }
                      style={{ marginBottom: "16px" }}
                    >
                      <MenuItem value="" disabled>
                        Select User
                      </MenuItem>
                      {staffList.map((staff) => (
                        <MenuItem key={staff.id} value={staff.id}>
                          {staff.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleShowDetail(notification.id)}>
                      Show Details
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleConfirm(notification.id)}>
                      CONFIRM DELIVERING
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <PaginationComponent
          items={notifications}
          onPageChange={handlePageChange}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Container>

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
    </>
  );
};

export default ListNotConfirm;
