import React, { useEffect, useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import {Dashboard, Login, Main} from './containers'
import {getAuth} from "firebase/auth"
import { app } from './config/firebase.config'
import { getAll_cartItems, validateJWTToken } from './api'
import {useDispatch, useSelector} from 'react-redux'
import { setUserDetails } from './context/actions/userActions'
import { fadeInOut } from './animations'
import {motion} from 'framer-motion'
import { Alert, MainLoader } from './components'
import { setCartItems } from './context/actions/cartAction'
import CheckOutSuccess from './components/CheckOutSuccess'

const App = () => {
  const firebaseAuth = getAuth(app)
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const alert = useSelector(state => state.alert)

  useEffect(()=>{
    setIsLoading(true)
    firebaseAuth.onAuthStateChanged(cred => {
        if(cred){
            cred.getIdToken()
            .then((token)=>{
                validateJWTToken(token)
                .then((data)=>{
                  if(data){
                     getAll_cartItems(data?.user_id).then((items)=>{
                          dispatch(setCartItems(items))
                      })
                  }
                  dispatch(setUserDetails(data))
                })
            })
        }
        setInterval(()=>{
          setIsLoading(false)
        },3000)
    })
  },[])

  return (
    <div className='w-screen min-h-screen h-auto flex flex-col justify-center items-center'>
        {
          isLoading && (
            <motion.div {...fadeInOut} className='fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full'>
                <MainLoader/>
            </motion.div>
          )
        }
        <Routes>
            <Route path='/*' element={<Main/>}/>
            <Route path='/dashboard/*' element={<Dashboard/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/checkout-success' element={<CheckOutSuccess/>}/>
        </Routes>
        {alert?.type && 
          <Alert type={alert.type} message={alert.message} />
        }
    </div>
  )
}

export default App