import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



export default function Payment() {
    const [isOnline,setisOnline]=useState(false)
  let navigate= useNavigate()  
   let{cardId,setallProducts,settotalPrice,setnumOfItems}=useContext(CartContext)

   let Formik = useFormik({  
    initialValues: {
        details:'',
        phone:'',
        city:''  
    },
       onSubmit:detectPayment        })

async function cashOrder(val){
console.log(val);
let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cardId}`,
    {shippingAddress:val},
    {headers:{token:localStorage.getItem('user Token')}})

    console.log(data);
    if(data.status=='success')
        {   toast.success('Product Will Com Sooon....')
            navigate('/cart')
            setallProducts(null)
            settotalPrice(null)
            setnumOfItems(null)
        }}

async function payOnline(val) {
    let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${location.origin} `,
        {shippingAddress:val},
        {headers:{token:localStorage.getItem('user Token')}})

        console.log(data);
        if(data.status =='success'){
        window.open(data.session.url)
        }
    
}

function detectPayment(val){
if(isOnline){ payOnline(val)}
else(cashOrder())
}


  return<> <div className="container mx-auto py-12">
  <h2 className="font-bold text-4xl text-green-400 py-5"><i className= "text-green-400 px-2 fa-solid fa-basket-shopping"></i>Payment</h2>
  <form onSubmit={Formik.handleSubmit} className="max-w-md mx-auto">
  <div className="relative z-0 w-full mb-5 group">
      <input value={Formik.values.details} onChange={Formik.handleChange} onBlur={Formik.handleBlur}
            type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your details</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input value={Formik.values.phone} onChange={Formik.handleChange} onBlur={Formik.handleBlur}
             type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input value={Formik.values.city} onChange={Formik.handleChange} onBlur={Formik.handleBlur}
            type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your city</label>
  </div>
 <div className="text-center">
 <button onClick={()=>{setisOnline(false)}} type="submit" className="text-white bg-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 me-10">Pay Cash</button>
 <button onClick={()=>{setisOnline(true)}} type="submit" className="text-white bg-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ">Pay Online</button>
 </div>
  </form>
   </div>
 </>
}
