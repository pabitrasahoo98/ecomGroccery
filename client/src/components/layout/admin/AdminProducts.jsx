import React, { useEffect } from 'react'
import Layout from '../Layout'
import { getAdminProducts,clearProductErrors, deleteProduct, clearDPrrors } from '../../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../Loader';
import AddIcon from '@mui/icons-material/Add';
import { DELETE_PRODUCT_RESET } from '../../../reducers/manipulateProductReducer';
import Swal from 'sweetalert2';


const AdminProducts = ({role}) => {
  const navigate=useNavigate();
  const {product,error,loading}=useSelector((state)=>state.products);
  const {isDeleted,error:dError}=useSelector((state)=>state.maniProduct);
  const dispatch=useDispatch();
useEffect(() => {
  if(error){
    Swal.fire({
      title: "Error",
      text: error,
      icon: "warning"
    })
    dispatch(clearProductErrors());
  }
  if(dError){
    Swal.fire({
      title: "Error",
      text: dError,
      icon: "warning"
    })
    dispatch(clearDPrrors());
  }
  if(isDeleted){
     Swal.fire({
    title: "Success",
    text: "Product Deleted Successfully",
    icon: "success"
  })
    dispatch(DELETE_PRODUCT_RESET());
  }
  dispatch(getAdminProducts());
  }, [dispatch,error,dError,isDeleted])
  const deleteProductHandle=(id)=>{
    dispatch(deleteProduct(id));
  }
  
 
  
const columns = [
  { field: 'id',
   headerName: 'Product ID',
    width: 280 ,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 400,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 160,
  },
  
  {
    field: 'stock',
    headerName: 'Stock',
    width: 120,
    type: 'number'
  },
  {
    field: 'mrp',
    headerName: 'Mrp',
    type: 'number',
    width: 120,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 120,
  },

  {
    field: 'actions',
    headerName: 'Actions',
    type:'number',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 220,
    renderCell: (params) =>{
      return(
        <>
        <Link to={`/admin/product/${params.api.getCellValue(params.id,"id")}`}><EditIcon/></Link>
        <Button onClick={()=>deleteProductHandle(params.api.getCellValue(params.id,"id"))}><DeleteIcon/></Button>
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
    mrp:item.mrp,
    price:item.price,
    name:item.name,
    category:item.catagory,
    })
    
  });
  


  return (
    <div>
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
              pageSize: 30,
            },
          },
        }}
        pageSizeOptions={[10,20,30]}

      />
    </Box>
    </Box>
    }
   </Box>
   :<h3>You are not Authorised</h3>}</Layout>
   </div>
  )
}

export default AdminProducts