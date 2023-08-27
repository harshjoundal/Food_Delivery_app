import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { buttonClick, slideIn, staggerFadeInOut } from '../animations'
import {BiChevronRight} from 'react-icons/bi'
import {FcClearFilters} from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import {setCartOff} from '../context/actions/displayCartAction'
import {setCartItems} from '../context/actions/cartAction'
import { HiCurrencyRupee } from 'react-icons/hi'
import { baseURL, emptyCart, getAll_cartItems, incrementItemQuantity } from '../api'
import axios from 'axios'
import { Empty, Spin } from 'antd'
import {useNavigate} from 'react-router-dom'
import { alertNULL, alertWarning } from '../context/actions/alertActions'


// import 

const Cart= () => {
    const dispatch = useDispatch()
    const cart = useSelector(state=> state.cart)
    const user = useSelector(state=> state.user)
    const navigate = useNavigate()

    const [paymentLoading,setPaymentLoading] = useState(false)

    const [total,setTotal] = useState(0)

    useEffect(()=>{
        let tot = 0;
        if(cart){
            cart.map((data) => {
                tot += Number(data.product_price) * data.quantity;
                return data;
            })
        }
        setTotal(tot)
    },[])

    const handleCheckout = ()=>{    
        if(!user){
          dispatch(alertWarning("You need to login before placing the order"));
          navigate('/login')
          setTimeout(()=>{
            dispatch(alertNULL())
          },3000)
        }
        else{
          const data = {
              user:user,
              cart : cart,
              total:total
          }
          setPaymentLoading(true)
          axios.post(`${baseURL}/api/products/create-checkout-session`,{data})
          .then((res)=>{
              setPaymentLoading(false);
              emptyCart(user?.user_id)
              if(res.data.url){
                  window.location.href = res.data.url
              }
          })
          .catch(err=>{
              setPaymentLoading(false);
              console.log(err);
          })
        }
    }

  return (
    <motion.div
      {...slideIn}
      className="fixed z-50 right-0 top-0 w-300 md:w-508 bg-lightOverlay backdrop-blur-md shadow-md h-screen"
    >
      {paymentLoading && (
        <motion.div className="absolute top-[50%] z-50 left-[50%]">
          <Spin size="large" />
        </motion.div>
      )}
      <div className="w-full flex items-center justify-between py-4 pb-12 px-6">
        <motion.i
          className="cursor-pointer"
          {...buttonClick}
          onClick={() => dispatch(setCartOff())}
        >
          <BiChevronRight className="text-[50px] text-textColor" />
        </motion.i>
        <p className="text-2xl text-headingColor font-semibold">Your Cart</p>
        <motion.i
          className="cursor-pointer"
          {...buttonClick}
          onClick={() => dispatch(setCartOff())}
        >
          <FcClearFilters className="text-[30px] text-textColor" />
        </motion.i>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start rounded-t-xl bg-zinc-900 h-full py-6 gap-3 relative">
        {cart && cart?.length > 0 ? (
          <>
            <div className="flex flex-col w-full items-start justify-start gap-3 h-[65%]    overflow-y-scroll scrollbar-none px4 ">
              {cart &&
                cart?.length > 0 &&
                cart?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>

            <div className="bg-zinc-800  w-full h-[15%] flex flex-col items-center       justify-center px-4 py-7 gap-1">
              <div className="w-full flex items-center justify-evenly">
                <p className="text-3xl text-zinc-500 font-semibold">Total</p>
                <p className="text-3xl text-orange-500 font-semibold flex items-center justify-center gap-1">
                  <HiCurrencyRupee className="text-primary" />
                  {total}
                </p>
              </div>

              <motion.button
                onClick={handleCheckout}
                {...buttonClick}
                className="bg-orange-400 w-[70%] px-4 py-3 text-xl text-headingColor font-semibold hover:bg-orange-500 drop-shadow-md rounded-2xl"
              >
                Check Out
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl text-primary font-bold flex flex-col items-center justify-center absolute  top-[20%] left-[30%]">
              <Empty /> 
              Empty Cart
            </h1>
          </>
        )}
      </div>
    </motion.div>
  );
}

export const CartItemCard =({data,index})=>{
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const [itemTotal, setItemTotal] = useState(0);
    const dispatch = useDispatch()

    useEffect(()=>{
        setItemTotal(data.product_price * data.quantity)
    },[itemTotal,cart])

    const decrementCart = (productId) => {
        incrementItemQuantity(user?.user_id,productId,"decrement")
        .then((data)=>{
            getAll_cartItems(user?.user_id)
            .then((items)=>{
                dispatch(setCartItems(items));
            })
        })
    };

    const incrementCart = (productId) => {
        incrementItemQuantity(user?.user_id, productId, "increment").then(
          (data) => {
            getAll_cartItems(user?.user_id).then((items) => {
              dispatch(setCartItems(items));
            });
          }
        );
    };
    return (
      <motion.div
        key={index}
        {...staggerFadeInOut(index)}
        className="w-full flex items-center justify-start bg-zinc-800 rounded-md drop-shadow-md px-4 gap-4"
      >
        <img
          src={data?.imageURL}
          alt=""
          className="w-24 min-w-[94px] h-24 object-contain"
        />
        <div className="flex items-center justify-start gap-1 w-full">
          <p className=" text-lg text-primary font-semibold">
            {data?.product_name}
            <span className="text-sm block capitalize text-gray-400">
              {data?.product_category}
            </span>
          </p>
          <p className=" text-sm font-semibold text-red-400 ml-auto flex items-center justify-center gap-1">
            <HiCurrencyRupee className="text-red-400" />
            {itemTotal}
          </p>
        </div>

        <div className="ml-auto flex items-center justify-center gap-3">
          <motion.div
            className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
            {...buttonClick}
            onClick={() => { decrementCart(data?.productId);}}
          >
            <p className="text-xl text-primary font-semibold">--</p>
          </motion.div>
          <p>{data?.quantity}</p>
          <motion.div
            className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
            {...buttonClick}
            onClick={() => { incrementCart(data?.productId)}}
          >
            <p className="text-xl text-primary font-semibold">+</p>
          </motion.div>
        </div>
      </motion.div>
    );
}

export default Cart