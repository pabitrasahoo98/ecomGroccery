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
import { clearACARErrors, getAdminCarousel,deleteCarousel,clearDCARErrors } from '../../../actions/catagoryAction';
import { DELETE_CAROUSEL_RESET } from '../../../reducers/deletePreReducer';
import Swal from 'sweetalert2';

const Carousels = ({role}) => {

  const navigate=useNavigate();
  const {carousel,carerror,carloading}=useSelector((state)=>state.allPre);
  const {isCarDeleted,carerror:DCError,carloading:DCLoading}=useSelector((state)=>state.delPre);
  const dispatch=useDispatch();
  useEffect(() => {
  if(carerror){
    Swal.fire({
      title: "Error",
      text: carerror,
      icon: "warning"
    })
    dispatch(clearACARErrors());
  }
  if(DCError){
    Swal.fire({
      title: "Error",
      text: DCError,
      icon: "warning"
    })
    dispatch(clearDCARErrors());
  }
  if(isCarDeleted){
    Swal.fire({
      title: "Success",
      text: "Carousel Deleted successfully",
      icon: "success"
    })
    dispatch(DELETE_CAROUSEL_RESET());
  }
  dispatch(getAdminCarousel());
  }, [dispatch,DCError,carerror,isCarDeleted,Swal])
  const deleteCarouselHandle=(id)=>{
    dispatch(deleteCarousel(id));
  }

  const columns = [
      { field: 'id',
       headerName: 'Carousel ID',
        width: 300,
      },
      {
        field: 'carousel_name',
        headerName: 'Carousel Name',
        width: 150,
      },
      {
        field: 'carousel_link',
        headerName: 'Carousel Link',
        width: 800,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        type:'number',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        renderCell: (params) =>{
          return(
            <>
            <Link to={`/admin/carousel/${params.api.getCellValue(params.id,"id")}`}><EditIcon/></Link>
            <Button onClick={()=>deleteCarouselHandle(params.api.getCellValue(params.id,"id"))}><DeleteIcon/></Button>
            </>
          )
        },
      },
    ];

    
const rows = [];
carousel &&
carousel.forEach((item) => {
rows.push({
  id:item._id,
  carousel_link:item.carouselLink,
  carousel_name:item.carouselName,

})

});
  return (<Layout>
    {(role==="admin")?
   <Box>{carloading ?<Loader/>:
   <Box><Typography align='center'variant="h3">All Carousel Links </Typography>
   <Button size="large" variant="contained" endIcon={<AddIcon/>}  onClick={()=>navigate("/admin/carousel/new")}>Add</Button>
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

export default Carousels