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
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleUpdateMaterial(material.id)}
                  >
                    Update
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
    </div>
  );
};

export default ListMaterial;
