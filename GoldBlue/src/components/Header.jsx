import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import goldblueLogo from "../assets/goldblue.png";

const pages = [
  { label: "aboutUs", path: "/about" },
  { label: "contactUs", path: "/contact" },
];

const log = ["login", "signUp"];

export default function Header({ children }) {
  const { t } = useTranslation(); // Hook to get translation function
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div>
      <header>
        <AppBar position="static">
          <Toolbar disableGutters>
            {/* Mobile menu icon */}
            <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.path}
                  >
                    <Typography textAlign="center">{t(page.label)}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop logo */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img
                src={goldblueLogo}
                alt="logo-goldblue"
                style={{ height: "40px", marginRight: 8 }}
              />
              GoldBlue
            </Typography>

            {/* Mobile logo */}
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img
                src={goldblueLogo}
                alt="logo-goldblue"
                style={{ height: "30px", marginRight: 8 }}
              />
              GoldBlue
            </Typography>

            {/* Desktop menu items */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    ":hover": { color: "yellow", textDecoration: "underline" },
                  }}
                  component={Link}
                  to={page.path}
                  disableRipple
                >
                  {t(page.label)}
                </Button>
              ))}
            </Box>

            {/* Login/Signup buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
              {log.map((logs) => (
                <Button
                  key={logs}
                  sx={{
                    my: 2,
                    mx: 1,
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "20px",
                    marginRight: { xs: "5px", md: "10px" },
                    padding: { xs: "5px 10px", md: "8px 16px" },
                    ":hover": { color: "yellow", border: "1px yellow" },
                  }}
                  component={Link}
                  to={logs === "login" ? "/login" : "/signup"}
                  disableRipple
                >
                  {t(logs)}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </header>
      <div>{children}</div>
    </div>
  );
}
