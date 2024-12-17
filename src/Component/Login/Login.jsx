import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yap from 'yup'
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";


export default function Login() {
 let{getCartItems}= useContext(CartContext)
  let {setuserLogin}=useContext(UserContext)
  let navigate=useNavigate()
const[error,seterror]=useState(null)
const[loading,setloading]= useState(false)
let user={
  email:'',
  password:'',
  }

 let validate= Yap.object().shape(
    {email:Yap.string().required('email is required').email('invald mail'),
    password:Yap.string().required('password required').matches(/^[A-Z][a-z0-9]{5,8}$/, 'invalid password'),})

  async function submitForm(val){
    setloading(true)
  console.log(val); 
  let response= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` ,val)

  .then((resp)=>{
    console.log(resp.data.token);
    localStorage.setItem('user Token',resp.data.token)
    setuserLogin(resp.data.token)
    getCartItems()
    navigate('/')
    setloading(false)
  })

  .catch((resp)=>{
    seterror(resp?.response?.data.message)
    setloading(false)
  }) 
}

let Formik = useFormik({
  initialValues: user,
  onSubmit:submitForm,
  validationSchema:validate
})

  return <>
  <div className="container mx-auto py-12">
  <h2 className="font-bold text-4xl text-green-400 py-5 ">Login<i className="fa-solid fa-right-from-bracket text-2xl ps-5"></i> </h2>
  <form onSubmit={Formik.handleSubmit} className="max-w-md mx-auto">

  <div className="relative z-0 w-full mb-5 group">
      <input value={Formik.values.email}
             onChange={Formik.handleChange}
             onBlur={Formik.handleBlur}
            type="email" name="email" id="email"
           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
  </div>
  
  {Formik.errors.email &&Formik.touched.email? <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
  <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg> {Formik.errors.email}</div> :null}
  

  <div className="relative z-0 w-full mb-5 group">
      <input value={Formik.values.password} onChange={Formik.handleChange} onBlur={Formik.handleBlur}
             type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
  </div>
  {Formik.errors.password &&Formik.touched.password? <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
  <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg> {Formik.errors.password}</div> :null}
 
{error ?  <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
  {error}</div> :null}

<Link to='/forgetPassword' className="block mb-3 text-green-600"> forget your password ? </Link>


  <button type="submit" className="text-white bg-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    {loading? <i className="fa-solid fa-spinner fa-spin px-1"></i> : 'Submit' }</button>
  </form>
   </div>
  </>
}