import React, { useEffect } from 'react'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { Link} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../Loader';
import { getAdminUsers,clearAUErrors,deleteUser,clearDUErrors } from '../../../actions/userAction';
import { DELETE_USER_RESET } from '../../../reducers/manipulateUserReducer';
import Swal from 'sweetalert2';

const Users = ({role}) => {


  const {Users,error,loading}=useSelector((state)=>state.userList);
  const {isDeleted,error:dError}=useSelector((state)=>state.maniUser);
  const dispatch=useDispatch();


  useEffect(() => {
      if(error){
        Swal.fire({
          title: "Error",
          text: error,
          icon: "warning"
        })
        dispatch(clearAUErrors());
      }
      if(dError){
        Swal.fire({
          title: "Error",
          text: dError,
          icon: "warning"
        })
        dispatch(clearDUErrors());
      }
      if(isDeleted){
        Swal.fire({
          title: "Success",
          text: "User deleted successful",
          icon: "success"
        })
        dispatch(DELETE_USER_RESET());
      }
      dispatch(getAdminUsers());
      }, [dispatch,error,isDeleted,dError])

  const columns = [
    { field: "id",
     headerName: "User ID",
      minWidth: 180,
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.api.getCellValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
              <Link to={`/admin/user/${params.api.getCellValue(params.id,"id")}`}><EditIcon/></Link>
              <Button onClick={()=>deleteUserHandle(params.api.getCellValue(params.id,"id"))}><DeleteIcon/></Button>
              </>
            )
          },
        },
      ];

      const rows = [];
Users &&
Users.forEach((item) => {
  rows.push({
  id:item._id,
  email:item.email,
  name:item.name,
  role:item.role,
  })
  
});
      const deleteUserHandle=(id)=>{
          dispatch(deleteUser(id));
      }

  return (
    <Layout>
    {(role==="admin")?
   <Box>{loading ?<Loader/>:
   <Box><Typography align='center'variant="h3">All Users</Typography>
   
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

export default Users