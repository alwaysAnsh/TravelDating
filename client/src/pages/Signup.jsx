import {React, useState} from 'react'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'


const SignUp = () => {
    const [formData, setFormData ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/v1/signup", formData);
            if(!response.data.success){
                console.log("error fetching details");
            }
            setFormData({});
            navigate('/login')
        } catch (error) {
            console.log("Something went wrong while signing up: ", error);
        }
    }
    
    
    
    
    
    return (
        <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0 bg-gradient-to-r from-blue-300 to-yellow-300">
        <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-blue-900 text-center hidden md:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                   Sign up
                </h1>
                <p className="text-[12px] text-gray-500">
                  Hey!! enter your details to create your account
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <form onSubmit={handleSubmit} className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="First Name (required)"
                    required
                    name='firstName'
                    value={formData.firstName}
                    onChange = {handleOnChange}
                  />
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Last Name (required)"
                    required
                    name='lastName'
                    value={formData.lastName}
                    onChange = {handleOnChange}
                  />
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder= "enter your email (required)"
                    required
                    name='email'
                    value={formData.email}
                    onChange = {handleOnChange} 
                  />
                  
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder= "Password (required)"
                    required
                    name='password'
                    value={formData.password}
                    onChange = {handleOnChange}
                  />
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder= "Confirm Password"
                    required
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange = {handleOnChange}
                  />
                  <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <button type='submit' className="ml-3">Sign Up</button>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account?{" "}
                    <a href="">
                      <Link to='/login'>
                      <span className="text-blue-900 font-semibold">Sign in</span>
                      </Link>
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SignUp



