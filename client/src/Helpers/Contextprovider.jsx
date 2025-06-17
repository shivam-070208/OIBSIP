import {  createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const Usercontext = createContext(null);

export const useContextValues =()=>{
  const value =  useContext(Usercontext);
  return value
}

export const Contextprovider = ({children})=>{
  
    const [user,suser]=useState(null)
    const [childrenshow,schildren]=useState(false)
    const host="https://pizzasellingweb.onrender.com"
    const fetchUser=async ()=>{
       

       try{
     const response = await axios.post(`${host}/users/fetchuser`, {}, { withCredentials: true })
         if(response.status == 200){
            suser(response.data.User);

         }
       }catch(err){
        console.log(err)
       } 
       schildren(true)
    }
     useEffect( ()=>{
       
        fetchUser()
     },[])      
     return(
        <Usercontext.Provider value={{user,suser,host}}>
            {!children&&<>hello</>}
            {childrenshow&&children}
        </Usercontext.Provider>
     ) 
}


