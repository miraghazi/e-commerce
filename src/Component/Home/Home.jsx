import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import {Helmet} from "react-helmet";

export default function Home() {
  return<>
      <Helmet>
           <title>Fresh Cart Market</title>
  </Helmet>
  <div className=" container py-6 px-5 mx-auto">
  <MainSlider/>  
  <CategoriesSlider/>
   <RecentProducts/>
  </div>
  </>
}
