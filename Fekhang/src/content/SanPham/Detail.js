import React, { useState, useEffect } from "react";
import customAxios from "../../CustomAxios/customAxios";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Grid,
  Container,
  Card,
  CardMedia,
  List,
  Button,
} from "@mui/material";
import "./Scss/Detail.scss";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAuth } from "./Context/AuthContext";
import { useCart } from "./Context/CartContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

function Detail({
  id,
  name,
  stock,
  totalPrice,
  productImage,
  code,
  cage,
  accessories,
}) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [productDetail, setProductDetail] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isReturningFromLogin, setIsReturningFromLogin] = useState(false);
  const [rate, setRate] = useState(null);
  const [show, setShow] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity

  let orderId = localStorage.getItem("orderId");

  useEffect(() => {
    customAxios
      .get(`/product/select/${productId}`)
      .then((response) => {
        setProductDetail(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product detail:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = user.userId;
        const response = await customAxios.get(`/order/checkUserPurchase/${userId}/${productId}`);
        setShow(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);


  useEffect(() => {
    customAxios
      .get(`/feedback/average-rating/${productId}`)
      .then((response) => {
        console.log(response.data); // Log the response to the console
        setRate(response.data);
        console.log(rate)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rating data:", error);
        setLoading(false);
      });
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  const handleFeedback = (productId) => {
    navigate(`/addfeedback/${productId}`);
  };
  const handleReturnPage = () => {
    navigate(-1);
  };
  const handleQuantityChange = (event) => {
    // Update the quantity when it changes
    setQuantity(parseInt(event.target.value, 10));
  };
  const handleAddToCart = () => {
    const {
      id,
      name,
      stock,
      totalPrice,
      productImage,
      productDetailImage,
      code,
      cage,
      accessories,
    } = productDetail; // Lấy giá trị từ productDetail
    addToCart({
      id,
      name,
      stock,
      totalPrice,
      productImage,
      code,
      cage,
      accessories,
    }); // Truyền giá trị vào hàm addToCart
    window.alert(`Added ${name} to the cart!`);
  };

  useEffect(() => {
    // Kiểm tra xem có quay trở lại từ Login.js hay không
    const storedIsReturningFromLogin = localStorage.getItem('isReturningFromLogin');
    const isDetailReturn = localStorage.getItem('isDetailReturn');
    if (storedIsReturningFromLogin === 'true' && isDetailReturn === 'true') {
      setIsReturningFromLogin(true);
      localStorage.setItem('isReturningFromLogin', 'false');
      localStorage.setItem('isDetailReturn', 'false');
    }
  }, []);


  useEffect(() => {

    if (isReturningFromLogin) {
      const id = localStorage.getItem('proId');
      localStorage.removeItem('proId');
      console.log(id)
      handleBuy(id);
    }
  }, [isReturningFromLogin, orderId]);

  const handleBuy = async (id) => {

    if (!user) {
      localStorage.setItem('isDetailReturn', 'true');
      localStorage.setItem('proId', productId);
      localStorage.setItem('toBuy', window.location.pathname);
      navigate("/login")
      return;
    }
    try {
      const address = user.address;
      if (!orderId) {
        const orderResponse = await customAxios.post('/order/add', {
          "name": "Tổng hóa đơn",
          "status": "pending",
          "paymentMethod": "credit card",
          "address": address,
          "city": "Đà Nẵng",
          "content": "Đóng gói cẩn thận nhé",
          "shipDate": "2023-10-15",
          userId: user.userId
        });

        orderId = orderResponse.data.id;
        localStorage.setItem('orderId', orderId);
        console.log(orderId)
      }

      console.log(orderId)

      // const product = { id, name, stock, totalPrice, productImage, code, cage, accessories };
      await customAxios.post('/order_detail/add', {
        quantity,
        hirePrice: productDetail.hirePrice,
        name: productDetail.name,
        totalOfProd: productDetail.totalOfProd,
        hirePrice: productDetail.hirePrice,
        name: productDetail.name,
        totalOfProd: productDetail.totalOfProd,
        note: `Sản phẩm là ${id}`,
        orderId: orderId,
        productId: productDetail.id,
        totalCost: productDetail.totalPrice
      });
      console.log(orderId)
      navigate(`/order/${orderId}`);
    } catch (error) {
      console.error("Lỗi khi tạo order và order detail:", error);
    }
  };

  useEffect(() => {
    if (isReturningFromLogin) {
      // Nếu người dùng đã đăng nhập, chạy lại handleCustomProduct
      const id = localStorage.getItem("cusroid");
      localStorage.removeItem("cusroid");
      handleCustomProduct(id);
      // Đặt trạng thái isReturningFromLogin về false để không chạy lại vào lần sau
      setIsReturningFromLogin(false);
    }
  }, [isReturningFromLogin]);

  const handleCustomProduct = (id) => {
    if (!user) {
      localStorage.setItem('isDetailReturn', 'true');
      localStorage.setItem('cusroid', productId);
      localStorage.setItem('toBuy', window.location.pathname);
      navigate("/login")
      return;
    }
    navigate(`/customeproduct/${id}`);
  };


  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (!productDetail) {
    return <div>Product not found</div>;
  }

  return (

    <div className="full-container-details" style={{ paddingBottom: "3rem" }}>

      <Box className="product-container-productdetail">
        <Grid
          container
          spacing={2}
          className="container-productdetail"
          justifyContent="center"
        >

          <Grid item xs={12} md={11} style={{ margin: "" }}>
            <Container maxWidth="md">
              <div >

                <div className="list-acc">
                  <div>
                    Accessory
                  </div>
                  {productDetail.accessories.map((accessory, index) => (
                    <div key={index} className="sub-acc">
                      <strong>{accessory.description}:</strong> ${accessory.price}
                    </div>
                  ))}
                </div>
              </div>
              <Card style={{ padding: "2rem", borderRadius: "1rem" }}>
                <div className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  <Button
                    sx={{ fontSize: 18 }}
                    variant="contained"
                    style={{ backgroundColor: "#e0e0e0", color: "#212121" }}
                    startIcon={<ArrowBackIcon />}
                    onClick={handleReturnPage}
                  >
                    BACK
                  </Button>
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={5}>
                    <CardMedia
                      style={{
                        borderRadius: "1rem",
                        width: "20rem",
                        height: "26rem",
                      }}
                      id="image-container-productdetail"
                      component="img"
                      alt="Product"
                      image={
                        selectedImage || productDetail.productDetailImage[0]
                      }
                    />
                    <List style={{ paddingTop: "1rem", paddingBottom: "0" }}>
                      {productDetail.productDetailImage &&
                        productDetail.productDetailImage.map((image, index) => (
                          <div
                            key={index}
                            onClick={() => handleImageClick(image)}
                            style={{
                              display: "inline-block",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={image}
                              alt={`Product Thumbnail ${index}`}
                              style={{
                                width: "4rem",
                                height: "4rem",
                                marginRight: "1rem",
                                borderRadius: "0.5rem",
                              }}
                            />
                          </div>
                        ))}
                    </List>
                  </Grid>
                  <Grid item xs={12} md={7} style={{ position: "relative" }}>
                    <div style={{ padding: "20px" }}>
                      <h3
                        style={{
                          fontSize: "28px",
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                      >
                        {productDetail.name}
                      </h3>

                      <div
                        style={{
                          marginBottom: "20px",
                          fontSize: "24px",
                          color: "red",
                        }}
                      >
                        ${productDetail.totalPrice}
                      </div>
                      <div style={{ marginBottom: "20px" }}>
                        <h5
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            marginBottom: "10px",
                          }}
                        >
                          Product Configuration
                        </h5>
                        <div className="color-choose">
                          {productDetail.colors &&
                            productDetail.colors.map((color, index) => (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "5px",
                                }}
                              >
                                <input
                                  type="radio"
                                  id={color}
                                  name="color"
                                  value={color}
                                />
                                <label
                                  htmlFor={color}
                                  style={{ marginLeft: "5px" }}
                                >
                                  {color}
                                </label>
                              </div>
                            ))}
                        </div>

                        <hr />
                        <Box
                          sx={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Rating
                            name="text-feedback"
                            value=
                            {rate}
                            readOnly
                            precision={0.5}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />

                        </Box>
                      </div>
                    </div>
                    <div>
                      <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min={1}
                        max={productDetail.stock} // Set the maximum quantity based on stock
                      />
                      {show === true && <div>
                        <Stack direction="row" spacing={2} style={{ justifyContent: "end" }}>
                          <Button variant="contained" endIcon={<SendIcon />} onClick={() => handleFeedback(productId)}>
                            FeedBack
                          </Button>
                        </Stack>
                      </div>}
                    </div>

                    {show === false && (
                      <div></div>
                    )}


                    <div
                      style={{
                        position: "absolute",
                        bottom: "5rem",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        className="custom-button-cart"
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        className="custom-button-buy"
                        variant="contained"
                        startIcon={<AttachMoneyIcon />}
                        onClick={() => handleBuy(productDetail.id)}
                      >
                        Buy Now
                      </Button>
                      <Button
                        className="custom-button-custom-product"
                        variant="contained"
                        onClick={() => handleCustomProduct(productDetail.id)}
                      >
                        Custom Product
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </div >
  );
}

export default Detail;
