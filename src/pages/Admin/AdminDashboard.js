import React, { useEffect } from "react";
import { Typography, Container, Card, CardContent, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/actions/homeActions";
import { fetchUsers } from "../../store/actions/userActions";
import AdminPanel from "./Index";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const products = useSelector((state) => state.home.products) || [];
  const users = useSelector((state) => state.user.users) || [];

  return (
    <Container sx={{ margin: 5 }}>
      <AdminPanel />
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Card sx={{ backgroundColor: "red", maxWidth: 275, color: "white" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Number of Products:
            </Typography>
            <Typography variant="h4">{products.length}</Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: "Green",
            maxWidth: 275,
            color: "white",
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Used Categories:
            </Typography>
            <Typography variant="h4">
              {new Set(products.map((product) => product.category)).size}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: "Blue", maxWidth: 275, color: "white" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Number of Users:
            </Typography>
            <Typography variant="h4">{users.length}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
