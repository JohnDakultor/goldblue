import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Switch, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, List } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import SavingsIcon from '@mui/icons-material/Savings';
import { LogoutOutlined } from '@mui/icons-material';
import AdbIcon from '@mui/icons-material/Adb';
import authService from '../../services/Axios';
import { useAuth } from "../../services/Authentication";
import { Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import axios from 'axios';

const drawerWidth = 240;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function ProductDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [logOut, setLogOut] = useState(false)
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false)
  const [user, setUser] = useState('');


  
  const auth = useAuth()

  const productPages = [
    {name: "Dashboard", path:"/dashboard"},
    {name: "Deposit", path:"/deposit"},
    {name: "Withdraw", path:"/withdraw"},
    {name: "Notifications", path:"/notification"},
  ]

  useEffect(() => {
    const fetchUser = async () => {
      try { 
        const token = localStorage.getItem("jwt");
        const response = await axios.get("http://localhost:3001/api/user", {
          headers:{"x-access-token":token},
        });

        const { result } = response.data;
        const { firstname, lastname } = result;
        setUser(`${firstname} ${lastname}`);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
    // handleAutoAccumulationStop();
  }, []);

  const handleLogout = async () =>{
    try{
      await auth.logout();
      localStorage.removeItem("jwt");
      localStorage.removeItem("accumulation");
      localStorage.removeItem("lastTotalDeposits");
      window.location.reload();
      setLogOut(true);

      
    }catch(error){
      console.log(error);
    }
  };




  // const handleAutoAccumulationStop = async () => {
  //   fetch('http://localhost:3001/api/autoAccumulation', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ action: 'stop' }) 
  //   });
  // }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="src/assets/goldblue.png"
            style={{ height: 40}}
            alt="logo-goldblue"
            
            />
          <Typography variant="h6" noWrap component="div">
            GoldBlue
          </Typography>
        </Toolbar>
      </AppBar>
     <Drawer
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      overflowX: 'hidden',
      overflowY: 'hidden',
      backgroundColor: darkMode ? '#222222' : 'primary',
      color: darkMode ? 'white' : 'black',
      
    },
  }}
  variant="persistent"
  anchor="left"
  open={open}
>
  <DrawerHeader>
  <IconButton 
    onClick={handleDrawerClose}
    sx={{ color: darkMode ? 'white' : 'black' }}
  >
    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
  </IconButton>
  </DrawerHeader>
  <Typography  sx={{color: darkMode ? 'white' : 'black', marginLeft: 2}}>Welcome, {user}!</Typography>
  <Divider sx={{borderColor: darkMode ? 'white' : 'black'}}/>
  <List>
    {productPages.map((page, index) => (
      <ListItem key={index} disablePadding>
        <ListItemButton disableRipple sx={{":hover":{color:"black", textDecoration:"underline"}}} component={Link} to={page.path}>
          <ListItemIcon sx={{color: darkMode ? 'white' : 'black'}}>
            {index === 0 && <DashboardIcon />} 
            {index === 1 && <SavingsIcon  />}
            {index === 2 && <LocalAtmIcon  />}
            {index === 3 && <NotificationsIcon  />}
          </ListItemIcon>
          <ListItemText primary={page.name} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
  <Divider sx={{borderColor: darkMode ? 'white' : 'black'}}/>
  <List>
          <ListItem>
            <ListItemText primary="Night Mode" />
            <Switch
              checked={darkMode}
              onChange={handleThemeToggle}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: darkMode ? '#1976d2' : 'blue', // Change to blue in dark mode
                },
                
                '& .MuiSwitch-track': {
                  backgroundColor: darkMode ? '#444' : '#ccc',
                },
              }}
            />
          </ListItem>
        </List>
  <Divider sx={{borderColor: darkMode ? 'white' : 'black'}} />
  <List>
    <ListItem onClick={handleLogout}>
      <ListItemButton sx={{border: "1px solid", borderRadius:"20px", color: darkMode ? 'white' : 'black'}}>
        <ListItemIcon sx={{color: darkMode ? 'white' : 'black'}}>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </ListItem>
  </List>
</Drawer>
      {/* <Main open={open}>
        <DrawerHeader />
        
      </Main> */}
    </Box>
  );
}
