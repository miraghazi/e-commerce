import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loding from '../Loding/Loding';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Wish } from "../Context/wishListContext";

export default function CatgoriesDetails() {
let {addbestProduct,deletebestProduct,Best}=useContext(Wish ) 
let {addToCart}= useContext(CartContext)
console.log(addToCart);

const[relatedcats,setrelatedcats]=useState([])
let {category}=useParams()


async function getrelatedcatgories() {
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    let allcategories=data?.data

    
  let relatedcat=allcategories.filter((prod)=> prod.category.name==category)
    setrelatedcats(relatedcat)
    console.log(relatedcat);
    
}

async function addProductToCart(id){
  let {data}= await addToCart(id)   
  if(data.status=='success'){toast.success(data.message)}
  else{toast.error("This didn't work.")}
  
}

useEffect(()=>{getrelatedcatgories()},[])


  return<>
  
  <div className='grid grid-cols-12 gap-5 mt-10'>
    {relatedcats.length > 0 ?  <>
    
      { relatedcats?.map((product)=>{
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

    </>:<Loding/>
} 
   
   </div>
  
  </>
}
