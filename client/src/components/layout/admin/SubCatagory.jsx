import React, { useEffect} from 'react'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../Loader';
import AddIcon from '@mui/icons-material/Add';
import { clearSCErrors, getAdminSubCatagory,deleteSubCatagory,clearDSCErrors } from '../../../actions/catagoryAction';
import {DELETE_SUBCATAGORY_RESET } from '../../../reducers/deletePreReducer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const SubCatagory = ({role}) => {
  const navigate=useNavigate();
  const {subCatagory,scerror,scloading}=useSelector((state)=>state.allPre);
  const {isSCDeleted,scerror:DSCError}=useSelector((state)=>state.delPre);
  const dispatch=useDispatch();

  useEffect(() => {
  if(scerror){
    Swal.fire({
      title: "Error",
      text: scerror,
      icon: "warning"
    })
    dispatch(clearSCErrors());
  }
  if(DSCError){
    Swal.fire({
      title: "Error",
      text: DSCError,
      icon: "warning"
    })
    dispatch(clearDSCErrors());
  }
  if(isSCDeleted){
    Swal.fire({
      title: "Success",
      text: " Sub Category Deleted Successfully",
      icon: "success"
    })
    dispatch(DELETE_SUBCATAGORY_RESET());
  }
  dispatch(getAdminSubCatagory());
  }, [dispatch,DSCError,scerror,isSCDeleted])
  const deleteCatagoryHandle=(id)=>{
    dispatch(deleteSubCatagory(id));
  }

  const columns = [
      { field: 'id',
       headerName: 'Sub-Catagory ID',
        width: 500,
      },
      {
        field: 'subCatagory',
        headerName: 'subCatagory',
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
            <Button onClick={()=>deleteCatagoryHandle(params.api.getCellValue(params.id,"id"))}><DeleteIcon/></Button>
            </>
          )
        },
      },
    ];

    
const rows = [];
subCatagory &&
subCatagory.forEach((item) => {
rows.push({
  id:item._id,
  subCatagory:item.subCatagory,

})

});
  return (
    <div>
    <Layout>
    {(role==="admin")?
   <Box>{scloading ?<Loader/>:
   <Box><Typography align='center'variant="h3">All Sub-Category </Typography>
   <Button size="large" variant="contained" endIcon={<AddIcon/>}  onClick={()=>navigate("/admin/subcatagory/new")}>Add</Button>
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

export default SubCatagory