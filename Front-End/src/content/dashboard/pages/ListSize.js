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

const ListSize = () => {
  const [sizes, setSizes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await customAxios.get("/sizes/list");
        setSizes(response.data);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    fetchSizes();
  }, [sizes]);

  const handleUpdateSize = (id) => {
    navigate(`/update-size/${id}`);
  };

  const handleDeleteSize = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this size?");
    if (!confirmDelete) {
      toast.error("Size not found!");
      return;
    }
    try {
      await customAxios.delete(`/sizes/delete/${id}`);
      const updatedSizes = sizes.filter((size) => size.id !== id);
      setSizes(updatedSizes);
      toast.success('Delete successful!')
    } catch (error) {
      console.error("Error deleting size:", error);
      toast.error(
        'Cannot delete Size. It is associated with one or more products.'
      );
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSizes = sizes.slice(startIndex, endIndex);

  function formatCurrency(amount) {
    return amount.toLocaleString('en-US');
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{backgroundColor: "#3498db", color: "#fff"}}>
            <TableRow>
              <TableCell style={{color: "#fff"}}>ID</TableCell>
              <TableCell style={{color: "#fff"}}>Size Name</TableCell>
              <TableCell style={{color: "#fff"}}>Price</TableCell>
              <TableCell style={{color: "#fff"}}>Min Spokes</TableCell>
              <TableCell style={{color: "#fff"}}>Max Spokes</TableCell>
              <TableCell style={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentSizes.map((size) => (
              <TableRow key={size.id}>
                <TableCell>{size.id}</TableCell>
                <TableCell>{size.sizeName}</TableCell>
                <TableCell>{formatCurrency(size.price)}</TableCell>
                <TableCell>{size.minspokes}</TableCell>
                <TableCell>{size.maxspokes}</TableCell>
                <TableCell style={{ display: 'flex' }}>
                  <Button
                    style={{ width: '30px', marginRight: '5px' }}
                    variant="outlined"
                    color="primary"
                    onClick={() => handleUpdateSize(size.id)}
                  >
                    <span class="bi bi-pencil-square"></span>
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteSize(size.id)}
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
        count={Math.ceil(sizes.length / itemsPerPage)}
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

export default ListSize;
