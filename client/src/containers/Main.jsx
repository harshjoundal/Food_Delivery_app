import React, { useEffect } from 'react'
import { Header } from '../components'
import Home from '../components/Home'
import HomeSlider from '../components/HomeSlider'
import { useDispatch, useSelector } from 'react-redux'
import { getAll_Products } from '../api'
import { setAllProducts } from '../context/actions/productAction'
import FilterSection from '../components/FilterSection'
import Cart from '../components/Cart'
import { useNavigate } from 'react-router-dom'

const Main = () => {
const products = useSelector((state) => state.products);
const isCart = useSelector((state) => state.isCart);

const dispatch = useDispatch()

useEffect(()=>{
   if (!products) {
     getAll_Products().then((data) => {
       dispatch(setAllProducts(data));
     });
   }
},[])

  return (
    <main className='w-screen min-h-screen flex items-center justify-start flex-col bg-primary box-border'>
      <Header/>

      <div className=' w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24 box-border'>
          <Home/>
          <HomeSlider/>
          <FilterSection/>
          {
            isCart && <Cart/>
          }
      </div>
    </main>
  )
}

export default Main