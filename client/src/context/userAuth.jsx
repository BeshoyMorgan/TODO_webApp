import { createContext, useEffect, useState } from "react";


export const UserAuthCtx=createContext(0);
const UserAuthProvider = (props) => {
const [userId,setUserId]=useState('');
const [userName,setUserName]=useState('');
const [token,setToken]=useState('');


useEffect(()=>{
    setUserId(localStorage.getItem("userId"));
    setUserName(localStorage.getItem("usrtName")); 
},[])
const login=(token,id,name)=>{
    setToken(token);
    setUserId(id);
    setUserName(name)

}
const logout=()=>{
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
}
    return ( <>
    <UserAuthCtx.Provider value={{login,logout,userId,userName}}>
        {props.children}
    </UserAuthCtx.Provider>
    </> );
}
 
export default UserAuthProvider;