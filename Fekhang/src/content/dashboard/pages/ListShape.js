// ListShape.js
import React, { useState, useEffect } from "react";
import customAxios from "../../../CustomAxios/customAxios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const itemsPerPage = 5;

const ListShape = () => {
  const [shapes, setShapes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShapes = async () => {
      try {
        const response = await customAxios.get("/shapes/list");
        setShapes(response.data);
      } catch (error) {
        console.error("Error fetching shapes:", error);
      }
    };

    fetchShapes();
  }, [shapes]);

  const handleUpdateShape = (id) => {
    navigate(`/update-shape/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this shape?");
    if (!confirmDelete) {
      toast.error("Shape not found!");
      return;
    }
    try {
      await customAxios.delete(`/shapes/delete/${id}`);
      const updatedShapes = shapes.filter((shape) => shape.id !== id);
      setShapes(updatedShapes);
      toast.success('Delete successful!')
    } catch (error) {
      console.error("Error deleting shape:", error);
      toast.error('Cannot delete shape. It is associated with one or more products.');
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentShapes = shapes.slice(startIndex, endIndex);

  function formatCurrency(amount) {
    return amount.toLocaleString('en-US');
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#3498db", color: "#fff" }}>
            <TableRow>
              <TableCell style={{ color: "#fff" }}>ID</TableCell>
              <TableCell style={{ color: "#fff" }}>Shape Name</TableCell>
              <TableCell style={{ color: "#fff" }}>Price</TableCell>
              <TableCell style={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentShapes.map((shape) => (
              <TableRow key={shape.id}>
                <TableCell>{shape.id}</TableCell>
                <TableCell>{shape.shapeName}</TableCell>
                <TableCell>{formatCurrency(shape.price)}</TableCell>
                <TableCell style={{ display: 'flex' }}>
                  <Button
                    style={{ width: '30px', marginRight: '5px' }}
                    variant="outlined"
                    color="primary"
                    onClick={() => handleUpdateShape(shape.id)}
                  >
                    <span class="bi bi-pencil-square"></span>
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(shape.id)}
                  >
                    <i class="bi bi-trash3"></i>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(shapes.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ListShape;
