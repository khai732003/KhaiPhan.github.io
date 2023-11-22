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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  }, [materials]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleUpdateMaterial = (id) => {
    navigate(`/update-material/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this material?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      // Check if the material exists
      const existingMaterial = materials.find((material) => material.id === id);

      if (!existingMaterial) {
        toast.error("Material not found!");
        return;
      }

      await customAxios.delete(`/materials/delete/${id}`);
      const updatedMaterials = materials.filter(
        (material) => material.id !== id
      );
      setMaterials(updatedMaterials);
      toast.success("Delete successful!");
    } catch (error) {
      console.error("Error deleting material:", error);
      toast.error(
        'Cannot delete Material. It is associated with one or more products.'
      );
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMaterials = materials.slice(startIndex, endIndex);

  function formatCurrency(amount) {
    return amount.toLocaleString("en-US");
  }

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
                <TableCell>{formatCurrency(material.price)}</TableCell>
                <TableCell style={{ display: "flex" }}>
                  <Button
                    style={{ width: "30px", marginRight: "5px" }}
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
