import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import  { Toaster } from 'react-hot-toast';


export default function Layout() {
  
  return <>
<Navbar/>

<div className="container mx-auto p-10">
<Outlet/>
<Toaster/>
</div>


{ localStorage.getItem('user Token')  ? <Footer/>  : null}
  
  </>
}
