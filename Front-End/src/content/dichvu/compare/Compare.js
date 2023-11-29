import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import customAxios from "../../../CustomAxios/customAxios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Compare.scss";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
const URL = "product/list-date-desc";

function Compare() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const [feedback, setFeedback] = useState();
  const { productId } = useParams();
  const [averageRatings, setAverageRatings] = useState({});
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const getRatingForProduct = (productId) => {
    const productRating = feedback.find((item) => item.productId === productId);
    return productRating ? productRating.rating : "N/A";
  };

  const getListProducts = async () => {
    try {
      const response = await customAxios.get(URL);
      if (response.status === 200) {
        const newProducts = response.data.sort((a, b) => a.id - b.id);
        setProducts(newProducts);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  useEffect(() => {
    getListProducts();
  }, []);

  useEffect(() => {
    customAxios
      .get(`/feedback/get-all`)
      .then((response) => {
        console.log(response.data); // Log the response to the console
        setFeedback(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rating data:", error);
      });
  }, []);

  const addProduct = (product) => {
    if (selectedProducts.length < 3 && !selectedProducts.includes(product)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeProduct = (id) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== id)
    );
  };

  function formatCurrency(amount) {
    return amount.toLocaleString("en-US");
  }
  return (
    <Container
      maxWidth="lg"
      style={{
        paddingTop: "20px",
        backgroundColor: "white",
        boxShadow: "0 2px 8px darkgray",
        fontFamily: "Roboto Slab",
      }}
    >
      <CssBaseline />
      <Box style={{ paddingTop: "20px" }}>
        <div className="compare-container">
          <h1 className="compare-title">Compare Product Items</h1>
          <table className="compare-product-table">
            <thead>
              <tr>
                <th className="compare-table-header">Product Name</th>
                <th className="compare-table-header">Image</th>
                <th className="compare-table-header">Option</th>
              </tr>
            </thead>
            <tbody className="compare-table-body">
              {products
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((product) => (
                  <tr key={product.id}>
                    <td className="compare-product-name">{product.name}</td>
                    <td>
                      <img
                        src={product.productImage}
                        alt={product.name}
                        className="compare-product-image"
                      />
                    </td>
                    <td>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => addProduct(product)}
                      >
                        Compare
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <Stack spacing={2} className="pagination">
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChangePage}
              className="pagination-compare"
            />
          </Stack>

          {selectedProducts.length > 0 && (
            <table className="table-compare">
              <thead className="table-compare-header">
                <tr>
                  <th className="table-compare-header"></th>
                  {selectedProducts.map((product) => (
                    <th key={product.id}>
                      <div className="compare-header">
                        <div className="compare-product-name">
                          {product.name}
                        </div>
                        <div className="header-button">
                          <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => removeProduct(product.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="table-compare-body">
                <tr>
                  <td className="table-compare-property">Image</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id}>
                      <img
                        style={{ height: "5rem", width: "5rem" }}
                        src={product.productImage}
                        alt={product.name}
                        className="compare-product-image"
                      />
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="table-compare-property">Total Price</td>
                  {selectedProducts.map((product) => (
                    <td className="compare-product-name">
                      {formatCurrency(product.totalPrice)}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="table-compare-property">Stock</td>
                  {selectedProducts.map((product) => (
                    <td className="compare-product-name">{product.stock}</td>
                  ))}
                </tr>

                <tr>
                  <td className="table-compare-property">Status</td>
                  {selectedProducts.map((product) => (
                    <td className="compare-product-name">{product.status}</td>
                  ))}
                </tr>

                <tr>
                  <td className="table-compare-property">OrderLevel</td>
                  {selectedProducts.map((product) => (
                    <td className="compare-product-name">
                      {product.orderLevel}
                    </td>
                  ))}
                </tr>

                {/* <tr>
                  <td className="table-compare-property">Cage</td>
                </tr> */}

                <tr>
                  <td className="table-compare-property">Description</td>
                  {selectedProducts.map((product) => (
                    <td className="compare-product-name">{product.name}</td>
                  ))}
                </tr>

                <tr>
                  <td className="table-compare-property">Material</td>
                  {selectedProducts.map((product) => (
                    <td className="compare-product-name">
                      {product.cage.material.materialName}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="table-compare-property">Size</td>
                  {selectedProducts.map((product) => (
                    <td className="compare-product-name">
                      {product.cage.size.sizeName}
                    </td>
                  ))}
                </tr>
                {/* <tr>
                  <td className="table-compare-property">Price</td>
                  {selectedProducts.map((product) => (
                    <td className="compare-product-name">
                      {product.cage.price}
                    </td>
                  ))}
                </tr> */}

                <tr>
                  <td className="table-compare-property">Rating</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="compare-product-name">
                      {feedback && (
                        <div className="star-rating">
                          {[1, 2, 3, 4, 5].map((index) => (
                            <span key={index}>
                              {index <=
                              Math.round(getRatingForProduct(product.id)) ? (
                                <StarIcon />
                              ) : (
                                <StarOutlineIcon />
                              )}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </Box>
    </Container>
  );
}

export default Compare;
