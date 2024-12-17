import { createBrowserRouter, RouterProvider,  } from 'react-router-dom'
import { Offline , Online} from "react-detect-offline";
import './App.css'
import Layout from './Component/Layout/Layout'
import Home from './Component/Home/Home'
import Products from './Component/Products/Products'
import Cart from './Component/Cart/Cart'
import Brands from './Component/Brands/Brands'
import Categories from './Component/Categories/Categories'
import Register from './Component/Register/Register'
import Login from './Component/Login/Login'
import Logout from './Component/Logout/Logout'
import Notfound from './Component/Notfound/Notfound'
import UserContextProvider from './Component/Context/UserContext'
import ProtectRoutes from './Component/ProtectRoutes/ProtectRoutes'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import CartContextProvider from './Component/Context/CartContext'
import Payment from './Component/Payment/Payment'
import AllOrder from './Component/AllOrder/AllOrder'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import BrandsDetails from './Component/BrandsDetails/BrandsDetails';
import CatgoriesDetails from './Component/CatgoriesDetails/CatgoriesDetails';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import ResetCode from './Component/ResetCode/ResetCode';
import NewPassword from './Component/NewPassword/NewPassword';
import WishListContextProvider from './Component/Context/wishListContext';
import WishList from './Component/WishList/WishList';
import Searching from './Component/Searching/searching';


let query=new QueryClient()

let routes = createBrowserRouter([
  {path:'' ,element:<Layout/>,
    children:[
   {index:true,element:<ProtectRoutes> <Home/> </ProtectRoutes>  } , 
   {path:'products',element:<ProtectRoutes> <Products/> </ProtectRoutes>} , 
   {path:'ProductDetails/:id/:Category',element:<ProtectRoutes>  <ProductDetails/></ProtectRoutes> } ,
   {path:'cart',element:<ProtectRoutes><Cart/> </ProtectRoutes>} , 
   {path:'WishList',element:<ProtectRoutes><WishList/> </ProtectRoutes>} , 
   {path:'brands',element:<ProtectRoutes> <Brands/></ProtectRoutes>} , 
   {path:'brandsDetails/:brand',element:<ProtectRoutes> <BrandsDetails/> </ProtectRoutes>} , 
  
   {path:'categories',element:<ProtectRoutes><Categories/></ProtectRoutes> } ,
   {path:'catgoriesDetails/:category',element:<ProtectRoutes><CatgoriesDetails/></ProtectRoutes> } ,

   {path:'payment',element:<ProtectRoutes><Payment/></ProtectRoutes> } ,
   {path:'allorders',element:<ProtectRoutes><AllOrder/></ProtectRoutes> } ,
   {path:'searching/:Product',element:<ProtectRoutes><Searching/></ProtectRoutes> } ,

   {path:'register',element:<Register/>} , 
    {path:'login',element:<Login/>} , 
    {path:'logout',element:<Logout/>} , 
    {path:'forgetPassword',element:<ForgetPassword/>} , 
    {path:'resetCode',element:<ResetCode/>} , 
    {path:'newPassword',element:<NewPassword/>} , 
    {path:'*',element:<Notfound/>} , 
    ]}

   
])







function App() {
  return ( <>

<QueryClientProvider client={query}>
   <CartContextProvider>
   <UserContextProvider>

  {/* app */}
<WishListContextProvider>
<RouterProvider router={routes}></RouterProvider>
</WishListContextProvider>

   <ReactQueryDevtools/>
   
   <div className='fixed bottom-1  start-2 shadow-lg rounded-md bg-green-400 font-bold px-5 text-white'>
    <Offline>NetWork issus</Offline>
    <Online> online</Online>
  </div>


  </UserContextProvider>
  </CartContextProvider>
</QueryClientProvider>


  

    
    </>
    )}

export default App
