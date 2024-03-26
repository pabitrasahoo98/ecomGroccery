import React, { useEffect} from 'react'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../Loader';
import AddIcon from '@mui/icons-material/Add';
import { clearBErrors, getAdminBrand,deleteBrand,clearDBErrors } from '../../../actions/catagoryAction';
import { DELETE_BRAND_RESET } from '../../../reducers/deletePreReducer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const Brands = ({role}) => {
  const navigate=useNavigate();
  const {brand,berror,bloading}=useSelector((state)=>state.allPre);
  const {isBDeleted,berror:DBError}=useSelector((state)=>state.delPre);
  const dispatch=useDispatch();

  useEffect(() => {
  if(berror){
    Swal.fire({
      title: "Error",
      text: berror,
      icon: "warning"
    })
    dispatch(clearBErrors());
  }
  if(DBError){
    Swal.fire({
      title: "Error",
      text: DBError,
      icon: "warning"
    })
    dispatch(clearDBErrors());
  }
  if(isBDeleted){
    Swal.fire({
      title: "Success",
      text: "Brand Deleted Successfully",
      icon: "success"
    })
    dispatch(DELETE_BRAND_RESET());
  }
  dispatch(getAdminBrand());
  }, [dispatch,DBError,berror,isBDeleted])
  const deleteBrandHandle=(id)=>{
    dispatch(deleteBrand(id));
  }

  const columns = [
      { field: 'id',
       headerName: 'Brand ID',
        width: 500,
      },
      {
        field: 'brand',
        headerName: 'Brand name',
        width: 400,
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
            <Button onClick={()=>deleteBrandHandle(params.api.getCellValue(params.id,"id"))}><DeleteIcon/></Button>
            </>
          )
        },
      },
    ];

    
const rows = [];
brand &&
brand.forEach((item) => {
rows.push({
  id:item._id,
  brand:item.brand,

})

});
  return (
    <div>
    <Layout>
    {(role==="admin")?
   <Box>{bloading ?<Loader/>:
   <Box><Typography align='center'variant="h3">All Brands </Typography>
   <Button size="large" variant="contained" endIcon={<AddIcon/>}  onClick={()=>navigate("/admin/brand/new")}>Add</Button>
   <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}

      />
    </Box>
    </Box>
    }
   </Box>
   :<h3>You are not Authorised</h3>}</Layout>
   </div>
  )
}

export default Brands