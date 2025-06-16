import React, { useEffect } from 'react'
import { useContextValues } from './Contextprovider'
import { useNavigate } from 'react-router'

const Protectroute = ({children,Seller}) => {
    const { user } = useContextValues()
      const navigate = useNavigate()
     useEffect(() => {
        if(!user||(Seller &&user.role=='User')) navigate('/signup')
      
      }, [user, navigate])
  return (
    <div>
      {children}
    </div>
  )
}

export default Protectroute
