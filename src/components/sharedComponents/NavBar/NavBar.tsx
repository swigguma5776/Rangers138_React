import * as _React from 'react';
import { useState } from 'react'; //useState is a React Hook
import {
    Button,
    Drawer,
    ListItemButton,
    List,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Stack, //flexbox
    Typography,
    Divider, 
    CssBaseline,
    Box, //basic div
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import AdbIcon from '@mui/icons-material/Adb';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import BathtubIcon from '@mui/icons-material/Bathtub';
import CoffeeIcon from '@mui/icons-material/Coffee';


// internal imports
import { theme } from '../../../Theme/themes'; 


const drawerWidth = 200; // 200 pixels

// dictionary/object of styles that we can reference in our HTML code

const navStyles = {
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeIn, //number
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth})`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut, //number
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2) //defaults to 8px * 2 = 16px
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth, 
    },
    drawerHeader: {
        display: 'flex',
        width: drawerWidth,
        alignItems: 'center',
        padding: theme.spacing(1),
        //use the spread operator to grab all the propers of the theme.mixin.toolbar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    toolbar: {
        display: 'flex'
    },
    toolbarButton: {
        marginLeft: 'auto',
        color: theme.palette.primary.contrastText
    },
    signInStack: {
        position: 'absolute',
        top: '20%',
        right: '50px'
    }
}


// build our NavBar component
export const NavBar = () => {
    // setup all our hooks
    const [ open, setOpen ] = useState(false) //setting initial state to false
    const navigate = useNavigate(); 
    
    
    // 2 function to help setup our hook
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    
    const handleDrawerClose = () => {
        setOpen(false)
    }
    
    // list of nav link dictionaries ( each navlink will have 3 parts (text, icon, linking to))
    
    const navLinks = [
        {
            text: 'Home',
            icon: <BathtubIcon />,
            onClick: () => navigate('/')
        },
        {
            text: 'Shop',
            icon: <CoffeeIcon />,
            onClick: () => navigate('/shop')
        },
        {
            text: 'Cart',
            icon: <BakeryDiningIcon />,
            onClick: () => navigate('/cart')
        }
    ]
    
    return (
        <Box>
            <AppBar sx= { open ? navStyles.appBarShift : navStyles.appBar } position = 'fixed' >
               <Toolbar sx={navStyles.toolbar} >
                <IconButton 
                    color='inherit'
                    aria-label='open drawer'
                    onClick= { handleDrawerOpen }
                    sx = { open ? navStyles.hide : navStyles.menuButton }
                >
                    <AdbIcon />
                </IconButton>
               </Toolbar>
               <Stack 
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    sx = { navStyles.signInStack }
               >
                    <Typography variant='body2' sx={{ color: 'inherit' }}>
                        Cool User
                    </Typography>
                    <Button
                        variant='contained'
                        color='info'
                        size='large'
                        sx= {{ marginLeft: '20px'}}
                    >
                        Sign In
                    </Button>
               </Stack>
            </AppBar>
            <Drawer
                sx= { open ? navStyles.drawer : navStyles.hide }
                variant='persistent'
                anchor='left'
                open = {open} //whatever our variable open is set to (true or false) using our useState hook
            >
                <Box sx= { navStyles.drawerHeader }>
                    <IconButton onClick={handleDrawerClose}>
                        <AdbIcon />
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    { navLinks.map( (item) => {
                        //deconstruct our objects/dictionaries
                        const { text, icon, onClick } = item; 
                        return (
                            <ListItemButton key={text} onClick={onClick}>
                                <ListItemText primary={text} />
                                { icon }
                            </ListItemButton>
                        )
                    })}
                </List>
            </Drawer>
        </Box>
    )
    
}