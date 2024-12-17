import { createContext, useEffect, useState } from "react";



export let UserContext= createContext(0)
export default function UserContextProvider(props){
 const[userLogin,setuserLogin]=useState(localStorage.getItem('user Token'))

    useEffect(()=>{
        if(localStorage.getItem('user Token') !== null)
          {setuserLogin(localStorage.getItem('user Token'))}
 },[])

  //  console.log(props);
    
    return<>
    <UserContext.Provider value={{userLogin,setuserLogin}}>
        {props.children}
    </UserContext.Provider>
    </>
}
