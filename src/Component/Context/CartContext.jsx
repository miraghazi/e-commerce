import axios from "axios"
import { createContext, useEffect, useState } from "react"
import toast from "react-hot-toast"



export let CartContext=createContext(0)

export default function CartContextProvider(props){
const[totalPrice,settotalPrice]=useState(0)
const[cardId,setcardId]=useState(0)
const[allProducts,setallProducts]=useState(null)
const[numOfItems,setnumOfItems]=useState(0)

function addToCart(id){
    return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:id},
        { headers:
                {token:localStorage.getItem('user Token')}
            })

            .then((resp)=>{
            console.log(resp);
            getCartItems()
            return resp
          })

            .catch((error)=>{
            return error })
        }






function getCartItems(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
    headers:{token:localStorage.getItem('user Token')}})
    .then((resp)=>{
   
      settotalPrice(resp.data.data.totalCartPrice)
      setcardId(resp.data.cartId)
      setallProducts(resp.data.data.products)
      setnumOfItems(resp.data.numOfCartItems)})
      .catch((error)=>{

        return error })
}
useEffect(()=>{getCartItems()},[])

function UpDateCartItem(id,count){
  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id} `,{count:count},
    { headers:{token:localStorage.getItem('user Token')}})
    .then((resp)=>{
      console.log(resp);
      settotalPrice(resp.data.data.totalCartPrice)
      setcardId(resp.data.cartId)
      setallProducts(resp.data.data.products)
      setnumOfItems(resp.data.numOfCartItems)})
      .catch((error)=>{
        console.log(error);
        return error })
}

function DeleteItem(id){
  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    headers:{token:localStorage.getItem('user Token')}})
    .then((resp)=>{
      console.log(resp);
      settotalPrice(resp.data.data.totalCartPrice)
      setcardId(resp.data.cartId)
      setallProducts(resp.data.data.products)
      setnumOfItems(resp.data.numOfCartItems)})
      .catch((error)=>{
        console.log(error);
        return error })
}

function DeleteAll(){
  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
    {headers:{token:localStorage.getItem('user Token')}})  
  .then(()=>{  getCartItems() }) 
}

  return <>
  <CartContext.Provider value={{addToCart ,getCartItems,allProducts,setallProducts,totalPrice,settotalPrice,numOfItems,setnumOfItems,cardId,UpDateCartItem,DeleteItem,DeleteAll}}>

    {props.children}
  </CartContext.Provider>
  </>
}