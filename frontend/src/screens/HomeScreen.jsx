import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function HomeScreen() {

  const {userInfo} = useSelector((state)=> state.auth)

  const navigate = useNavigate()

  useEffect(()=>{
    if(!userInfo){
      navigate('/login')
    }
  },[])

  return (
    <>
    HomeScreen
    </>
  )
}

export default HomeScreen