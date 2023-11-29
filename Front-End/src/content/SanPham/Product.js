import React, { useEffect, useState } from "react";
import { useCart } from "./Context/CartContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAuth } from "./Context/AuthContext";
import customAxios from "../../CustomAxios/customAxios";

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import '../SanPham/Scss/Product.scss';
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
          "name": `Order of${user.userId}`,
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



  function formatCurrency(amount) {
    return amount.toLocaleString('en-US');
  }
  return (


      <div  style={{ marginTop: '40px',width:'100%'}}>
        <Card sx={{ maxWidth: 450 }} className="product-card">
          <div className="card-body">
            <abbr title="Click To Detail" style={{ whiteSpace: 'nowrap', overflow: 'hidden',fontFamily:'Roboto Slab' }}
            >
              <div
                className="card-product"
                onClick={() => handleOnDetail(id)}
              >
                <CardMedia
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  sx={{ height: 160 }}
                  image={productImage}
                  alt={name}
                  className="card-img-top"
                />
              </div>
              <CardContent style={{ paddingBottom: 0, textDecoration: 'none' }} onClick={() => handleOnDetail(id)}
              >
                <Typography gutterBottom variant="h5" component="div">
                  <p id="card-title-name" style={{ fontWeight: 'bold', fontFamily: 'inherit', padding: '30px 0 30px 0', fontSize: '20px', textAlign: 'center' }}><span >{name}</span></p>
                </Typography>
                <Typography variant="body2" color="">
                  <div className="card-info" style={{ fontSize: '15px', paddingLeft: '20px' }}>
                    <p ><strong>Quantity:</strong> {stock}</p>
                    <p className="card-text"><strong>Product code:</strong> {code}</p>
                    <p className="card-price"><strong>Price: </strong><span>{formatCurrency(totalPrice)} VND </span></p>
                    <div>
                      {accessories.map((accessory, index) => (
                        <div key={index} className="accessory-item">
                          <div className="sub-access">
                            <strong>Accessory:</strong>{accessory.description}

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </Typography>

              </CardContent>
            </abbr>
            <CardActions>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '10px  0 30px 0 '
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={handleAddToCart}
                  style={{ margin: '0 0 0 10px', padding: '12px 25px' }}
                  id="addtocart"
                >
                  Add To Cart
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<AttachMoneyIcon />}
                  onClick={() => handleBuy(id)}
                  style={{ margin: '0 0 0 10px', padding:'12px 25px'}}
                >
                  Buy now
                </Button>
              </div>
            </CardActions>
          </div>
        </Card>
      </div>

  );
};

export default Product;