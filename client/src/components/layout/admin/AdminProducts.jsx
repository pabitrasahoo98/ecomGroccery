import React, { useEffect } from 'react'
import Layout from '../Layout'
import { getAdminProducts,clearProductErrors } from '../../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../Loader';
import AddIcon from '@mui/icons-material/Add';


const AdminProducts = ({role}) => {
  const navigate=useNavigate();
  const {product,error,loading}=useSelector((state)=>state.products);
  const dispatch=useDispatch();
  useEffect(() => {
  if(error){
    window.alert(error);
    dispatch(clearProductErrors());
  }
  dispatch(getAdminProducts());
  }, [dispatch,error])
  
 
  
const columns = [
  { field: 'id',
   headerName: 'Product ID',
    width: 300 ,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 220,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 220,
  },
  
  {
    field: 'stock',
    headerName: 'Stock',
    width: 120,
    type: 'number'
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 180,
  },

  {
    field: 'actions',
    headerName: 'Actions',
    type:'number',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 300,
    renderCell: (params) =>{
      return(
        <>
        <Link to={`/admin/product/${params.api.getCellValue(params.id,"id")}`}><EditIcon/></Link>
        <Button><DeleteIcon/></Button>
        </>
      )
    },
  },
];

const rows = [];
  product &&
  product.forEach((item) => {
    rows.push({id:item._id,
    stock:item.stock,
    price:item.price,
    name:item.name,
    category:item.catagory,
    })
    
  });
  


  return (
    <Layout>
    {(role==="admin")?
   <Box>{loading ?<Loader/>:
   <Box><Typography align='center'variant="h3">All Products</Typography>
   <Button size="large" variant="contained" endIcon={<AddIcon/>}  onClick={()=>navigate("/admin/products/new")}>Add</Button>
   <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}

      />
    </Box>
    </Box>
    }
   </Box>
   :<h3>You are not Authorised</h3>}</Layout>
  )
}

export default AdminProducts