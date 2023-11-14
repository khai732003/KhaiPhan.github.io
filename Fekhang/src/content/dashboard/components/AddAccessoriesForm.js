import React from "react";
import { TextField, MenuItem, FormControl, InputLabel, Container, Grid, Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import customAxios from "../../../CustomAxios/customAxios";
import { useNavigate } from "react-router-dom";

const AddAccessoriesForm = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await customAxios.post("/addaccessories", data);
      navigate("/productmanagement");
      console.log("Accessory added successfully:", response.data);
    } catch (error) {
      console.error("Error adding accessory:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "10rem", marginBottom: "11rem"}}>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", alignItems: "center",  border: "5",borderRadius: "3px solid black" }}>
          <h2 style={{ marginBottom: "2rem" }}>Accessories Form</h2>
          <Grid item xs={12} style={{ width: "100%", marginBottom: "1rem" }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="type-label">Type</InputLabel>
              <TextField
                {...methods.register("type", { required: "Please select the type!" })}
                select
                label="Type"
                labelId="type-label"
                variant="outlined"
                error={!!methods.formState.errors.type}
                helperText={methods.formState.errors.type?.message}
              >
                <MenuItem value="Accessory Type 1">Accessory Type 1</MenuItem>
                <MenuItem value="Accessory Type 2">Accessory Type 2</MenuItem>
                <MenuItem value="Accessory Type 3">Accessory Type 3</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid container spacing={2} style={{ width: "100%" }}>
            <Grid item xs={12}>
              <TextField
                {...methods.register("description", { required: "Please input the description!" })}
                label="Description"
                multiline
                variant="outlined"
                fullWidth
                error={!!methods.formState.errors.description}
                helperText={methods.formState.errors.description?.message}
              />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: "1rem" }}>
              <TextField
                {...methods.register("price", { required: "Please input the price!" })}
                label="Price"
                variant="outlined"
                fullWidth
                type="number"
                error={!!methods.formState.errors.price}
                helperText={methods.formState.errors.price?.message}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ width: "100%", marginTop: "2rem" }}>
            Add Accessory
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};

export default AddAccessoriesForm;
