import React from 'react';
import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { useNavigate } from 'react-router-dom';

const AdminOptions = () => {
    const navigate=useNavigate();
    const actions = [
        { icon: <DashboardIcon />, name: 'Dashboard',func:dashboard },
        { icon: <ListAltIcon/>, name: 'Orders',func:orders },
        { icon: <Inventory2Icon/>, name: 'Products',func:products },
        { icon: <PeopleIcon />, name: 'Users',func:users },
        { icon: <CategoryIcon />, name: 'Category',func:category },
        { icon: <PersonPinCircleIcon />, name: 'Delivery Pincodes',func:pincode },
        { icon: <PostAddIcon/>, name: 'Carousel',func:carousel },
      ]
      function dashboard() {
        navigate("/admin/dashboard");
      }
      function orders() {
        navigate("/admin/orders");
      }
      function products() {
        navigate("/admin/products");
      }
      function users() {
        navigate("/admin/users");
      }
      function category() {
        navigate("/admin/category");
      }
      function pincode() {
        navigate("/admin/pincode");
      }
      function carousel() {
        navigate("/admin/carousel");
      }
  return (
    <Box>
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      direction='down'
      sx={{ position: 'fixed', top: 90, right: 30 ,'& .MuiFab-primary': { backgroundColor: 'gold', color: 'blue' } }}
      style={{ zIndex: "11" }}
      icon={<AdminPanelSettingsIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.func}
        />
      ))}
    </SpeedDial>
  </Box>
  )
}

export default AdminOptions