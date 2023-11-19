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
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const itemsPerPage = 5;

const ListMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await customAxios.get("/materials/list");
        setMaterials(response.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleUpdateMaterial = (id) => {
    navigate(`/update-material/${id}`);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this material?");
    if (!confirmDelete) {
      return;
    }
    try {
      await customAxios.delete(`/materials/${id}`);
      const updatedMaterials = materials.filter((material) => material.id !== id);
      setMaterials(updatedMaterials);
      toast.success('Delete sucessful !')
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMaterials = materials.slice(startIndex, endIndex);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#3498db", color: "#fff" }}>
            <TableRow>
              <TableCell style={{ color: "#fff" }}>ID</TableCell>
              <TableCell style={{ color: "#fff" }}>Material Name</TableCell>
              <TableCell style={{ color: "#fff" }}>Price</TableCell>
              <TableCell style={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentMaterials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>{material.id}</TableCell>
                <TableCell>{material.materialName}</TableCell>
                <TableCell>{material.price}</TableCell>
                <TableCell style={{ display: 'flex' }}>
                  <Button
                    style={{width:'30px', marginRight:'5px'}}
                    variant="outlined"
                    color="primary"
                    onClick={() => handleUpdateMaterial(material.id)}
                  >
                    <span class="bi bi-pencil-square"></span>
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(material.id)}
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
        count={Math.ceil(materials.length / itemsPerPage)}
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

export default ListMaterial;
