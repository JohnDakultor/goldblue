import React from "react";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Typography, Link } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t, i18n } = useTranslation();
  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    {code: "ar", name: "Arabic"},
    // Add more languages as needed
  ];

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div>
      <Container
        sx={{
          mt: 5,
          mg: 5,
          minWidth: "100%",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          paddingY: 2,
        }}
      >
        <footer>
          <Container>
            <Typography variant="body2" color="textSecondary" align="center">
              {t('copyright')} {year} GoldBlue. {t('allRightsReserved')}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              <Link color="inherit" href="/about">
                {t('aboutUs')}
              </Link>{" "}
              |
              <Link color="inherit" href="/contact">
                {t('contactUs')}
              </Link>{" "}
              |
              <Link color="inherit" href="/privacy">
                {t('privacyPolicy')}
              </Link>{" "}
              |
              <Link color="inherit" href="/terms">
                {t('termsOfService')}
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              {t('followUs')}:{" "}
              <Link color="inherit" href="https://facebook.com">
                Facebook
              </Link>{" "}
              |
              <Link color="inherit" href="https://twitter.com">
                Twitter
              </Link>{" "}
              |
              <Link color="inherit" href="https://instagram.com">
                Instagram
              </Link>
            </Typography>
          </Container>
        </footer>

        <Container>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="language-select-label">{t('language')}</InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={i18n.language}
              label={t('language')}
              onChange={handleChange}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Container>
      </Container>
    </div>
  );
}
