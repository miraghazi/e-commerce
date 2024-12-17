import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'


export default function AllOrders() {
  let {id} = jwtDecode(localStorage.getItem('user Token'))

   async function GetUserOrders() {
     try {
      const options = {
        url :` https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method : "GET",
      }
      return await axios.request(options)
    } catch (error) {
      console.log(error);
    }
  }

  let {data} = useQuery({
    queryFn :GetUserOrders,
    queryKey: ["GetUserOrders"],
    refetchOnMount: true,
    refetchOnWindowFocus:false,
  })
  
  let orders = data?.data
  // console.log(orders );
  return <>
    <Helmet>
    <title>Fresh Orders</title>
  </Helmet>
  <div className='grid grid-cols-12 gap-4'>
      {orders?.length > 0 ? <>
        <div className='flex items-center justify-between col-span-12 px-5'>
          <h1  className='text-xl font-bold'>Paid status </h1>
          <h1 className='text-xl font-bold'>Delivered status </h1>
          <h1 className='text-xl font-bold'>Date Order </h1>
        </div>
      {orders?.map((order)=>{
        return <><div className='grid grid-cols-12 col-span-12 bg-white shadow-lg rounded-md overflow-hidden px-5 py-3'> 
        {order.cartItems?.length > 0 ? <>
          <div className='flex items-center justify-between col-span-12'>
            <h2 className='text-xl font-bold'>{order.isPaid === true ? <i className="fa-solid fa-circle-check text-green-600"></i> : <i className="fa-solid fa-circle-check text-red-600"></i>} Paid</h2>
            <h2 className='text-gray-700 font-bold ms-12 '>total Price : <span className='text-green-600 font-black'>{order.totalOrderPrice } L.E</span></h2>
            <h2 className='text-gray-500'>{new Date(order.createdAt).toDateString()}</h2>
          </div>
          <div className='flex  col-span-12'>
            <h3 className='text-2xl font-black text-gray-800 mt-2'>Products :</h3>
          </div>

        </> : <></>}
        <div className='grid-cols-12 grid col-span-12 gap-5 mt-5'>
          {order.cartItems?.length > 0 ? <>
            {order.cartItems.map((product)=>{
            return <Link to={`/ProductDetails/${product.product.id}/${product.product.category.name}`} className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 rounded-lg'><img src={product.product.imageCover} alt="" /></Link>
          })} </> :<></>}
        </div>
        </div></> })} </> : <></>} </div> </>
}