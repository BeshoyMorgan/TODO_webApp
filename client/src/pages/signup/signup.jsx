import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserAuthCtx } from "../../context/userAuth";
import axios from "axios";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SignupPage = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const navigate=useNavigate();
    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm();
    const onSubmit = (data) => {
      console.log(data);
      axios({
        method: 'post',
             url: "http://localhost:5000/users/signup",
           
          data:{           
            "email": data.email.toString(),
            "password": data.password.toString(),
            "name":data.userName.toString()
          },
    })
        .then((response) => {
         console.log(response);
            // localStorage.setItem("userId",response.data.user._id);
            // localStorage.setItem("userName",response.data.user.name);
            //  localStorage.setItem("token",response.data.token);
            
            //  auth.login(response.data.token,response.data.user._id,response.data.user.name);
  
          navigate("/");
          toast.success(`User Created Please Login`,{
            autoClose: 1000,
        position:"top-center"   });
             
       }).catch((e)=>alert("error happens sign up later ")
       );
    
    };
  

    return (
      <div className="h-screen w-screen flex justify-center items-center   bg-gradient-to-b from-blue-400 to-cyan-500">
         <img src="./background.png" alt="" className="h-screen w-screen  " /> 
        <div className="h-4/5 w-3/4 lg:h-4/5 lg:w-1/4 bg-white absolute rounded-lg">
         
            <h3 className="pt-10 uppercase font-thin text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400 text-4xl text-center ">Sign Up</h3>
        <form onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 py-1 px-10 justify-center items-center w-full"
        >
           <div className="relative w-full">
            <input
             
              id="userName"
              className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-500 peer"
              placeholder=" "
              {...register("userName", {
                required: "Email Address is required",

                pattern: {
                  value:
                    /^[a-zA-Z0-9_.+-]{4,20}$/,
                  message: "invalid user name",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            <label
              htmlFor="userName"
              className="
                absolute text-sm 
                text-gray-500
                 dark:text-gray-400
                  duration-300
                   transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-cyan-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1"
              
              
            >
                User Name
            </label>
            {errors.email && (
                    <p  className="text-red-500">
                      {errors.email?.message}
                    </p>
                  )}
          </div>
        <div className="relative w-full">
            <input
             
              id="Email"
              className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-500 peer"
              placeholder=" "
              {...register("email", {
                required: "Email Address is required",

                pattern: {
                  value:
                    /^[a-zA-Z0-9_.+-]{3,20}@(yahoo|gmail|outlook)(.com)$/,
                  message: "invalid email address",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            <label
              htmlFor="Email"
              className="absolute text-sm text-gray-500 dark:text-gray-400 
              duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0]
               bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                peer-focus:text-cyan-500 peer-focus:dark:text-blue-500 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
                 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3
                  left-1"
                
            >
              Eamil
            </label>
            {errors.email && (
                    <p  className="text-red-500">
                      {errors.email?.message}
                    </p>
                  )}
          </div>
            <div className="relative w-full">
              <input
                type={passwordVisibility ? "text" : "password"}
                id="password"
                className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-500 peer"
                placeholder=" "
                {...register("password", {
                  required: "Password is required",
                  maxLength: 20,
                  pattern: {
                    value:
                      /^[a-zA-Z0-9_.+-]{4,20}$/,
                    message: "invalid Password",
                  },
                })}
                aria-invalid={errors.password ? "true" : "false"}
              />
  
              <label
                htmlFor="password"
                className="
                absolute text-sm
                 text-gray-500
                 dark:text-gray-400
                  duration-300
                   transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-cyan-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1"
              
               
              >
                password
              </label>
              {errors.password && (
                      <p  className="text-red-500">
                        {errors.password?.message}
                      </p>
                    )}
  
              {!passwordVisibility ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-eye  w-4 h-4 text-gray-500 dark:text-gray-400 absolute right-4 top-3 cursor-pointer"
                  onClick={() => {
                    setPasswordVisibility(!passwordVisibility);
                  }}
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokelinecap="round"
                  strokelinejoin="round"
                  className="lucide lucide-eye-off  w-4 h-4 text-gray-500 dark:text-gray-400 absolute right-4 top-3 cursor-pointer"
                  onClick={() => {
                    setPasswordVisibility(!passwordVisibility);
                  }}
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </svg>
              )}
            </div>{" "}
         
            <button
           
            className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-500 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
    <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 uppercase">
        Sign Up
    </span>
  </button>
  <div className="flex gap-2 text-md text-gray-500 justify-center mb-8">
              <p>Already have an account?</p>
              <Link to={`/`} className="font-bold uppercase underline">Login</Link>
            </div>
        </form>
           
          </div>
      </div>
    );
}
 
export default SignupPage;