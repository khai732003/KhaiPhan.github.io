import React from "react";
import { TextField, MenuItem, FormControl, InputLabel, Container, Grid, Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import customAxios from "../../../CustomAxios/customAxios";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const AddAccessoriesForm = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await customAxios.post("/accessories/addaccessories", data);
      navigate("/productmanagement");
      console.log("Accessory added successfully:", response.data);
    } catch (error) {
      console.error("Error adding accessory:", error);
    }
  };
  const handleReturnPage = () => {
    navigate(-1);
  };

  return (
    <Container component="main" maxWidth="xs" style={{marginTop: 100, marginBottom: 130,border: "3px solid black",paddingLeft: 20,paddingBottom: 20,paddingRight: 20}}>
      <div className="mb-5 pb-lg-2" style={{ color: "#393f81", marginTop: "10px" }}>
              <Button
                sx={{ fontSize: 18 }}
                variant="contained"
                style={{
                  backgroundColor: "#e0e0e0",
                  color: "#212121",
                }}
                startIcon={<ArrowBackIosIcon />}
                onClick={handleReturnPage}
              >
                BACK
              </Button>
            </div>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", alignItems: "center",  border: "5",borderRadius: "3px solid black" }}>
          <h2 style={{ marginBottom: "2rem" }}>Accessories Form</h2>
          <Grid item xs={12} style={{ width: "100%", marginBottom: "1rem" }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="type-label"></InputLabel>
              <TextField
                {...methods.register("type", { required: "Please select the type!" })}
                select
                label="Type"
                labelId="type-label"
                variant="outlined"
                error={!!methods.formState.errors.type}
                helperText={methods.formState.errors.type?.message}
              >
                <MenuItem value="Chum">Chum</MenuItem>
                <MenuItem value="Stick">Stick</MenuItem>
                <MenuItem value="Lining">Lining</MenuItem>
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
