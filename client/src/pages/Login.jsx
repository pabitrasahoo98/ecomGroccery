import React, { useEffect, useRef, useState } from 'react';
import './login.css';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Loader from '../components/layout/Loader'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Layout from '../components/layout/Layout';
import FaceIcon from '@mui/icons-material/Face';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, clearErrors, register } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Login = () => {
  const targetRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticate } = useSelector(state => state.user);
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false); // State for show/hide password

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerMobileNo, setRegisterMobileNo] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false); // State for show/hide password

  const redirect = location.search ? "/shipping" : "/profile/accountsettings";

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword))
  }

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "warning"
      })
      dispatch(clearErrors);
    }
    if (isAuthenticate) {
      navigate(redirect);
    }

  }, [dispatch, isAuthenticate, error, navigate, redirect, Swal])

  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(register(registerName, registerEmail, registerMobileNo, registerPassword));
  }

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  }

  return (
    <div ref={targetRef}>
      <Layout>
        {loading ? <Loader /> : <>
          <div className='loginSignupContainer'>
            <div className='loginSignupBox'>
              <div>
                <div className='login_Signup_Toggle'>
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                <div className='loginEmail'>
                  <MailOutlineIcon />
                  <input type='email' placeholder='Email' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                </div>
                <div className='loginPassword'>
                  <LockOpenIcon />
                  <input type={showLoginPassword ? 'text' : 'password'} placeholder='Password' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                </div>
                <div>
                <div> <input type="checkbox" checked={showLoginPassword} onChange={() => setShowLoginPassword(!showLoginPassword)} />
                  <label>Show Password</label>
                </div>
                </div>
                <Link to="/password/forget">Forget Password</Link>
                <input type='submit' value="login" className='loginBtn' />

              </form>
              <form className='signupForm' ref={registerTab} onSubmit={registerSubmit}>
                <div className='signupName'>
                  <FaceIcon />
                  <input type='text' placeholder='Name' required name='name' value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
                </div>
                <div className='signupEmail'>
                  <MailOutlineIcon />
                  <input type='email' placeholder='Email' required name='email' value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                </div>
                <div className='signupMobileNo'>
                  <InstallMobileIcon />
                  <input type='text' placeholder='Mobile' required name='mobileno' value={registerMobileNo} onChange={(e) => setRegisterMobileNo(e.target.value)} />
                </div>
                <div className='signupPassword'>
                  <LockOpenIcon />
                  <input type={showRegisterPassword ? 'text' : 'password'} placeholder='Password' required name='password' value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                </div>
                <div>
                <div>
                  <input type="checkbox" checked={showRegisterPassword} onChange={() => setShowRegisterPassword(!showRegisterPassword)} />
                  <label>Show Password</label>
                </div>
                </div>
                
                <input type='submit' value="register" className='signupBtn' />
              </form>
            </div>
          </div>
        </>}
      </Layout>
    </div>

  )
}

export default Login;
