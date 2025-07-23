import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
      setError("Plase enter yout name.");
      return;  
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address.")
      return
    }

    if (!password){
      setError("Please enter the password.")
        return
    }

    setError("")

    //SignUp API Call

    try {
    const response = await axiosInstance.post("/create-account", {
      fullName: name,
      email: email,
      password: password
    })

    if (response.data && response.data.error) {
      setError(response.data.message)
      return 
    }
    if(response.data && response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate('/dashboard');
    }
  } catch (error) {
    if(error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    }
    else {
      setError("An unexpected error occurred. Please try again.");
    }
  }
  }

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='py-10 bg-white border rounded w-96 px-7'>
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign Up</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='pb-1 text-xs text-red-500'>{error}</p>}

            <button type="sumbit" className="btn-primary">
              Create Account
            </button>

            <p className='mt-4 text-sm text-center'>
              Already have an account? {" "}
              <Link to="/Login" className="font-medium underline text-primary">
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>

  )
}

export default SignUp