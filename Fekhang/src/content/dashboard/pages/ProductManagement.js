import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/productmanagement.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import customAxios from "../../../CustomAxios/customAxios";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const URL = "http://localhost:8080/cageshop/api/product/get-list";

// const AVAILABLE_PRODUCTS_URL =
//   "http://localhost:8080/cageshop/api/product/available";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Thêm trạng thái cho trang hiện tại
  const itemsPerPage = 5;
  const [detailPopup, setDetailPopup] = useState(null);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all"); // Default to "all" or "available" based on your needs

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const getListProducts = async () => {
    const res = await customAxios.get(`${URL}`);
    if (res.status === 200) {
      let newProducts = res.data.sort((a, b) => a.id - b.id);

      // Sort by price based on the selected option
      if (selectedPrice === "lowtohigh") {
        newProducts = newProducts.sort((a, b) => a.price - b.price);
      } else if (selectedPrice === "hightolow") {
        newProducts = newProducts.sort((a, b) => b.price - a.price);
      }

      // Sort by date based on the selected option
      if (selectedPrice === "newest") {
        newProducts = newProducts.sort(
          (a, b) => new Date(b.createDate) - new Date(a.createDate)
        );
      } else if (selectedPrice === "oldest") {
        newProducts = newProducts.sort(
          (a, b) => new Date(a.createDate) - new Date(b.createDate)
        );
      }

      setProducts(newProducts);
      setFilteredProducts(newProducts);
    }
  };

  useEffect(() => {
    getListProducts();
  }, [selectedStatus, searchTerm, currentPage]);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        `Are you sure that you want to delete a product with ID: ${id}`
      )
    ) {
      const res = await customAxios.delete(`/product/delete/${id}`);
      if (res.status === 200) {
        getListProducts();
        toast.success("Deleted Successfully");
      } else {
        toast.error("Deleted Error!");
      }
    }
  };

  const handleStatusChange = (event) => {
    const status = event.target.value.toLowerCase(); // Convert to lowercase
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handlePriceChange = (event) => {
    const price = event.target.value;
    setSelectedPrice(price);
    setCurrentPage(1); // Reset the page when the status changes
  };

  const handleSearch = () => {
    const filtered = products.filter((product) => {
      return (
        product.name &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };
  // const handleResetSearch = () => {
  //   setSearchTerm("");
  //   setFilteredProducts(products);
  //   setCurrentPage(1); // Đặt lại trang hiện tại về trang đầu khi đặt lại tìm kiếm
  // };

  const getVisibleProducts = () => {
    const filteredByStatus =
      selectedStatus === "all"
        ? products
        : products.filter(
            (product) =>
              product.status.toLowerCase() === selectedStatus.toLowerCase()
          );
    const filteredBySearch = filteredByStatus.filter((product) => {
      return (
        product.name &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBySearch.slice(startIndex, endIndex);
  };

  const getPriceProducts = () => {
    const filteredByPrice =
      selectedPrice === "all"
        ? products
        : products.filter(
            (product) =>
              // Adjust the condition based on your actual data structure
              product.price === selectedPrice
          );
    const filteredBySearch = filteredByPrice.filter((product) => {
      return (
        product.name &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBySearch.slice(startIndex, endIndex);
  };
  

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleViewPopup = (product) => {
    setDetailPopup(product);
  };

  const handleClosePopup = () => {
    setDetailPopup(null);
  };

  return (
    <div className="user-management-page" style={{ marginBottom: "160px" }}>
      <div className="search-add-btn">
        <div className="search-name">
          <div className="search-text"></div>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="Out Of Stock">Out Of Stock</MenuItem>
              <MenuItem value="No More Made">No More Made</MenuItem>
              <MenuItem value="CustomProduct">Custom Product</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="price-label">Price</InputLabel>
            <Select
              labelId="price-label"
              id="price-select"
              value={selectedPrice}
              onChange={handlePriceChange}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="lowtohigh">Price: Low to High</MenuItem>
              <MenuItem value="hightolow">Price: High to Low</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
          <div
            className="search-click"
            style={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              style={{ marginRight: "30px" }}
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="btn-add">
              <Link to={"/addaccessories"}>
                <Button
                  variant="outlined"
                  color="success"
                  className="add-staff-btn"
                  style={{ marginRight: "20" }}
                >
                  Add new Accessories
                </Button>
              </Link>
            </div>

            <div className="btn-add" style={{ margin: "0 20px" }}>
              <Link to={"/add-edit-category"}>
                <Button
                  variant="outlined"
                  color="warning"
                  className="add-staff-btn"
                >
                  Add new Category
                </Button>
              </Link>
            </div>

            {/* <div className="btn-add">
              <Link to={"/addproduct"}>
                <Button
                  variant="outlined"
                  color="error"
                  className="add-staff-btn"
                >
                  Add new product
                </Button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>

      <div className="table-staff-container">
        <table className="user-table">
          <thead>
            <tr>
              <th className="user-management-header">Serial</th>
              <th className="user-management-header">ID</th>
              <th className="user-management-header">Product Image</th>
              <th className="user-management-header">Product Name</th>
              <th className="user-management-header">Total Price</th>
              <th className="user-management-header">Cage and Accessories</th>
              <th className="user-management-header">Category Name</th>
              <th className="user-management-header">Status</th>
              <th className="user-management-header">Created At</th>
              <th className="user-management-header">Action</th>
            </tr>
          </thead>

          <tbody>
            {getVisibleProducts().map((product, index) => (
              <tr key={product.id}>
                <td className="user-management-td smaller-text">{index + 1}</td>
                <td className="user-management-td smaller-text">
                  {product.id}
                </td>
                <td className="user-management-td smaller-text">
                  <img
                    src={product.productImage}
                    alt={product.id}
                    className="img-user-management"
                  />
                </td>
                <td className="user-management-td smaller-text">
                  {product.name}
                </td>

                <td className="user-management-td smaller-text">
                  {product.totalPrice}
                </td>

                <td className="user-management-td smaller-text">
                  {
                    <Button
                      variant="outlined"
                      onClick={() => handleViewPopup(product)}
                    >
                      Details
                    </Button>
                  }
                </td>

                <td className="user-management-td smaller-text">
                  {product.category.name}
                </td>
                <td className="user-management-td smaller-text">
                  {product.status}
                </td>

                <td className="user-management-td smaller-text">
                  {product.createDate}
                </td>
                <td className="user-management-td">
                  <Link to={`/update-product/${product.id}`}>
                    <Button startIcon={<CreateIcon />} />
                  </Link>
                  <Button
                    className="delete-btn"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(product.id)}
                  />
                </td>
              </tr>
            ))}

            {detailPopup && (
              <div className="popup-Home-Dashboard-container">
                <div className="popup-content">
                  <div className="close" onClick={handleClosePopup}>
                    <Button variant="contained" color="error">
                      <CloseIcon />
                    </Button>
                  </div>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                      <img
                        src={detailPopup.productImage}
                        alt={detailPopup.id}
                        className="img-fluid"
                      />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <div className="detail-info">
                        <Typography variant="h5" className="product-name">
                          {detailPopup.name}
                        </Typography>
                        <hr />

                        <ul className="product-info">
                          <li>
                            <span className="info-label">Total Price:</span>{" "}
                            {detailPopup.totalPrice}
                          </li>
                          <li>
                            <span className="info-label">Code:</span>{" "}
                            {detailPopup.code}
                          </li>
                          <li>
                            <span className="info-label">Stock:</span>{" "}
                            {detailPopup.stock}
                          </li>
                          <li>
                            <span className="info-label">Status:</span>{" "}
                            {detailPopup.status}
                          </li>
                        </ul>

                        <div className="info-section">
                          <Typography variant="h6" className="info-title">
                            Cage
                          </Typography>
                          <hr />
                          <Typography variant="body1" className="info-item">
                            <span className="info-label">Description:</span>{" "}
                            {detailPopup.cage.description}
                          </Typography>

                          <div className="sub-info">
                            <Typography variant="body1" className="info-item">
                              <span className="info-label">Shape:</span>{" "}
                              <span className="name">Name:</span>
                              {detailPopup.cage.shape.shapeName}
                              <hr />
                              <span className="price">Price:</span>
                              {detailPopup.cage.shape.price}
                            </Typography>
                            <Typography variant="body1" className="info-item">
                              <span className="info-label">Material:</span>{" "}
                              <span className="name">Name:</span>
                              {detailPopup.cage.material.materialName}
                              <hr />
                              <span className="price">Price:</span>
                              {detailPopup.cage.material.price}
                            </Typography>
                            <Typography variant="body1" className="info-item">
                              <span className="info-label">Size:</span> Name:{" "}
                              <br />
                              {detailPopup.cage.size.sizeName}
                              <hr />
                              Min: <br />
                              {detailPopup.cage.size.minspokes}
                              <hr />
                              Max: <br />
                              {detailPopup.cage.size.maxspokes}
                              <hr />
                              Price: <br />
                              {detailPopup.cage.size.price}
                            </Typography>

                            <Typography variant="body1" className="info-item">                
                              <span className="info-label">Spokes:</span>
                              {detailPopup.cage.spokes}
                            </Typography>
                          </div>
                        </div>

                        <div className="info-section accessories-section">
                          <Typography variant="h6" className="info-title">
                            Accessories
                          </Typography>
                          <hr />

                          {detailPopup.accessories.map((accessory, index) => (
                            <Typography
                              key={index}
                              variant="body1"
                              className="info-item"
                            >
                              <span className="info-label">Description:</span>{" "}
                              {accessory.description}
                              <br />
                              <span className="info-label">Price:</span>{" "}
                              {accessory.price}
                              <br />
                              <span className="info-label">Type:</span>{" "}
                              {accessory.type}
                            </Typography>
                          ))}

                          <Typography variant="body1" className="info-item">
                            <span className="info-label">Type:</span>{" "}
                            {detailPopup.accessories.type}
                          </Typography>
                          <Typography variant="body1" className="info-item">
                            <span className="info-label">Price:</span>{" "}
                            {detailPopup.accessories.price}
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
