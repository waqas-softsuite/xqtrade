import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerWithGoogle } from '../../../rtk/slices/crm-slices/auth/registerWithGoogleSlice';
import { toast } from 'react-toastify';

const GoogleLoginButton = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      // console.log("✅ Google User:", decoded);

      const { email, given_name: first_name } = decoded;

      await dispatch(
        registerWithGoogle({
          email,
          first_name,
          register_type: "google",
        })
      ).unwrap();

      navigate("/user-dashboard");
    } catch (error) {
      console.error("❌ Login Error:", error);
      toast.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const googleButtonContainer = document.querySelector('.haAclf');
      if (googleButtonContainer) {
        googleButtonContainer.style.backgroundColor = "#010E1C";
        clearInterval(interval); // Stop once it's styled
      }
    }, 300); // Check every 300ms

    return () => clearInterval(interval); // Clean up
  }, []);


  return (
    <>
      {/* <h3>Login with Google</h3> */}

      <GoogleLogin
        type='icon'
        theme="filled_blue"
        shape="circle"
        size="medium"
        logo_alignment='center'
        onSuccess={handleSuccess}
        onError={() => {
          console.log("❌ Google Login Failed");
        }}

      />
    </>
  );
};

export default GoogleLoginButton;
