import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import image1 from "../assets/mobile-fast-payment.png";
import image2 from "../assets/friendly-ui.jpg";
import image3 from "../assets/security.jpg";
import image4 from "../assets/track-payment.jpg";
import goldblueLogo from "../assets/goldblue.jpg";

const rows = [
  {
    explanation: "row1Explanation", // Unique explanation for row 1
    imageUrl: image1,
  },
  {
    explanation: "row2Explanation", // Unique explanation for row 2
    imageUrl: image2,
  },
  {
    explanation: "row3Explanation", // Unique explanation for row 3
    imageUrl: image3,
  },
  {
    explanation: "row4Explanation", // Unique explanation for row 4
    imageUrl: image4,
  },
];

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="Landing">
      <Header />
      <Container
        sx={{
          display: { xs: "column", sm: "flex" }, // Stack on small screens
          alignItems: "center",
          marginTop: 25,
        }}
      >
        <Container sx={{ flex: 1, paddingRight: 4, textAlign: { xs: "center", sm: "left" } }}>
          <Typography variant="h3">{t("welcome")}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {t("welcomeMessage")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, borderRadius: "10px" }}
            component={Link}
            to="/signup"
          >
            {t("signUp")}
          </Button>
        </Container>
        <Container
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: { xs: 0, sm: "10%" }, // Adjust margin for small screens
            marginTop: { xs: 2, sm: 0 }, // Add margin-top for small screens
          }}
        >
          <img
            src={goldblueLogo}
            alt={t("GoldBlue")}
            style={{ maxWidth: "100%", height: "auto", borderRadius: "20px" }}
          />
        </Container>
      </Container>

      <Container
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          minWidth: "100%",
        }}
      >
        <Container sx={{ flex: 1 }}>
          <Typography variant="h3">{t("aboutTitle")}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {t("aboutMessage")}
          </Typography>
        </Container>
        <Container sx={{ flex: 1, justifyContent: "flex-end" }}>
          <Typography variant="h3">{t("companionTitle")}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {t("companionMessage")}
          </Typography>
        </Container>
      </Container>

      <Container sx={{ mt: 20 }}>
        {rows.map((row, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              marginBottom: 20,
            }}
          >
            <Container
              sx={{
                flex: 1,
                justifyContent: index % 2 === 0 ? "flex-end" : "flex-start",
                marginLeft: index % 2 === 0 ? 2 : 0,
              }}
            >
              <p>{t(row.explanation)}</p>
            </Container>
            <Container
              sx={{
                flex: 1,
                justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
                marginRight: index % 2 === 0 ? 2 : 0,
                display: "flex",
                alignItems: "center",
                textAlign: index % 2 === 0 ? "left" : "right",
              }}
            >
              <img
                src={row.imageUrl}
                alt="image"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Container>
          </div>
        ))}
      </Container>

      <Footer />
    </div>
  );
}
