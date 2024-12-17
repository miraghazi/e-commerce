import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/images/freshcart-logo.svg'
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";


export default function Navbar() {
  const [paddingBlock, setPaddingBlock] = useState(0); 
  const [classNav,setClassNav] = useState('hidden')
  const [iconOpen, setOpenIcon] = useState('')
 const [iconClose, setCloseIcon] = useState('hidden')

 let{numOfItems}= useContext(CartContext)
let{userLogin,setuserLogin}=useContext(UserContext)  
let navigator=useNavigate()

function logOut(){
  navigator('/login')
  localStorage.removeItem('user Token')
  setuserLogin(null)
  
}

function openNav () {
  setClassNav('') 
  setOpenIcon('hidden')
  setCloseIcon('')  }

  function closeNav () {
    setClassNav('hidden')
    setOpenIcon('')
    setCloseIcon('hidden')
  }

 
return <><nav className=" fixed top-0 left-0 right-0 z-50 bg-white"  style={{paddingBlock:`${paddingBlock}px`}}>
            <div className="p-2 flex flex-col md:flex-row justify-around lg:items-center">
    <div className="logo flex  lg:flex-row  lg:items-center">
            <img src={logo} alt="logo" className="w-[40%] sm:w-[150px] " />
   <button onClick={()=> {openNav()}} 
    data-collapse-toggle="navbar-default" 
    type="button"
      className={`${iconOpen} ms-auto items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 `}
      aria-controls="navbar-default" 
      aria-expanded="false">
      <i className="fa-solid fa-bars text-black text-3xl"></i>
    </button>

    <button onClick={()=> {closeNav ()}}  
    data-collapse-toggle="navbar-default" 
    type="button"
    className={`${iconClose} ms-auto items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 `}
     aria-controls="navbar-default" 
     aria-expanded="false">
        <i className="fa-solid fa-bars text-green-400 text-3xl"></i>
    </button>

    </div>

    <div >
 

         <div  className={`${classNav} md:static w-full md:block md:w-auto `}>
         <ul className="flex flex-col md:flex-row">
            {localStorage.getItem('user Token') !== null? <><li className="px-3 py-2">
            <NavLink to='' onClick={closeNav}>Home</NavLink> </li>
          <li className="px-3 py-2 relative "onClick={closeNav}> <NavLink to='cart'>Cart</NavLink> </li>
          <li className="px-3 py-2 "onClick={closeNav}> <NavLink to='products'>Products</NavLink> </li>
          <li className="px-3 py-2"onClick={closeNav}> <NavLink to='WishList'>WishList</NavLink> </li>
          <li className="px-3 py-2"onClick={closeNav}> <NavLink to='categories'>Categories</NavLink> </li>
          <li className="px-3 py-2"onClick={closeNav}> <NavLink to='brands'>Brands</NavLink> </li>
          <li className="px-3 py-2"onClick={closeNav}> <NavLink to='allorders'>orders</NavLink> </li>
           </> :null}
          </ul>
         </div>
    </div>

    <div  className={`${classNav} md:static w-full md:block md:w-auto `}>
    <ul className="flex flex-col md:flex-row  md:items-center">
    {localStorage.getItem('user Token') === null ? <>
       <li className="px-3 py-2" onClick={closeNav}><NavLink to='register'>Register</NavLink></li>
      <li className="px-3 py-2"onClick={closeNav}><NavLink to='login'>Login</NavLink></li></>      
                
      :<> <li className="md:px-8 py-2 relative" onClick={closeNav}> <NavLink to='cart'><i className="fa-solid fa-cart-shopping text-3xl"></i> <span className="absolute top-[1px] md:end-[15px] rounded-lg bg-green-600 text-white text-xs font-medium me-2 px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{numOfItems}</span></NavLink> </li>
        <li onClick={logOut}className="px-3 py-2 cursor-pointer"><span ><i className="fa-solid fa-right-from-bracket text-2xl"></i></span></li>
      </>}
    
  
  </ul>
  </div>
  </div>
  </nav>                                                                                          
  </>
}
