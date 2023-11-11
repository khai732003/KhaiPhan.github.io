import React, { useState, useEffect } from "react";
import Product from "./Product";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import customAxios from '../../CustomAxios/customAxios';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [currentApiUrl, setCurrentApiUrl] = useState("/product/list-date-desc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    switch (selectedSort) {
      case "priceAsc":
        setCurrentApiUrl("/product/list-price-asc");
        break;
      case "priceDesc":
        setCurrentApiUrl("/product/list-price-desc");
        break;
      case "dateAsc":
        setCurrentApiUrl("/product/list-date-asc");
        break;
      default:
        setCurrentApiUrl("/product/list-date-desc");
    }
  };

  useEffect(() => {
    const apiUrl = currentApiUrl;
    const headers = {
      "ngrok-skip-browser-warning": "123",
    };

    // Add logic here to handle other filters if needed

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
  }, [currentApiUrl, minPrice, maxPrice, searchKeyword]);

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
    {/* Sử dụng các filter của MUI */}
    <Box mt={3} display="flex" justifyContent="center">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value=""
            onChange={handleSortChange}
          >
            <MenuItem value="dateDesc">Newest</MenuItem>
            <MenuItem value="priceAsc">Price: Low to High</MenuItem>
            <MenuItem value="priceDesc">Price: High to Low</MenuItem>
            <MenuItem value="dateAsc">Oldest</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search"
          variant="outlined"
          margin="dense"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        {/* Remove Min/Max Price filter */}
        <Button variant="contained" onClick={() => setCurrentApiUrl("/product/list-price-asc")}>Filter</Button>
      </Box>
      <div className="container product-page">
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
                    cage={product.cage}
                    accessories={product.accessories}
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
        </div>
      </div>
      
    </>
  );
};

export default ProductPage;
