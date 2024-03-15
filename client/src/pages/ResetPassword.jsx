import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/layout/Layout';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import "./ResetPassword.css";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearRPErrors } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/layout/Loader';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success, loading } = useSelector((state) => state.resetPassword);
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(otp, password));
  };

  useEffect(() => {
    inputRef.current.focus();
    if (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "warning"
      });
      dispatch(clearRPErrors());
    }
    if (success) {
      Swal.fire({
        title: "Success",
        text: "Reset Password Successful",
        icon: "success"
      });
      navigate("/login");
      window.location.reload();
    }
  }, [dispatch, success, error, navigate]);

  return (
    <div>
      <Layout>
        {loading ? <Loader /> :
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>
              <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
                <div className="loginPassword">
                  <VerifiedUserIcon />
                  <input
                    ref={inputRef}
                    type="number"
                    placeholder="OTP"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div>
                  <LockOpenIcon />
                  <input
                    type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                <div className="showPasswordCheckbox">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label>Show Password</label>
                </div>
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        }
      </Layout>
    </div>
  );
};

export default ResetPassword;
