import {Helmet} from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loding from "../Loding/Loding";
import { Link } from "react-router-dom";


export default function Categories() {

  function getAllCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories `)
  }

  let {data ,isLoading} = useQuery({
    queryKey:' getAllCategories' ,
    queryFn: getAllCategories ,
    })

    

if(isLoading)return<Loding/>
else return <>
  <Helmet>
           <title>Fresh Cart - Categories</title>
  </Helmet>
  
<div className="flex flex-wrap py-3 ">
{data?.data?.data?.map((categories)=>{ return <>
<Link to={`/catgoriesDetails/${categories.name}`}  className="w-full md:w-1/2 lg:w-1/3 group" >
<div className=" mb-6 px-3 py-3 ">
<div className="group-hover:shadow-lg group-hover:shadow-green-600  mb-5 py-6 me-6 rounded-lg"> 
    <img src={categories.image} alt={categories.name} className="h-[250px]  w-full ps-3 rounded-md object-fill"/>
    <h2 className="text-center mt-5  ps-3 text-green-500 text-3xl">{categories.name}</h2>

  </div>

</div>
</Link>
</>})}
  </div>
  
  </>
}
