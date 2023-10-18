import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import ProductFilters from "./ProductFilters";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    loaiChim: "",
    mauMa: "",
    chatLieu: "",
    kichThuoc: "",
    soNan: "",
    phuKien: "",
  });

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (const product of cart) {
      total += product.price;
    }
    return total;
  };

  const totalCartPrice = calculateTotalPrice();

  const apiUrl =
    "https://652aea854791d884f1fd8029.mockapi.io/api/product/v1/news";

  useEffect(() => {
    const headers = {
      "ngrok-skip-browser-warning": "123",
    };

    axios
      .get(apiUrl, { headers: headers })
      .then((response) => {
        console.log("API Response:", response.data);
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setIsLoading(false);
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const submitOrder = () => {
    // Thực hiện xử lý đơn hàng ở đây, ví dụ lưu thông tin đơn hàng vào cơ sở dữ liệu hoặc hệ thống lưu trữ
    // Sau khi xử lý xong đơn hàng, bạn có thể thực hiện các hành động cần thiết như hiển thị thông báo xác nhận
  
    // Ví dụ thông báo xác nhận đặt hàng
    alert("Đơn hàng của bạn đã được đặt thành công!");
  
    // Cập nhật giao diện người dùng nếu cần
  };
  

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const calculatePriceAndDeliveryDate = () => {
    // Lấy các thông số đã chọn từ state
    const { loaiChim, mauMa, chatLieu, kichThuoc, soNan, phuKien } = selectedOptions;
  
    // Logic tính giá bán dựa trên các thông số
    let calculatedPrice = 0;
  
    // Tính giá dựa trên loại chim
    if (loaiChim === "Loai1") {
      calculatedPrice += 100; // Giá cơ bản cho Loai1
    } else if (loaiChim === "Loai2") {
      calculatedPrice += 150; // Giá cơ bản cho Loai2
    }
    // Thêm logic tính giá dựa trên các thông số khác
    // calculatedPrice += ...
  
    // Logic tính ngày giao hàng dự kiến
    const today = new Date();
    const deliveryDays = 7; // Giao hàng sau 7 ngày
  
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + deliveryDays);
  
    // Cập nhật state với giá bán ước tính và ngày giao hàng dự kiến
    setEstimatedPrice(calculatedPrice);
    setDeliveryDate(deliveryDate.toDateString());
  };
  

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div className="row">
              {currentProducts.map((product) => (
                <div className="col-md-6" key={product.id}>
                  <Product
                    name={product.name}
                    price={product.price}
                    productImage={product.productImage}
                    code={product.code}
                    onAddToCart={() => addToCart(product)}
                  />
                </div>
              ))}
            </div>

            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={Math.ceil(products.length / productsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                boundaryCount={2}
                siblingCount={2}
                showFirstButton
                showLastButton
              />
            </Box>
          </div>
          <div className="col-lg-3">
            {/* <ProductFilters
              products={products}
              setFilteredProducts={setFilteredProducts}
            /> */}
          </div>
        </div>
      </div>

      <Button
        className="open-cart-button"
        startIcon={<ShoppingCartIcon />}
        onClick={toggleCart}
      >
        Open Cart
      </Button>

      {/* Dialog (giỏ hàng) */}
      <Dialog open={isCartOpen} onClose={toggleCart}>
        <DialogTitle className="dialog-title">Shopping Cart</DialogTitle>
        <IconButton
          aria-label="close"
          className="close-button"
          onClick={toggleCart}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="shopping-cart">
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.name}
                  secondary={`Price: ${item.price}`}
                />
              </ListItem>
            ))}
          </List>
          <div className="total-price">Total: ${totalCartPrice.toFixed(2)}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleCart}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Form cho khách hàng chọn thông số */}
      <form>
        <label>Loại chim:</label>
        <select
          value={selectedOptions.loaiChim}
          onChange={(e) =>
            setSelectedOptions({ ...selectedOptions, loaiChim: e.target.value })
          }
        >
          {/* Tùy chọn loại chim */}
        </select>
        {/* Thêm các trường cho các thông số khác */}
        <button onClick={calculatePriceAndDeliveryDate}>
          Tính giá và ngày giao hàng
        </button>
      </form>

      {/* Hiển thị thông tin giá và ngày giao hàng dự kiến */}
      <div>
        <h3>Giá bán ước tính: ${estimatedPrice.toFixed(2)}</h3>
        <h3>Ngày giao hàng dự kiến: {deliveryDate}</h3>
      </div>

      {/* Nút đặt hàng */}
      <button onClick={submitOrder}>Đặt hàng</button>
    </>
  );
};

export default ProductPage;
