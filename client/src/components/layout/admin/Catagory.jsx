import React, { useEffect } from 'react'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../Loader';
import AddIcon from '@mui/icons-material/Add';
import { clearACErrors, getAdminCatagory,deleteCatagory,clearDCErrors } from '../../../actions/catagoryAction';
import { DELETE_CATAGORY_RESET } from '../../../reducers/deletePreReducer';

const Catagory = ({role}) => {

  
  const navigate=useNavigate();
  const {Catagory,cerror,cloading}=useSelector((state)=>state.allPre);
  const {isCDeleted,error,loading}=useSelector((state)=>state.delPre);
  const dispatch=useDispatch();
  useEffect(() => {
  if(cerror){
    window.alert(cerror);
    dispatch(clearACErrors());
  }
  if(error){
    window.alert(error);
    dispatch(clearDCErrors());
  }
  if(isCDeleted){
    window.alert("Category Removed succesfully");
    dispatch(DELETE_CATAGORY_RESET());
  }
  dispatch(getAdminCatagory());
  }, [dispatch,error,cerror,isCDeleted])
  const deleteCatagoryHandle=(id)=>{
    dispatch(deleteCatagory(id));
  }

  const columns = [
      { field: 'id',
       headerName: 'Catagory ID',
        width: 500,
      },
      {
        field: 'catagory',
        headerName: 'Catagory',
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
            <Link to={`/admin/catagory/${params.api.getCellValue(params.id,"id")}`}><EditIcon/></Link>
            <Button onClick={()=>deleteCatagoryHandle(params.api.getCellValue(params.id,"id"))}><DeleteIcon/></Button>
            </>
          )
        },
      },
    ];

    
const rows = [];
Catagory &&
Catagory.forEach((item) => {
rows.push({
  id:item._id,
  catagory:item.catagory,

})

});
  return (

    <Layout>
    {(role==="admin")?
   <Box>{cloading ?<Loader/>:
   <Box><Typography align='center'variant="h3">All Catagory </Typography>
   <Button size="large" variant="contained" endIcon={<AddIcon/>}  onClick={()=>navigate("/admin/catagory/new")}>Add</Button>
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

export default Catagory