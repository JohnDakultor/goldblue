import React, { useEffect, useState } from "react";
import ProductDrawer from "../../components/productComponents/ProductDrawer";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Box,
  Container,
} from "@mui/material";
import axios from "axios";
import Carousel from "../../components/Carousel";
import SavingsIcon from "@mui/icons-material/Savings";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import withUserData from "../../components/UserData";
import img1 from "../../assets/1.jpeg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import videoSrc from "../../assets/GoldBlue.mp4"; // Import the video
import { getTransactions } from "../../services/Axios";
import "../../App.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const images = [img1, img2, img3, img4];

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions(1);
      console.log("Fetched transactions:", data); // Log the fetched data

      // Ensure you only set transactions if data is an array
      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        console.error("Expected an array but received:", data);
        setTransactions([]); // Reset to an empty array if not an array
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
            <Box
              className="card" // Class for transaction history card
              sx={{
                padding: 2,
                height: "400px",
                overflowY: "auto",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Transaction History
              </Typography>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <Box
                    key={transaction.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <SavingsIcon className="icon" />{" "}
                    {/* Default icon for all transactions */}
                    <Typography variant="body2" sx={{ marginLeft: "8px" }}>
                      Deposit: ${transaction.amount}{" "}
                      {/* You can change 'Deposit' to something more relevant */}
                      {/* Optionally add more info here */}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2">
                  No transactions available.
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              className="card" // Class for carousel card
              sx={{
                padding: 0,
                height: "400px",
                display: "flex", // Add this
                justifyContent: "center", // Center the carousel
                alignItems: "center", // Center the carousel vertically
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
