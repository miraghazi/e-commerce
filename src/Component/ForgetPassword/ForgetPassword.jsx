import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as Yap from 'yup'

export default function ForgetPassword() {

    let navigate=useNavigate()
    let valid= Yap.object({
        email:Yap.string().required('email is required').email('invald mail'),})
      

        async function Verify(values) {
            let toastId = toast.loading("Waiting...")
            try {  const options = {
                    url : "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                    method: "POST",
                    data : values
                }
                let {data} = await axios.request(options)
                toast.success("We Have Sent Code for Your Email")
                console.log(data);
                navigate("/resetCode")
    
            } catch (error) {
                toast.error("Email Is Not Exist")
            } finally {
                toast.dismiss(toastId)
            }
        }

    let formik = useFormik({
      initialValues: {email:''},
      onSubmit:Verify,
      validationSchema:valid
    })



    return <>
    <div className='mt-10 flex justify-center'>
        <h1 className='text-2xl font-bold pb-1 w-fit relative before:absolute before:bottom-0 before:w-1/2 before:left-1/2 before:-translate-x-1/2 before:h-[4px] before:bg-vip rounded-md text-green-500'>Forgot Password</h1>
    </div>
      <form onClick={formik.handleSubmit} className='mt-12'>
      <div className="relative z-0 w-full mb-5 group">
      <input value={formik.values.email}
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
            type="email" name="email" id="email"
           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
  </div>
  {formik.errors.email &&formik.touched.email? <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
  <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg> {formik.errors.email}</div> :null}



               <button type="submit" className="text-white bg-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Verify</button>
      </form>
    </>


}
