import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {Helmet} from "react-helmet";
import Loding from "../Loding/Loding";
import { Link } from "react-router-dom";


export default function Brands() {
function getAllBrands(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/brands `)
}

 let {data ,isLoading} = useQuery({
queryKey:' getAllBrands' ,
queryFn: getAllBrands ,
})
// console.log(data);
 
if(isLoading) return<Loding/>
else return <>
    <Helmet>
            <title>Fresh Cart - Brands</title>
    </Helmet>

  <h2 className="text-4xl font-bold text-green-600 text-center mt-10">All Brands</h2>
 <div className="flex flex-wrap  py-6 px-5  ">{data?.data?.data?.map((brand)=>{ return <> 
 <div className=" md:w-1/2 lg:w-1/4 ">
  <Link to={`/brandsDetails/${brand.name}`} className="group" >
 <div className="group-hover:shadow-lg group-hover:shadow-green-600  mb-5 py-6 me-6 rounded-lg">
 <img src={brand.image} alt={brand.name}  key={brand._id} />
 <h1 className="text-center">{brand.name} </h1>
 </div>
   </Link>
 </div>
  </>})}
  </div>
  </>
}
