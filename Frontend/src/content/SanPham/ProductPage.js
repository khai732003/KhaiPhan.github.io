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
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
// import { makeStyles } from "@mui/styles";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
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
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const apiUrl =
      "https://652aea854791d884f1fd8029.mockapi.io/api/product/v1/news";
    const headers = {
      "ngrok-skip-browser-warning": "123",
    };

    axios
      .get(apiUrl, { headers: headers })
      .then((response) => {
        console.log("API Response:", response.data);
        setProducts(response.data);
        setFilteredProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container" style={{margin:'100px 0'}}>
        <Header/>
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
            <ProductFilters
              products={products}
              setFilteredProducts={setFilteredProducts}
            />
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
      <Footer/>
    </>
  );
};

export default ProductPage;
