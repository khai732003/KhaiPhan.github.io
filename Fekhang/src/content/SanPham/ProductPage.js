import React, { useState, useEffect } from "react";
import Product from "./Product";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

import Cart from "./Cart"
import customAxios from '../../CustomAxios/customAxios';


const ProductPage = () => {
 
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const apiUrl = "/product/list-date-desc";
    const headers = {
      "ngrok-skip-browser-warning": "123",
    };

    customAxios
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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="">
            <div className="row">
              {currentProducts.map((product) => (
                <div className="col-md-4" key={product.id}>
                  <Product
                    id={product.id}
                    name={product.name}
                    stock={product.stock}
                    totalPrice={product.totalPrice}
                    productImage={product.productImage}
                    code={product.code}
                  />
                </div>
              ))}
            </div>

            {/* Hiển thị giỏ hàng ở đây */}
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
