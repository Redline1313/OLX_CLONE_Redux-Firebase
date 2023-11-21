import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/actions/userActions";
import AdminPanel from "./Index";

const AdminUserProfiles = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Container sx={{ margin: 5 }}>
      <AdminPanel />
      <Typography variant="h4" gutterBottom>
        Admin User Profiles
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>UID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Display Name</TableCell>
            {/* Add other table headers */}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>Loading...</TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.uid}>
                <TableCell>{user.uid}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.displayName}</TableCell>
                {/* Add other table cells */}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminUserProfiles;
