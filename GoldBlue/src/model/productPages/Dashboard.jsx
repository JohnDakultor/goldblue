import React, { useEffect, useState } from "react";
import ProductDrawer from "../../components/productComponents/ProductDrawer";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";
import LocalAtmIcon from "@mui/icons-material/LocalAtm"; // Icon for withdrawals
import withUserData from "../../components/UserData";
import Carousel from "../../components/Carousel";
import img1 from "../../assets/1.jpeg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import videoSrc from "../../assets/GoldBlue.mp4"; // Import the video
import { getTransactions, getWithdrawTransactions } from "../../services/Axios";
import "../../App.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [withdrawTransactions, setWithdrawTransactions] = useState([]);
  const images = [img1, img2, img3, img4];

  useEffect(() => {
    const fetchTransactions = async () => {
      const depositData = await getTransactions(1);
      const withdrawalData = await getWithdrawTransactions(1);

      // Separate deposits and withdrawals
      if (Array.isArray(depositData) && Array.isArray(withdrawalData)) {
        setTransactions(depositData.map((txn) => ({ ...txn, type: 'deposit' })));
        setWithdrawTransactions(withdrawalData.map((txn) => ({ ...txn, type: 'withdrawal' })));
      } else {
        console.error("Expected arrays but received:", depositData, withdrawalData);
        setTransactions([]); // Reset to empty if unexpected response
        setWithdrawTransactions([]);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <ProductDrawer />
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: "center" }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box mt={3} mb={3}>
        {/* Video Section */}
        <Box
          sx={{
            position: "relative",
            height: "400px",
            width: "100%",
            overflow: "hidden",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            mb: 3,
          }}
        >
          <video
            controls
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card className="card" sx={{ mb: 2 }}>
              <CardHeader title="Deposit History" />
              <CardContent sx={{ overflowY: "auto", height: "400px" }}>
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <Box
                      key={`${transaction.id}-${transaction.type}-${index}`} // Ensure unique key
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <SavingsIcon color="primary" /> {/* Icon for deposits */}
                      <Typography variant="body2" sx={{ marginLeft: "8px" }}>
                        Deposit: ${transaction.amount} on {new Date(transaction.created_at).toLocaleDateString()} {/* Label for deposits with date */}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2">
                    No deposits available.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="card">
              <CardHeader title="Withdrawal History" />
              <CardContent sx={{ overflowY: "auto", height: "400px" }}>
                {withdrawTransactions.length > 0 ? (
                  withdrawTransactions.map((transaction, index) => (
                    <Box
                      key={`${transaction.id}-${transaction.type}-${index}`} // Ensure unique key
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <LocalAtmIcon color="error" /> {/* Icon for withdrawals */}
                      <Typography variant="body2" sx={{ marginLeft: "8px" }}>
                        Withdrawal: ${transaction.amount} on {new Date(transaction.date).toLocaleDateString()} {/* Label for withdrawals with date */}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2">
                    No withdrawals available.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Box
              className="card" // Class for carousel card
              sx={{
                padding: 0,
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Carousel images={images} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default withUserData(Dashboard);
