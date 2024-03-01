import React, { useEffect, useState } from 'react'
import {AppBar,Box,Divider,Drawer,IconButton,Toolbar,Typography} from "@mui/material"
import { Link } from 'react-router-dom'
import MenuIcon from "@mui/icons-material/Menu"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import "../../styles/HeaderStyle.css"
import { useSelector } from 'react-redux';


const Header = () => {
const {user,isAuthenticate}=useSelector((state)=>state.user);

const [mobileOpen,setMobileOpen]=useState(false);
const handleDrawerToggle=()=>{
    setMobileOpen(!mobileOpen);
}
const drawer=(
    <Box onClick={handleDrawerToggle} sx={{textAlign:'center'}}>
        
                <Typography component={"div"} color={"goldenrod"} variant='h6'  sx={{flexGrow:1,my:2}}>
                    NowGrocery
                </Typography> 
                <Divider/>
                <ul className='mobile-navigation'>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/products"}>Products</Link>
                        </li>
                        <li>
                            <Link to={"/contact"}>Contact</Link>
                        </li>
                        <li>
                            <Link to={"/about"}>About</Link>
                        </li>
                    </ul>
    </Box>
)

  return (
    <>
    <Box>
        <AppBar component={"nav"} sx={{bgcolor:"black" ,minHeight:"70px"}}>
            <Toolbar>
                <IconButton color={'inherit'} aria-label='open drawer' edge="start" sx={{mr:2,display:{sm:"none"},}} onClick={handleDrawerToggle}>
                    <MenuIcon/>
                </IconButton>
                <Typography component={"div"} color={"goldenrod"} variant='h6'  sx={{flexGrow:1}}>
                    NowGrocery
                </Typography>
                <Box sx={{display:{xs:"none",sm:"block"}}}>
                    <ul className='navigation-menu'>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/products"}>Products</Link>
                        </li>
                        <li>
                            <Link to={"/contact"}>Contact</Link>
                        </li>
                        <li>
                            <Link to={"/about"}>About</Link>
                        </li>
                    </ul>
                </Box>
                <Box>
                    <ul className='right-header'>
                        <li>
                            <Link to={"/search"}><SearchIcon/></Link>
                        </li>
                        <li>
                            <Link to={"/login"}><AccountCircleIcon/></Link>
                        </li>
                        <li>
                            <Link to={"/cart"}><ShoppingCartIcon/></Link>
                        </li>
                        
                    </ul>
                </Box>
            </Toolbar>
        </AppBar>
        <Box component="nav">
            <Drawer variant='temporary'
             open={mobileOpen} 
             onClose={handleDrawerToggle}
              sx={{display:{xs:'block',sm:'none'},"& .MuiDrawer-paper":{boxSizing:'border-box',width:'240px',}}}
              
              >
                {drawer}
            </Drawer>

        </Box>
        <Box sx={{p:1}}>
            <Toolbar/>
        </Box>
        </Box>
    </>
  )
}

export default Header