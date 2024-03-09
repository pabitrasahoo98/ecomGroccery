import React, { useEffect } from 'react'
import Layout from '../Layout'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { getAdminProducts} from '../../../actions/productAction';
import "./Dashboard.css";
import {Doughnut,Line} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminOrders } from '../../../actions/orderAction';
import { getAdminUsers } from '../../../actions/userAction';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,ArcElement);

const Dashboard = ({role}) => {
  const {product,loading}=useSelector((state)=>state.products);
  const {Orders,error:Oerror,loading:Oloading}=useSelector((state)=>state.orderList);
  const {Users,error:uerror,loading:uloading}=useSelector((state)=>state.userList);
  
  const dispatch=useDispatch();

  useEffect(() => {
  dispatch(getAdminProducts());
  dispatch(getAdminOrders());
  dispatch(getAdminUsers())
  }, [dispatch])

  let totalAmount=0;
  Orders && Orders.forEach(item=>totalAmount+=item.totalPrice)
  let outoffstock=0
 product && product.forEach(element => {
  if(element.stock===0){outoffstock+=1}
 });
  const lineState={
    labels:["Initial Amount","Amount Earned"],
    datasets:[{
      label:"TOTAL AMOUNT",
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      hoverBackgroundColor:"rgb(197,72,40)",
      data:[0,totalAmount],
    },],

  };
  const DoughnutState={
    labels:["Out Of Stock","In stock"],
    datasets:[{
       backgroundColor: [
      'red',
      'green'
    ],
    borderWidth: 2,
    hoverBackgroundColor:['tomato','yellow'],
      data:[outoffstock,product.length-outoffstock],
    },],

  };

 

/*const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    },
  };*/

  return (
    <Layout>
    {(role==="admin")?
   <> 
   <div className='dashboardContainer'>
    <Typography variant="h2" align='center'>Dashboard</Typography>
    </div>
    <div className='dashboardSummary'>
      <div>
      <p>Total Amount<br/>₹{totalAmount}</p>
      </div>
    </div>
    <div className='dashboardSummaryBox2'>
      <Link to="/admin/products">
        <p>Products</p>
        <p>{product&&product.length}</p>
      </Link>
      <Link to="/admin/orders">
        <p>Orders</p>
        <p>{Orders&&Orders.length}</p>
      </Link>
      <Link to="/admin/users">
        <p>Users</p>
        <p>{Users&&Users.length}</p>
      </Link>
    </div>
    <div className='lineChart'>
      <Line data={lineState}/>
    </div>
    <div className='doughnutChart'>
      <Doughnut data={DoughnutState}/>
    </div>
   
   </>
   :<h3>You are not Authorised</h3>}</Layout>
  )
}

export default Dashboard