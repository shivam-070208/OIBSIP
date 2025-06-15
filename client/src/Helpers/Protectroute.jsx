import React, { useEffect } from 'react'
import { useContextValues } from './Contextprovider'
import { useNavigate } from 'react-router'

const Protectroute = ({children}) => {
    const { user } = useContextValues()
      const navigate = useNavigate()
     useEffect(() => {
      console.log(user +"nfnffj")
        if (!user && window.location.pathname === '/User') {
          navigate('/signup')
        }
      }, [user, navigate])
  return (
    <div>
      {children}
    </div>
  )
}

export default Protectroute
