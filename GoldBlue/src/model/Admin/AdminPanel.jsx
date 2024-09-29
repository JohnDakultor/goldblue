import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import Axios from "axios";

const AdminPanel = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const res = await Axios.get("http://localhost:3001/api/withdrawals");
        setWithdrawals(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch withdrawals.");
        setLoading(false);
      }
    };

    fetchWithdrawals();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await Axios.post(`http://localhost:3001/api/withdrawals/confirm/${id}`);
      setWithdrawals(withdrawals.filter(withdrawal => withdrawal.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to confirm withdrawal.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {withdrawals.map((withdrawal) => (
                <TableRow key={withdrawal.id}>
                  <TableCell>{withdrawal.id}</TableCell>
                  <TableCell>{withdrawal.user}</TableCell>
                  <TableCell>{withdrawal.amount}</TableCell>
                  <TableCell>{withdrawal.status}</TableCell>
                  <TableCell>
                    {withdrawal.status === "pending" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleConfirm(withdrawal.id)}
                      >
                        Confirm
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminPanel;
