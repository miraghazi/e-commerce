import axios from "axios";
import { useContext} from "react";

import { Link, useNavigate } from "react-router-dom";
import Loding from "../Loding/Loding";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Wish } from "../Context/wishListContext";
import { Helmet } from "react-helmet";
import { useState } from "react";


export default function RecentProducts(){
let{addToCart}= useContext(CartContext)
let {addbestProduct,deletebestProduct,Best}=useContext(Wish ) 
 let [searchProduct,setsearchProduct]=useState("")
  let router=useNavigate()

 async function addProductToCart(id){
    let {data}= await addToCart(id)
    let toastId=toast.loading("Adding To Cart ")
    if(data.status=='success'){toast.success(data.message)
      toast.dismiss(toastId)
    }
    else{toast.error("This didn't work.")}
    toast.dismiss(toastId)}

function getAllProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products  `)
}

let{ data ,isError ,isLoading}= useQuery({
    queryKey:'getAllProducts ' ,
    queryFn:getAllProducts
})

if(isLoading){return<Loding/>}
if(isError){return <h2>Error</h2>}


function search(e) {
  e.preventDefault();
  if(searchProduct.trim().toLowerCase() !==""  ) return router(`/searching/${searchProduct}`)
}



return <>
  <Helmet>
  <title>Fresh Home</title>
  </Helmet>


  <form 
  onSubmit={(e)=>{
  e.preventDefault();
   search(e)
  }}
   className="mt-10">
  <input value={searchProduct} onChange={(e)=>{setsearchProduct(e.target.value)}} type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Product" required />
</form>

     <div className='grid grid-cols-12 gap-5 mt-10'>
      { data?.data?.data?.map((product)=>{
          const isFavorite = localStorage.getItem("best")?.includes(product.id)
          return <div key={product.id} className='col-span-12 md:col-span-6 lg:col-span-3 relative shadow-md rounded-sm overflow-hidden'>
            <div className='relative rounded-md overflow-hidden group'>
              <img src={product.imageCover} className='w-full object-cover' alt="" />
              <div className='flex justify-center items-center gap-5 absolute top-0 left-0 right-0 bottom-0 bg-slate-100 opacity-0 group-hover:opacity-95 transition-all duration-500 cursor-pointer'>
                  <Link to={`/ProductDetails/${product.id}/${product.category.name}`}><span className='flex justify-center items-center w-12 h-12  bg-green-500 rounded-full hover:bg-green-800 transition-all duration-500'><i className="fa-solid fa-eye text-white"></i></span></Link>
                  <span className='flex justify-center items-center w-12 h-12 bg-green-500 rounded-full hover:bg-green-800 transition-all duration-500' onClick={()=>{addProductToCart(product.id)}}><i className="fa-solid fa-cart-arrow-down text-white"></i></span>
                  {isFavorite? <>
                    <span onClick={()=>{
                      deletebestProduct(product.id)
                    }} className='flex justify-center items-center w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 transition-all duration-500'><i className="fa-solid fa-bookmark text-white"></i></span>
                  
                  </> : <>
                  
                    <span onClick={()=>{
                      addbestProduct(product.id)
                    }} className='flex justify-center items-center w-12 h-12  bg-green-500 rounded-full hover:bg-green-800 transition-all duration-500'><i className="fa-solid fa-bookmark text-white"></i></span>
                  </>}


              </div>
            </div>
              <div className='px-3 flex flex-col '>
              <div className=''><span className='font-semibold text-sm text-vip '>{product.category.name}</span></div>
              <div className=''><span className='font-semibold text-lg line-clamp-1'>{product.title}</span></div>
              </div>
              <div className='flex flex-wrap justify-between px-3'>
              <p className=' font-bold'><span className='text-vip font-semibold'>{product.price}</span> EGP</p>
              <p className='font-semibold'><i className='fa-solid fa-star text-yellow-400'></i> {product.ratingsAverage}</p>
              </div>
              <span className='block ps-3 text-sm mb-3 text-gray-600 '>{new Date(product.createdAt).toDateString()}</span>

          </div>
        })
      }

     </div>
  
  </>


}