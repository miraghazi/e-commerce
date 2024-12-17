import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Slider from "react-slick";
import Loding from "../Loding/Loding";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { Wish } from "../Context/wishListContext";



export default function ProductDetails() {
  let {addbestProduct,deletebestProduct,Best}=useContext(Wish ) 

  let{addToCart}= useContext(CartContext)
  const [ProductDetails,setProductDetails]=useState({})
  const[relatedProds,setrelatedProds]=useState([])
  let {id,Category} =useParams()


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };


  async function addProductToCart(id){
    let {data}= await addToCart(id)   
    if(data.status=='success'){toast.success(data.message)}
    else{toast.error("This didn't work.")}
    
}

async function getProductDetails(id){
let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
setProductDetails(data.data)

}


async function getrelatedProduct(){
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  let allProducts=data.data
  let relatedProd=allProducts.filter((prod)=> {return prod.category.name==Category})
  setrelatedProds(relatedProd)
  }

useEffect(()=>{
      getProductDetails(id)
      getrelatedProduct()},[id,Category])

      const isFavorite = localStorage.getItem("best")?.includes(ProductDetails?.id)

  return<> {relatedProds.length > 0 ? <>  
    <div className="flex flex-wrap py-6 items-center ">
    <div className=" w-1/4 py-3">
    <div> 
    <Slider {...settings}>
    {ProductDetails?.images?.map((src)=><>  <img src={src} className="mt-3 h-[200px]" alt="" /> </> ) }
    </Slider>
    </div>
    </div>
    <div className=" w-3/4 mx-auto" >
      <div className="p-5">  
      <h4 className="text-2xl">{ProductDetails.title}</h4>
      <p className="text-gray-400 text-xl">{ProductDetails.description}</p>
      <span className="font-bold text-green-400">{ProductDetails?.category?.name}</span>
      <div className=" flex flex-wrap py-6 justify-between">
      <span>{ProductDetails.price}EGP  </span>
      <span><i className="fa-solid fa-star text-yellow-400"></i>{ProductDetails.ratingsAverage} </span>
      </div>
     <div className="flex gap-3">
     {isFavorite? <><button onClick={()=>{deletebestProduct(ProductDetails?.id)}} className='w-10 h-10 rounded-full flex justify-center items-center bg-red-600 text-white '><i className=" fa-solid fa-bookmark"></i></button></> :<><button onClick={()=>{addbestProduct(ProductDetails?.id)}} className=' w-10 h-10 rounded-full flex justify-center items-center text-white  bg-green-600 '><i className="fa-solid fa-bookmark"></i></button></>}
     <button onClick={()=>{addProductToCart(ProductDetails._id)}} className=" text-white bg-green-500 w-full rounded-md py-2">Add To Cart</button>
     </div>
</div>
 </div>
</div>









<div className='grid grid-cols-12 gap-5 mt-10'>
      {relatedProds?.map((product)=>{
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

     </div></> :<Loding/> }
</>
}
