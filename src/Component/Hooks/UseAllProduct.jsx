import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function UseAllProduct() {

    function getAllProducts(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    
    let resp= useQuery({
        queryKey:['getAllProducts'] ,
        queryFn:getAllProducts
    })


  return resp
  
}
