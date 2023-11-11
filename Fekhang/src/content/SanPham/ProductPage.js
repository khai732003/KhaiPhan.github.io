import React, { useState, useEffect } from "react";
import Product from "./Product";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
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
  const [selectedSort, setSelectedSort] = useState("dateDesc");
  const [hasResults, setHasResults] = useState(true);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSelectedSort(selectedSort);

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

  const handleSearch = () => {
    const apiUrl = `/product/search/${searchKeyword}`;
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
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const apiUrl = currentApiUrl;
    const headers = {
      "ngrok-skip-browser-warning": "123",
    };

    if (searchKeyword) {
      handleSearch();
    } else {
      customAxios
        .get(apiUrl, { headers: headers })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setProducts(response.data);
            setHasResults(response.data.length > 0);
          } else {
            setProducts([]);
            setHasResults(false);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        });
    }
  }, [currentApiUrl, minPrice, maxPrice, searchKeyword]);

  return (
    <>
      <Box mt={3} display="flex" justifyContent="center" paddingTop="6rem">
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={selectedSort}
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
      </Box>
      <div className="container product-page">
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            {hasResults ? (
              <div className="row">
                {products.map((product) => (
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
            ) : (
              <div className="not-found-message">
                <p>No results found.</p>
              </div>
            )}
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
          </>
        )}
      </div>
    </>
  );
};

export default ProductPage;
