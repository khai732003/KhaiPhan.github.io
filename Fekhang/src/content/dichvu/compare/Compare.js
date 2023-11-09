import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import customAxios from "../../../CustomAxios/customAxios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Compare.scss";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

const URL = "http://localhost:8080/cageshop/api/product/get-list";

function Compare() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
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

  return (
    <Container maxWidth="lg" style={{ paddingTop: "20px", backgroundColor: "darkgray",   boxShadow: "0 2px 8px darkgray" }}> 
    <CssBaseline />
      <Box style={{ paddingTop: "20px" }}>
        <div className="compare-container">
          <h1 className="compare-title">Compare Items</h1>
          <table className="compare-product-table">
            <thead>
              <tr>
                <th className="compare-table-header">Tên sản phẩm</th>
                <th className="compare-table-header">Hình ảnh</th>
                <th className="compare-table-header">Option</th>
              </tr>
            </thead>
            <tbody className="compare-table-body">
              {products
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((product) => (
                  <tr key={product.id}>
                    <td className="compare-product-name">
                      {product.name}
                    </td>
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
                        startIcon={<DeleteIcon />}
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
                      {product.totalPrice}
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

                <tr>
                  <td className="table-compare-property">Cage</td>
                </tr>

                <tr>
                  <td className="table-compare-property">Description</td>
                  {selectedProducts.map((product) => (
                    <td className="compare-product-name">
                      {product.name}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="table-compare-property">Material</td>
                  {selectedProducts.map((product) => (
                    <td className="compare-product-name">
                      {product.cage.material}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="table-compare-property">Size</td>
                  {selectedProducts.map((product) => (
                    <td className="compare-product-name">
                      {product.cage.size}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="table-compare-property">Price</td>
                  {selectedProducts.map((product) => (
                    <td className="compare-product-name">
                      {product.cage.price}
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
