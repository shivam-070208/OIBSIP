import {  createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const Usercontext = createContext(null);

export const useContextValues =()=>{

  const value =  useContext(Usercontext);
  return { value}
}

export const Contextprovider = ({children})=>{
    const [fetch,sfetch]=useState(true)
    const [user,suser]=useState(null)
    const fetchUser=()=>{
        try{
        axios.post('https://pizzasellingweb.onrender.com/users/fetchuser')
            .then((response)=>{
                   if(response.status(200)){
                        suser(response.data.User);
                   } else{
                    console.log(response.data.message)
                   }
            })
        }catch(err){
            console.log('err',err.message)
        }
           
    }
     useEffect(()=>{
        fetchUser()
     },[fetch])      
     return(
        <Usercontext.Provider value={{user,sfetch}}>
            {children}
        </Usercontext.Provider>
     ) 
}


