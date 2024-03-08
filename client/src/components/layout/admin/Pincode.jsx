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
import { clearAPErrors, getAdminPincode,deletePincode,clearDPErrors } from '../../../actions/catagoryAction';
import { DELETE_PINCODE_RESET } from '../../../reducers/deletePreReducer';


const Pincode = ({role}) => {

    const navigate=useNavigate();
    const {pincode,perror,ploading}=useSelector((state)=>state.allPre);
    const {isPDeleted,error,loading}=useSelector((state)=>state.delPre);
    const dispatch=useDispatch();
    useEffect(() => {
    if(perror){
      window.alert(perror);
      dispatch(clearAPErrors());
    }
    if(error){
      window.alert(error);
      dispatch(clearDPErrors());
    }
    if(isPDeleted){
      window.alert("Pincode Removed succesfully");
      dispatch(DELETE_PINCODE_RESET());
    }
    dispatch(getAdminPincode());
    }, [dispatch,error,perror,isPDeleted])
    const deletePincodeHandle=(id)=>{
      dispatch(deletePincode(id));
    }

    const columns = [
        { field: 'id',
         headerName: 'Pincode ID',
          width: 500,
        },
        {
          field: 'pincode',
          headerName: 'Pincode',
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
              <Link to={`/admin/pincode/${params.api.getCellValue(params.id,"id")}`}><EditIcon/></Link>
              <Button onClick={()=>deletePincodeHandle(params.api.getCellValue(params.id,"id"))}><DeleteIcon/></Button>
              </>
            )
          },
        },
      ];

      
const rows = [];
pincode &&
pincode.forEach((item) => {
  rows.push({
    id:item._id,
    pincode:item.pinCode,
  
  })
  
});



  return (
    
    <Layout>
    {(role==="admin")?
   <Box>{ploading ?<Loader/>:
   <Box><Typography align='center'variant="h3">All Pincodes</Typography>
   <Button size="large" variant="contained" endIcon={<AddIcon/>}  onClick={()=>navigate("/admin/pincode/new")}>Add</Button>
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

export default Pincode