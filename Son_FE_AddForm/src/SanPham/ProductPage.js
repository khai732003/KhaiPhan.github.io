import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useCart } from "./Context/CartContext";
import Cart from "./Cart";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const { cart, addToCart } = useCart();

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const apiUrl = "http://localhost:8080/cageshop/api/products/list-date-desc";
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
        console.error("Error fetching data:", error);
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
               <Product
               id={product.id}
               name={product.name}
               stock={product.stock}
               totalPrice={product.totalPrice}
               productImage={product.productImage}
               code={product.code}
               material={product.cage.material}
               size={product.cage.size}
             />
           
              ))}
            </div>

            <Cart />

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
        </div>
      </div>
    </>
  );
};

export default ProductPage;
