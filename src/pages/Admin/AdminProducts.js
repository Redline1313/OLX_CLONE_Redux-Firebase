import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Button,
  Modal,
  Box,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  deleteAllProducts,
} from "../../store/actions/homeActions";
import AdminPanel from "./Index";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "@firebase/auth";

const AdminProducts = () => {
  const { products, isLoading } = useSelector((state) => state.home);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleteAllModalOpen, setDeleteAllModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  const userUid = authUser?.uid;

  const filteredProducts = userUid
    ? products?.filter((product) => product.uid === userUid)
    : products;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!products) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const handleEdit = (product) => {
    navigate(`/update-item/${product.itemId}`);
  };

  const handleDelete = () => {
    if (selectedProduct) {
      dispatch(deleteProduct(selectedProduct.itemId));
      setDeleteModalOpen(false);
    }
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllProducts());
    setDeleteAllModalOpen(false);
  };

  const handleOpenDeleteModal = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleOpenDeleteAllModal = () => {
    setDeleteAllModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleCloseDeleteAllModal = () => {
    setDeleteAllModalOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Container sx={{ margin: 5 }}>
      <AdminPanel />

      <Typography variant="h4" gutterBottom>
        Admin Products
      </Typography>

      <Button
        variant="contained"
        color="error"
        onClick={handleOpenDeleteAllModal}
      >
        Delete All Products
        <RemoveCircleIcon />
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableHead>Title</TableHead>
            </TableCell>
            <TableCell>
              <TableHead>Username</TableHead>
            </TableCell>
            <TableCell>
              <TableHead> Mobile Number</TableHead>
            </TableCell>
            <TableCell>
              <TableHead>UID</TableHead>
            </TableCell>
            <TableCell>
              <TableHead>Category</TableHead>
            </TableCell>
            <TableCell>
              <TableHead>Price</TableHead>
            </TableCell>
            <TableCell>
              <TableHead>Actions</TableHead>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            filteredProducts?.map((product) => (
              <TableRow key={product.itemId}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.username}</TableCell>
                <TableCell>{product.mobileNumber}</TableCell>
                <TableCell>{product.uid}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Button
                    sx={{ color: "blue" }}
                    component={Link}
                    to={`/item/${product.itemId}`}
                  >
                    <VisibilityIcon />
                  </Button>
                  <Button
                    sx={{ color: "red" }}
                    onClick={() => handleOpenDeleteModal(product)}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    sx={{ color: "green" }}
                    onClick={() => handleEdit(product)}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={products ? products.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Modal open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            padding: 5,
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6">
            Are you sure you want to delete this product?
          </Typography>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
        </Box>
      </Modal>

      <Modal open={isDeleteAllModalOpen} onClose={handleCloseDeleteAllModal}>
        <Box
          sx={{
            padding: 5,
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6">
            Are you sure you want to delete all products?
          </Typography>
          <Button variant="contained" color="error" onClick={handleDeleteAll}>
            Delete All
          </Button>
          <Button variant="contained" onClick={handleCloseDeleteAllModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default AdminProducts;
