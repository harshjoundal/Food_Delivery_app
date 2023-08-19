import React from 'react'
import {Route,Routes} from 'react-router-dom'
import {Login, Main} from './containers'
const App = () => {
  return (
    <div className='w-screen min-h-screen h-auto flex flex-col justify-center items-center'>
        <Routes>
            <Route path='/*' element={<Main/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    </div>
  )
}

export default App