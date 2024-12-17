import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let Wish= createContext()


export default  function WishListContextProvider({children}){
let[Best,setBest]=useState(null)


async function addbestProduct(id){
    const toastId=toast.loading("adding Product From WishList ")
    try {
        const option={
            url:`https://ecommerce.routemisr.com/api/v1/wishlist `, 
            method:'POST',
            headers:{  token:localStorage.getItem('user Token') },
            data:{  productId: id ,}
        }

     let {data}=  await axios.request(option)
     localStorage.setItem('best' ,data?.data )
     setBest(data?.data)
     console.log(data);
     
    toast.success("Product added successfully to your wishlist")
    } catch (error) {
        console.log(error);
      toast.error("  Product Has Been Not Addd")  
        
    } finally{
        toast.dismiss(toastId)
            }
   }


   async function deletebestProduct(id){
    const toastId=toast.loading("deleteing Product From WishList ")
    try {
        const option={
            url:`https://ecommerce.routemisr.com/api/v1/wishlist/${id} `, 
            method:'DELETE',
            headers:{
                token:localStorage.getItem('user Token')
            },
           }

     let {data}=  await axios.request(option)
        console.log(data.data);
        localStorage.setItem('best' ,data?.data )
        setBest(data?.data)
        toast.success(" Product Has Been DELETE")

    } catch (error) {console.log(error);
        toast.error("  Product Has Been Not DELETE")  
       } finally{
   toast.dismiss(toastId)
       }
    }

return<Wish.Provider value={{ addbestProduct,deletebestProduct ,Best }}>

{children}

</Wish.Provider>
}



