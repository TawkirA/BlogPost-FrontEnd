import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Layout.css";
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { MenuItem } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { green } from '@mui/material/colors';
import { NavLink, Outlet } from "react-router-dom";
import {getCurrentUser, deleteCurrentUser} from '../services/Auth.service';
import { ThemeProvider, createTheme } from '@mui/material/styles';


// const pages = [ 'Dashboard', 'AddPost'];
//     {title: 'Dashboard', link: '/'}, 
//     {title: 'AddPost', link: '/add-post'}
// ];
const settings = ['Logout'];

export const Layout = (props) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [user, setUser] = useState({'name': '', 'email': ''});    
    const navigate = useNavigate()

    useEffect(() => {
        const userInfo = getCurrentUser();        
        setUser(userInfo);               
    }, [props.user])

    const appBarTheme = createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#2AAA8A',
          },
        },
    });

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = (event) => { 
        setAnchorElUser(null)
        if (event == "Logout") {
            deleteCurrentUser();
            const UserInfo = {
                "name": "",
                "email": ""
            }
            setUser(UserInfo);
            navigate('/');
        }
    }

    return (
        <>
        <ThemeProvider theme={appBarTheme}>
        <AppBar position="static" >
            <Container maxWidth="xl">
                <ToolBar disableGutters id="back-to-top-anchor">
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <AutoStoriesRoundedIcon color="secondary" fontSize="large" />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <span className='logo-title'>Dev.Lib</span>                                
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
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
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >                            
                            <List aria-label="main mailbox folders">
                                <ListItem to="/" primary="Dashboard" />
                                {user.name != '' && <ListItem to="/add-post" primary="Add Post" />}
                            </List>                            
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>                        
                        <NavLink
                            to="/"
                            className="linkstyle"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "greenyellow"
                                    : "white",
                            })}                            
                        >
                            Dashboard
                        </NavLink>
                        {user.name != '' && <NavLink
                            to="/add-post"
                            className="linkstyle"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "greenyellow"
                                    : "white",
                            })}                           
                        >
                            Add Post
                        </NavLink>}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {user.name == '' && <NavLink
                            to="/login"
                            className="linkstyle-login"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "greenyellow"
                                    : "#9c27b0",
                                backgroundColor: isActive
                                    ? "black"
                                    : "white"                       
                            })}                           
                        >
                            Login
                        </NavLink>}                        
                        {user.name != '' && <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: green[800] }}>                                    
                                    <AccountCircleIcon sx={{ width: 36, height: 36 }} />
                                </Avatar>
                            </IconButton>
                        </Tooltip>}
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </ToolBar>                
            </Container>            
        </AppBar>
        </ThemeProvider>
        <main>
            <Outlet />
        </main>
        </>        
    )
}