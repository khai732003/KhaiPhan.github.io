import React, { useState, useEffect } from "react";
import Product from "./Product";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import customAxios from "../../CustomAxios/customAxios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [currentApiUrl, setCurrentApiUrl] = useState("/product/list-date-desc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedSort, setSelectedSort] = useState("dateDesc");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hasResults, setHasResults] = useState(true);
  const [showNotFoundAlert, setShowNotFoundAlert] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0); // New state to hold the total count of products

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
        setTotalProducts(response.data.length); // Set the total count of products
        setHasResults(response.data.length > 0);
        setIsLoading(false);
        setShowNotFoundAlert(response.data.length === 0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setShowNotFoundAlert(true);
      });
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setCurrentApiUrl(categoryId ? `/product/category/${categoryId}` : "/product/list-date-desc");
  };

  useEffect(() => {
    customAxios
      .get("/category/list")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = currentApiUrl;
    const headers = {
      "ngrok-skip-browser-warning": "123",
    };

    if (searchKeyword) {
      handleSearch();
    } else {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;

      customAxios
        .get(apiUrl, { headers: headers })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setProducts(response.data.slice(startIndex, endIndex));
            setTotalProducts(response.data.length);
            setHasResults(response.data.length > 0);
          } else {
            setProducts([]);
            setTotalProducts(0);
            setHasResults(false);
          }
          setIsLoading(false);
          setShowNotFoundAlert(response.data.length === 0);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
          setShowNotFoundAlert(true);
        });
    }
  }, [currentApiUrl, minPrice, maxPrice, searchKeyword, currentPage]);

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
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="category-label">Select Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
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
                
              </div>
            )}
            {showNotFoundAlert && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                <Typography variant="subtitle1" component="div">
                  NOT FOUND
                </Typography>
              </Alert>
            )}
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={Math.ceil(totalProducts / productsPerPage)}
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
