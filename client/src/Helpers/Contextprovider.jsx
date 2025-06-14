import {  createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const Usercontext = createContext(null);

export const useContextValues =()=>{
  const value =  useContext(Usercontext);
  return value
}

export const Contextprovider = ({children})=>{
  
    const [user,suser]=useState(null)
    const fetchUser=()=>{
       

       
        axios.post('https://pizzasellingweb.onrender.com/users/fetchuser',
               { withCredentials: true })
            .then((response)=>{
                   if(response.status(200)){
                        suser(response.data.User);
                      
                   } else{
                  
                    console.log(response.data.message)
                   }
            }).catch((err)=>{
                console.log('err',err.message)
            })
        
           
    }
     useEffect(()=>{
        console.log('fff')
        fetchUser()
     },[])      
     return(
        <Usercontext.Provider value={{user,suser}}>
            {children}
        </Usercontext.Provider>
     ) 
}


