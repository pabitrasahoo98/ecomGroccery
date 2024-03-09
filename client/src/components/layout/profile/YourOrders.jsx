import React, { useEffect, useState } from 'react'
import './YourOrders.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearMOErrors, myOrder } from '../../../actions/orderAction';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const YourOrders = () => {
    
    const dispatch=useDispatch();
    const {myOrders,loading,error}=useSelector((state)=>state.myOrders);

    useEffect(() => {
        if(error){
            Swal.fire({
                title: "Error",
                text: error,
                icon: "warning"
              })
            dispatch(clearMOErrors());
        }
        
      dispatch(myOrder());

    }, [dispatch,error,Swal])

    const [currentPage,setCurrentPage]=useState(1);
    const recordsPerPage=6;
    const lastIndex=currentPage*recordsPerPage;
    const firstIndex=lastIndex-recordsPerPage;
    const records=myOrders.slice(firstIndex,lastIndex);
    const npage=Math.ceil(myOrders.length/recordsPerPage);
    const numbers=[...Array(npage+1).keys()].slice(1);
    function prePage(){
        if(currentPage!==1){
            setCurrentPage(currentPage-1);
        }

    }
    function nextPage(){
        if(currentPage!==npage){
            setCurrentPage(currentPage+1);
        }

    }
    function changeCPage(id){
        setCurrentPage(id);

    }


    

    return (
        <>{loading?<Loader/>:
        <div className='yourorders'>
            <h1 className='mainhead1'>Your Orders</h1>

            <table className='yourorderstable'>
                <thead>
                    <tr>
                        <th scope='col'>Order ID</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Total</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {records.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td data-label='OrderID'>{item._id}</td>
                                <td data-label='OrderDate'>{item.createdAt.toString().slice(0,10)}</td>
                                <td data-label='Delivery Status'>
                                    <div>
                                        {item.orderStatus === 'Delivered' && <span className='greendot'></span>}
                                        {item.orderStatus === 'Processing' && <span className='yellowdot'></span>}
                                        {item.status === 'Cancelled' && <span className='reddot'></span>}
                                        {item.orderStatus}
                                    </div>
                                </td>
                                <td data-label='Total'>₹{item.totalPrice}</td>
                                <td data-label='Invoice'>
                                    <Link to={`/order/${item._id}`} className='mainbutton1'
                                      
                                    >View</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>{(npage>1)&&
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={prePage}>Prev</a>
                    </li>
                    {
                        numbers.map((n,i)=>(
                        <li className={`page-item ${currentPage===n?'active':''}`} key={i}>
                            <a href='#' className='page-link' onClick={()=>changeCPage(n)}>
                            {n}
                            </a>

                        </li>))
                    }
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={nextPage}>Next</a>
                    </li>

                </ul>
            </nav>}
        </div>}
        </>
    )
}

export default YourOrders
