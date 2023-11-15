import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import customAxios from "../../../CustomAxios/customAxios";
import "../styles/addeditproduct.css";
const API_URL = "http://localhost:8080/cageshop/api/product/get-list";

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditing = !!id;
  
  const [product, setProduct] = useState({
    fullname: "",
    productImage: "",
    stock: "",
    categoryId: "",
    status: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      getProductById(id);
    }
  }, [id, isEditing]);

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleReturnPage = () => {
    navigate(-1);
  };

  const getProductById = async (id) => {
    try {
      const response = await customAxios.get(`/product/select/${id}`);
      if (response.status === 200) {
        setProduct(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async () => {
    try {
      const response = await customAxios.put(`/product/update/${id}`, product);
      if (response.status === 200) {
        navigate("/productmanagement");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addNewProduct = async () => {
    try {
      const response = await customAxios.post('/product/add', product);
      if (response.status === 200 || response.status === 201) {
        navigate("/productmanagement");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isEditing) {
      updateProduct();
    } else {
      addNewProduct();
    }
  };

  return (
    <div>
      <div className="alert-container">
        {error && <Alert severity="info">{error}</Alert>}
      </div>
      <section className="vh-100" style={{ backgroundColor: "#808080" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-6 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-1.5 text-black">
                      <h2>{id ? "Update Product" : "Add New Product"}</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-between align-items-center  mb-1 pb-1">
                          <div className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                            <Button
                              sx={{ fontSize: 18 }}
                              variant="contained"
                              style={{ backgroundColor: "#e0e0e0", color: "#212121" }}
                              startIcon={<ArrowBackIosIcon />}
                              onClick={handleReturnPage}
                            >
                              BACK
                            </Button>
                          </div>
                          <span className="h1 fw-bold mb-0">
                            {id ? "Update Product" : "Add New Product"}
                          </span>
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          Name
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="fullname"
                            value={product.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Full Name"
                          />
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          Product Image
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="productImage"
                            value={product.productImage}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Product Image URL"
                          />
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          Stock
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="stock"
                            value={product.stock}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Stock"
                          />
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          Category ID
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="categoryId"
                            value={product.categoryId}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Category ID"
                          />
                        </div>
                        <label className="form-label" htmlFor="form2Example17">
                          Status
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="status"
                            value={product.status}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Status"
                          />
                        </div>
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">
                            {id ? "Update" : "Submit"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddEditProduct;
