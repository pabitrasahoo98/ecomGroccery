import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { useSelector, useDispatch } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Loader from '../Loader';
import { Button } from '@mui/material';
import { UPDATE_USER_RESET } from '../../../reducers/manipulateUserReducer';
import { clearUUErrors, updateUser,userDetails,clearAUDErrors } from '../../../actions/userAction';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = ({role}) => {
    const navigate=useNavigate();
    const { loading, error, user } = useSelector((state) => state.userDetails);
    
  const {
    loading: updateLoading,
    error: updateError,
    isUpdate,
  } = useSelector((state) => state.maniUser);

    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [urole, setUrole] = useState("");

  const {id}=useParams();
    const dispatch=useDispatch();
    useEffect(() => {
        if (user && user._id !== id) {
            dispatch(userDetails(id));
          } else {
            setName(user.name);
            setEmail(user.email);
            setUrole(user.role);
          }
          if (error) {
            window.alert(error);
            dispatch(clearAUDErrors());
          }
      
          if (updateError) {
            window.alert(updateError);
            dispatch(clearUUErrors());
          }
      
          if (isUpdate) {
            window.alert("User Updated Successfully");
            navigate("/admin/users");
            dispatch(UPDATE_USER_RESET());
          }
    
    }, [user,dispatch,error,updateError,isUpdate,id,navigate])

    const updateUserSubmitHandler=(e)=>{
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", urole);
    
        dispatch(updateUser(id, myForm));
    }
    

  return (
    
    <Layout>
    {(role==="admin")?
   <div className="newProductContainer">
   {loading ? (
     <Loader />
   ) : (
     <form
       className="createProductForm"
       onSubmit={updateUserSubmitHandler}
     >    
       <h1>Update User</h1>

       <div>
         <PersonIcon />
         <input
           type="text"
           placeholder="Name"
           required
           value={name}
           onChange={(e) => setName(e.target.value)}
         />
       </div>
       <div>
         <MailOutlineIcon />
         <input
           type="email"
           placeholder="Email"
           required
           value={email}
           onChange={(e) => setEmail(e.target.value)}
         />
       </div>

       <div>
         <VerifiedUserIcon />
         <select value={urole} onChange={(e) => setUrole(e.target.value)}>
           <option value="">Choose Role</option>
           <option value="admin">Admin</option>
           <option value="user">User</option>
         </select>
       </div>

       <Button
         id="createProductBtn"
         type="submit"
         disabled={
           updateLoading ? true : false || urole === "" ? true : false
         }
       >
         Update
       </Button>
     </form>
   )}
 </div>

   :<h3>You are not Authorised</h3>}</Layout>
  )
}

export default UpdateUser