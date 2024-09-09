import {React, useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { saveFcmToken, signInFailure, signInStart, signInSuccess } from '../redux/authSlice'
import { requestFCMToken } from '../firebase'

export const Login = () => {

    const {currentUser} = useSelector((state) => state.user)
    // console.log("CU: ", currentUser)

    const [formData, setFormData ] = useState({
        email: 'k@gmail.com',
        password: '1111',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }


    //   const requestPermission = async() => {
    //     console.log('Requesting permission...');
        
    //     // Requesting notification permission from the user
    //     Notification.requestPermission().then((permission) => {
    //       if (permission === 'granted') {
    //         console.log('Notification permission granted.');
    //         // Now proceed to get the FCM token
    //         requestFCMToken()
    //           .then((token) => {
    //             if (token) {
    //               // You can dispatch the token to your Redux store or send it to your server
    //               try {
    //                 const res = await axios.post(`/api/v1/saveFcmToken/${currentUser._id}`, {token});
    //                 if(res.status !== 200 ){
    //                     console.log("bad response from server");
    //                     return;
    //                 }
    //                 console.log('FCM Token updation is success:', token);
    //                 dispatch(saveFcmToken(token)); // Example if you want to save it in Redux
    //               } catch (error) {
    //                 console.log("some error in updating fcm token in dattabase: ", error)
    //               }
                  

    //             } else {
    //               console.log('No FCM Token was retrieved');
    //             }
    //           })
    //           .catch((error) => {
    //             console.error('Error retrieving FCM token:', error);
    //           });
    //       } else {
    //         console.log('Notification permission denied.');
    //       }
    //     }).catch((error) => {
    //       console.error('Error requesting notification permission:', error);
    //     });
    //   };


    const requestPermission = async () => {
        try {
          console.log('Requesting permission...');
          
          // Requesting notification permission from the user
          const permission = await Notification.requestPermission();
          
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            
            // Now proceed to get the FCM token
            const token = await requestFCMToken();
            
            if (token) {
              try {
                // console.log("ffccmm: ", token)
                const res = await axios.post(`/api/v1/saveFcmToken/${currentUser._id}`, { token: token, userId: currentUser._id });
                
                if (res.status !== 200) {
                  console.log("Bad response from server");
                  return;
                }
                console.log("res: ", res)
                console.log('FCM Token update successful:', token);
                
                // Example if you want to save it in Redux
                dispatch(saveFcmToken(token));
                
              } catch (error) {
                console.log("Error updating FCM token in database:", error);
              }
              
            } else {
              console.log('No FCM Token was retrieved');
            }
            
          } else {
            console.log('Notification permission denied.');
          }
          
        } catch (error) {
          console.error('Error requesting notification permission or retrieving FCM token:', error);
        }
      };
      


      const handleOnSubmit = async(e) => {
        e.preventDefault();
        dispatch(signInStart());
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
            dispatch(signInSuccess(response.data.user));
            // requestPermission();

            navigate(`/${response.data.user._id}`);
            
        } catch (error) {
            console.log("error while signing in : ", error);
            dispatch(signInFailure());
            return;
        }
      }

      useEffect(() => {
        if (currentUser) {
          
          requestPermission();
        }
      }, [currentUser]);

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
                <Link to='/' >
                <a href="#" class="text-xs text-orange-500 uppercase">back to home</a>
                </Link>
                <span class="border-b w-1/5 md:w-1/4"></span>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login



