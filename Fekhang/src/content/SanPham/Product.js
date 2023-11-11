import React, { useEffect, useState } from "react";
import "./Scss/Product.scss"; // Import CSS file
import { useCart } from "./Context/CartContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAuth } from "./Context/AuthContext";
import customAxios from "../../CustomAxios/customAxios";

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Product = ({
  id,
  name,
  stock,
  totalPrice,
  productImage,
  code,
  cage,
  accessories,
}) => {
  const accessoriesList = accessories
    .map((accessory) => accessory.description)
    .join(", ");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [isReturningFromLogin, setIsReturningFromLogin] = useState(false);
  let orderId = localStorage.getItem("orderId");

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      stock,
      totalPrice,
      productImage,
      code,
      cage,
      accessories,
    });
    window.alert(`Added ${name} to the cart!`);
  };

  const handleOnDetail = (id) => {
    navigate(`/detail/${id}`); // điền vô product detail
  };

  useEffect(() => {
    // Kiểm tra xem có quay trở lại từ Login.js hay không
    const storedIsReturningFromLogin = localStorage.getItem(
      "isReturningFromLogin"
    );
    if (storedIsReturningFromLogin === "true") {
      setIsReturningFromLogin(true);
      // Đặt giá trị của cờ thành false để tránh việc rerender không cần thiết
      localStorage.setItem("isReturningFromLogin", "false");
    }
  }, []); // Chỉ chạy một lần sau khi render đầu tiên

  useEffect(() => {
    // Kiểm tra cờ và gọi handleBuy() chỉ khi quay trở lại từ Login.js
    if (isReturningFromLogin) {
      const id = localStorage.getItem("proId");
      localStorage.removeItem("proId");
      localStorage.removeItem("toBuy");
      handleBuy(id);
    }
  }, [isReturningFromLogin]);

  const handleBuy = async (id) => {
    console.log(id)
    if (!user) {
      localStorage.setItem("proId", id);
      localStorage.setItem("toBuy", window.location.pathname);
      navigate("/login");
      return;
    }
      try {
        if (!orderId) {
          const address = user.address;
          const shipAddress = "hcm";
          const shipPrice = shipAddress === "hcm" ? 10.0 : 20.0;

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
        }

        const product = { id, name, stock, totalPrice, productImage, code, cage, accessories };

        await customAxios.post('/order_detail/add', {
          quantity: 1,
          hirePrice: product.hirePrice,
          totalOfProd: product.totalOfProd,
          name: product.name,
          note: `Sản phẩm là ${product.id}`,
          orderId,
          productId: product.id,
          totalCost: product.totalPrice
        });
    
      navigate(`/order/${orderId}`);
    } catch (error) {
      console.error("Lỗi khi tạo order và order detail:", error);
    }
  };

  return (
    <div>

      <div className="col-md-12 container-product">
        <Card sx={{ maxWidth: 345 }} className="product-card">
          <div className="card-body">
          <div className="card-stock">Stock: {stock}</div>
            <div
              className="card-product"
              style={{ paddingTop: 12 }}
              onClick={() => handleOnDetail(id)}
            >
              <CardMedia
                sx={{ height: 140 }}
                image={productImage}
                alt={name}
                className="card-img-top"
              />
            </div>
            <CardContent style={{ paddingBottom: 0 }}>
              <Typography gutterBottom variant="h5" component="div">
                <h5 className="card-title">{name}</h5>
              </Typography>
              <Typography variant="body2" color="">
                <div className="card-info" style={{ paddingBottom: 0 }}>
                  {/* <div className="card-text">Id: {id}</div> */}

                  <div className="card-text">Code: {code}</div>
                  <div className="accessories-list">
                    Accessories: {accessoriesList}
                  </div>

                  <div
                    className="card-price"
                    style={{
                      fontWeight: "700",
                      fontSize: "1.3rem",
                      textAlign: "center",
                    }}
                  >
                    Price: {totalPrice} VND
                  </div>
                </div>
              </Typography>
              <hr />
            </CardContent>

            <CardActions>
              <div
                className=""
                style={{
                  paddingRight: 20,
                  paddingLeft: 25,
                }}
              >
                <Button
                  size="small"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={handleAddToCart}
                  style={{
                    paddingRight: 20,
                    paddingLeft: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                >
                  Add To Cart
                </Button>
                <Button
                  size="small"
                  startIcon={<AttachMoneyIcon />}
                  onClick={() => handleBuy(id)}
                  style={{
                    paddingRight: 20,
                    paddingLeft: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                >
                  Buy now
                </Button>
              </div>
            </CardActions>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Product;
