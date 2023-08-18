import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { fadeInOut } from '../animations'

const Logininput = ({placeholder,icon,inputState,inputStateFunc,type,isSignUp}) => {
  const [isFocus,setIsFocus] = useState(false)
    return (
    <motion.div {...fadeInOut} className={`${isFocus? "shadow-md shadow-red-400" : "shadow-none"} flex items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md rounded-md w-full py-2 px-4`}>
        {icon}
        <input onFocus={()=>setIsFocus(true)} onBlur={()=>setIsFocus(false)} type={type} value={inputState} onChange={(e)=>{inputStateFunc(e.target.value)}} placeholder={placeholder} className='w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none'/>
    </motion.div>
  )
}

export default Logininput