import { Navigate } from "react-router-dom"

export default function ProtectRoutes(props){
  //  console.log(props);
    
    if(localStorage.getItem('user Token')!==null){ return props.children }
     else{return <Navigate to='/login'/>}
}