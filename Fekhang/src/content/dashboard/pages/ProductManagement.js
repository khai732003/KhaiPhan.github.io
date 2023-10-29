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

const URL =
  "http://localhost:8080/cageshop/api/product/get-list";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Thêm trạng thái cho trang hiện tại
  const itemsPerPage = 5;
  const [detailPopup, setDetailPopup] = useState(null);

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const getListProducts = async () => {
    const res = await customAxios.get(`${URL}`);
    if (res.status === 200) {
      const newProducts = res.data.sort((a, b) => a.id - b.id);
      setProducts(newProducts);
      setFilteredProducts(newProducts);
    }
  };

  useEffect(() => {
    getListProducts();
  }, []);

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

  const handleSearch = () => {
    const filtered = products.filter((product) => {
      return (
        product.fullname &&
        product.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProducts(filtered);
    setCurrentPage(1); // Đặt lại trang hiện tại về trang đầu khi tìm kiếm
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredProducts(products);
    setCurrentPage(1); // Đặt lại trang hiện tại về trang đầu khi đặt lại tìm kiếm
  };

  const getVisibleProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
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
    <div className="user-management-page">
      <div className="search-add-btn">
        <div className="search-name">
          <div className="search-text">
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="search-click">
            <Button
              variant="outlined"
              className="search-button"
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              className="reset-button"
              onClick={handleResetSearch}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="btn-add action-bar">
          <Link to={"/add-edit-category"}>
            <button className="add-staff-btn">Add new Category</button>
          </Link>
        </div>

        <div className="btn-add action-bar">
          <Link to={"/add-edit-product"}>
            <button className="add-staff-btn">Add new product</button>
          </Link>
        </div>
      </div>

      <div className="table-staff-container">
        <table className="user-table">
          <thead>
            <tr>
              <th className="user-management-header">Serial</th>
              <th className="user-management-header">ID</th>
              <th className="user-management-header">Product Image</th>
              <th className="user-management-header">Stock</th>
              <th className="user-management-header">Cage and Accessories</th>
              <th className="user-management-header">Category ID</th>
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
                  {product.stock}
                </td>

                <td className="user-management-td smaller-text">
                  {
                    <button onClick={() => handleViewPopup(product)}>
                      Details
                    </button>
                  }
                </td>
                
                <td className="user-management-td smaller-text">
                  {product.categoryId}
                </td>
                <td className="user-management-td smaller-text">
                  {product.status}
                </td>

                <td className="user-management-td smaller-text">
                  {product.createDate}
                </td>
                <td className="user-management-td">
                  <Link to={`/update/${product.id}`}>
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
                  <span className="close" onClick={handleClosePopup}>
                    <IconButton color="secondary">
                      <CloseIcon />
                    </IconButton>
                  </span>

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
                        <Typography variant="h5">{detailPopup.name}</Typography>
                        <hr />
                        <Typography variant="body1" className="info-item">
                          <span className="info-label">CategoryID</span>:
                          {detailPopup.categoryId}
                        </Typography>
                        <Typography variant="body1" className="info-item">
                          <span className="info-label">Code</span>:
                          {detailPopup.code}
                        </Typography>
                        <Typography variant="body1" className="info-item">
                          <span className="info-label">Stock</span>:
                          {detailPopup.stock}
                        </Typography>
                        <Typography variant="body1" className="info-item">
                          <span className="info-label">Status</span>:
                          {detailPopup.status}
                        </Typography>
                        <hr />
                        <Typography variant="h6" className="info-label">
                          {<p>Cage</p>}
                        </Typography>
                        <hr />
                        <Typography variant="body1" className="info-item">
                          <span className="info-label">Description</span>:
                          {detailPopup.cage.description}
                        </Typography>
                        <Typography variant="body1" className="info-item">
                          <span className="info-label">Material</span>:
                          {detailPopup.cage.material}
                        </Typography>
                        <Typography variant="body1" className="info-item">
                          <span className="info-label">Size</span>:
                          {detailPopup.cage.size}
                        </Typography>
                        <Typography variant="body1" className="info-item">
                          <span className="info-label">Price</span>:
                          {detailPopup.cage.price}
                        </Typography>
                        <hr/>
                        <Typography variant="h6" className="info-label">
                          {<p>Accessories</p>}
                        </Typography>
                        <hr />
                        <Typography variant="body1" className="info-item">
                          <span className="info-label">Description</span>:
                          {detailPopup.accessories.description}
                        </Typography>
                        <Typography variant="body1" className="info-item">
                          <span className="info-label">Type</span>:
                          {detailPopup.accessories.type}
                        </Typography>
                        <Typography variant="body1" className="info-item">
                          <span className="info-label">Price</span>:
                          {detailPopup.accessories.price}
                        </Typography>
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
