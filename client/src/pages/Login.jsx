import {React, useState} from 'react'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'
// import {useDispatch} from 'react-redux'
// import { signInSuccess } from '../redux/authSlice'

export const Login = () => {

    const [formData, setFormData ] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }

      const handleOnSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/v1/login", formData);
            if(!response.data.success){
                console.log("error getting response");
                throw new Error("error getting response from api");
            }
            console.log(response.data);
            // *******RESPONSE.DATA.USER YE HAI:***************************
            // user: 
            //     createdAt: "2024-07-27T13:02:49.390Z"
            //     email: "ansh@g.com"
            //     firstName: "ansh"
            //     image: "https://api.dicebear.com/6.x/initials/svg?seed=ansh%20jain "
            //     lastName: "jain"
            //     tasks: []
            //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuc2hAZy5jb20iLCJpZCI6IjY2YTRlZmY5NmM1YzlkNDFkMGU2MGI5ZCIsImlhdCI6MTcyMjA4NTQ2NSwiZXhwIjoxNzIyMTcxODY1fQ.qULltE4wJLRImQkuU8MthnzvuzxkGoggGDbdcA_SCkY"
            //     updatedAt: "2024-07-27T13:02:49.390Z"
            //     __v: 0
            //     _id: "66a4eff96c5c9d41d0e60b9d"
            setFormData({});
            // dispatch(signInSuccess(response.data.user));
            navigate(`/dashboard/${response.data.user._id}`);
            
        } catch (error) {
            console.log("error while signing in : ", error);
        }
      }

  return (
    <div class="mx-auto py-28 bg-gradient-to-r from-pink-500 to-yellow-500 h-screen">
    <div class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
    <div
  className="hidden lg:block lg:w-1/2 bg-cover"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')"
  }}
></div>

        <div class="w-full p-8 lg:w-1/2">
            <h2 class="text-2xl font-semibold text-gray-700 text-center">TakemewithYou</h2>
            <p class="text-xl text-gray-600 text-center">Welcome back!</p>
            <a href="#" class="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                
            </a>
            <div class="mt-4 flex items-center justify-between">
                <span class="border-b w-1/5 lg:w-1/4"></span>
                <a href="#" class="text-xs text-center text-gray-500 uppercase"> Login with email</a>
                <span class="border-b w-1/5 lg:w-1/4"></span>
            </div>

            <form onSubmit = {handleOnSubmit}>
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" 
                placeholder= "enter your email"
                required
                name='email'
                value={formData.email}
                onChange = {handleOnChange}/>
            </div>
            <div class="mt-4">
                <div class="flex justify-between">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <a href="#" class="text-xs text-gray-500">Forget Password?</a>
                </div>
                <input class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password"
                placeholder= "Password"
                required
                name='password'
                value={formData.password}
                onChange = {handleOnChange}  />
            </div>
            <div class="mt-8">
                <button type='submit' class="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login</button>
            </div>
            </form>

            <div class="mt-4 flex items-center justify-between">
                <span class="border-b w-1/5 md:w-1/4"></span>
                <Link to='/signup' >
                <a href="#" class="text-xs text-gray-500 uppercase">or sign up</a>
                </Link>
                <span class="border-b w-1/5 md:w-1/4"></span>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login



