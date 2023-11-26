import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Create as CreateIcon } from "@mui/icons-material";
import CustomAxios from "../../../CustomAxios/customAxios";
import MaterialList from "./ListMaterial";
import SizeList from "./ListSize";
import ShapeList from "./ListShape";

const CustomProductManagement = () => {
  return (
    <div style={{ marginTop: "8rem", marginBottom: "30rem" }}>
      <div style={{display: "flex", marginBottom: "2rem", marginLeft: "3rem"}}>
      <div className="btn-add">
        <Link to={"/add-material"} style={{ marginRight: "20px" }}>
          <Button
            variant="outlined"
            color="success"
            className="add-staff-btn"
            startIcon={<AddIcon />}
          >
            Add new Material
          </Button>
        </Link>
      </div>

      <div className="btn-add" style={{ margin: "0 20px" }}>
        <Link to={"/add-shape"}>
          <Button
            variant="outlined"
            color="warning"
            className="add-staff-btn"
            startIcon={<AddIcon />}
          >
            Add new Shape
          </Button>
        </Link>
      </div>

      <div className="btn-add">
        <Link to={"/add-size"}>
          <Button
            variant="outlined"
            color="error"
            className="add-staff-btn"
            startIcon={<AddIcon />}
          >
            Add new Size
          </Button>
        </Link>
      </div>
      
      </div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Material List
            </Typography>
            <MaterialList />
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper elevation={3} style={{ padding: "20px" , textAlign: "center"}}>
            <Typography variant="h4" gutterBottom>
              Shape List
            </Typography>
            <ShapeList />
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper elevation={3} style={{ padding: "20px" , textAlign: "center"}}>
            <Typography variant="h4" gutterBottom>
              Size List
            </Typography>
            <SizeList />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomProductManagement;
