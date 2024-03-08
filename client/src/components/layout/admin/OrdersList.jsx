import React, { useEffect } from 'react'
import Layout from '../Layout'
import { getAdminOrders,clearOErrors, deleteOrder, clearDOErrors } from '../../../actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { Link} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../Loader';
import { DELETE_ORDER_RESET } from '../../../reducers/manipulateOrderReducer';

const OrderList = ({role}) => {

    const {Orders,error,loading}=useSelector((state)=>state.orderList);
    const {isDeleted,error:dError,loading:dLoading}=useSelector((state)=>state.maniOrder);
    const dispatch=useDispatch();


    useEffect(() => {
        if(error){
          window.alert(error);
          dispatch(clearOErrors());
        }
        if(dError){
          window.alert(dError);
          dispatch(clearDOErrors());
        }
        if(isDeleted){
          window.alert("Order Deleted succesfully");
          dispatch(DELETE_ORDER_RESET());
        }
        dispatch(getAdminOrders());
        }, [dispatch,error,dError,isDeleted])

    const columns = [
        { field: 'id',
         headerName: 'Order ID',
          width: 280 ,
        },
        {
          field: 'date',
          headerName: 'OrderDate',
          width: 200,
        },

        {
          field: 'status',
          headerName: 'Status',
          width: 200,
        },
        {
          field: 'itemsQty',
          headerName: 'ItemsQty',
          width: 160,
          type: 'number'

        },
        
        {
          field: 'amount',
          headerName: 'Amount',
          width: 120,
          type: 'number'
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
                <Link to={`/admin/order/${params.api.getCellValue(params.id,"id")}`}><EditIcon/></Link>
                <Button onClick={()=>deleteOrderHandle(params.api.getCellValue(params.id,"id"))}><DeleteIcon/></Button>
                </>
              )
            },
          },
        ];

        const rows = [];
  Orders&&
  Orders.forEach((item) => {
    rows.push({
    id:item._id,
    date:item.createdAt.slice(0,10),
    status:item.orderStatus,
    amount:item.totalPrice,
    itemsQty:item.orderItems.length,
    })
    
  });
        const deleteOrderHandle=(id)=>{
            dispatch(deleteOrder(id));
        }
         
  return (
    <Layout>
    {(role==="admin")?
   <Box>{loading ?<Loader/>:
   <Box><Typography align='center'variant="h3">All Orders</Typography>
   
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

export default OrderList