import Slider from "react-slick";

import slid1 from '../../assets/images/slider-image-1.jpeg'
import slid2 from '../../assets/images/slider-image-2.jpeg'
import slid3 from '../../assets/images/slider-image-3.jpeg'
import slid4 from '../../assets/images/blog-img-2.jpeg'
import img1 from '../../assets/images/grocery-banner.png'
import img2 from '../../assets/images/grocery-banner-2.jpeg'
export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
     
      };

  return<>
   <h4 className="text-2xl font-bold py-3 text-center text-green-600"> welcome To Fresh Cart </h4>
   <div className="flex flex-wrap py-5 ">
<div className="w-3/4 ">
  <Slider {...settings} >
<img className="h-[300px]" src={slid1} alt="" />
<img className="h-[300px]" src={slid2} alt="" />
<img className="h-[300px]" src={slid3} alt="" />
<img className="h-[300px]" src={slid4} alt="" />
<img className="h-[300px]" src={img2} alt="" />
  </Slider>
</div>
<div className="w-1/4">
<img className="h-[150px] w-screen" src={img1} alt="" />
<img className="h-[150px]  w-screen" src={img2} alt="" />
</div>
</div>
  </>
}
