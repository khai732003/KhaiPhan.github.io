
import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import ProductFilters from "./ProductFilters";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Cart from "./Cart";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

  // const addToCart = (product) => {
  //   setCart([...cart, product]);
  //   window.alert(`Added ${product.name} to the cart!`); // Hiển thị thông báo khi sản phẩm được thêm vào giỏ hàng
  // };

  const addToCart = (productId) => {

    const productToAdd = products.find(p => p.id === productId);
  
    setCart([...cart, productToAdd]);
  
    window.alert(`Added ${productToAdd.name} to the cart!`); 
  
  }
  

  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const apiUrl = "http://localhost:8080/cageshop/api/product/get-list";
    const headers = {
      "ngrok-skip-browser-warning": "123",
    };

    axios
      .get(apiUrl, { headers: headers })
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const handleDeleteItem = (updatedCart) => {
    setCart(updatedCart);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div className="row">
              {currentProducts.map((product) => (
                <div className="col-md-6" key={product.id}>
                  <Product
                    id={product.id}
                    name={product.name}
                    totalPrice={product.totalPrice}
                    productImage={product.productImage}
                    code={product.code}
                    onAddToCart={() => addToCart(product.id)}
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
            <ProductFilters products={products} setFilteredProducts={setProducts} />
          </div>
        </div>
      </div>

      <Button className="open-cart-button" startIcon={<ShoppingCartIcon />} onClick={toggleCart}>
        Open Cart
      </Button>

      <Cart isOpen={isCartOpen} cart={cart} onClose={toggleCart} onDeleteItem={handleDeleteItem}/>
    </>
  );
};

export default ProductPage;
