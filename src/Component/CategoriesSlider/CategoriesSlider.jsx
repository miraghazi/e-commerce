import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
const[categoriesprod,setcategoriesprod]=useState([])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
         
        ]
      };

      async function getCategories() {
        let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setcategoriesprod(data.data)
    }

    useEffect(()=>{ getCategories()},[])

  return <>
   <h4 className="text-2xl font-bold py-7 text-center text-green-600"> Shop Popular Categories </h4>
  <Slider {...settings}>
  {categoriesprod.map((prod)=><> <div>
    <img src={prod.image} className="h-[200px]" alt="" />
    <h4>{prod.name}</h4>
    </div>  </> )}
    </Slider>
  
  </>
}