import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/img/logo.png'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';
import {motion} from "framer-motion"
import { buttonClick, slideTop } from '../animations';
import {MdShoppingCart,MdLogout} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import {getAuth} from 'firebase/auth'
import {app} from '../config/firebase.config'
import { setUsernull } from '../context/actions/userActions';
import { setCartOn } from '../context/actions/displayCartAction';

const Header = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const cart = useSelector(state =>state.cart)

    const [isMenu , setIsMenu] = useState(false)
    const firebaseAuth = getAuth(app)
    const dispatch = useDispatch()

    const signOut =()=>{
        firebaseAuth.signOut()
        .then(()=>{
          dispatch(setUsernull())
          navigate('/login',{replace:true})
        })
        .catch((err)=>{
          console.log(err);
        })
    } 
  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6">
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={logo} alt="" className="w-12" />
        <p className="font-semibold text-xl">City</p>
      </NavLink>

      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>
          {/* <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/services"}
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/aboutus"}
          >
            About Us
          </NavLink>*/}
        </ul>

        <motion.div
          {...buttonClick}
          onClick={() => dispatch(setCartOn())}
          className="relative cursor-pointer"
        >
          <MdShoppingCart className="text-3xl text-textColor" />
          {cart?.length > 0 && (
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1">
              <p className="text-primary text-base font-semibold">
                {cart?.length}
              </p>
            </div>
          )}
        </motion.div>

        {user ? (
          <>
            <div
              className="relative cursor-pointer "
              onMouseEnter={() => setIsMenu(true)}
            >
              <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                <motion.img
                  whileHover={{ scale: 1.15 }}
                  className="w-full h-full object-cover"
                  src={user?.picture ? user?.picture : Avatar}
                  referrerPolicy="no-referrer"
                />
              </div>
              {isMenu && (
                <motion.div
                  {...slideTop}
                  onMouseLeave={() => setIsMenu(false)}
                  className="px-6 py-4 bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4 w-48"
                >
                  <Link
                    to={"/dashboard/home"}
                    className="hover:text-red-500 text-xl text-textColor"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={"/dashboard/home"}
                    className="hover:text-red-500 text-xl text-textColor"
                  >
                    My Profile
                  </Link>
                  <Link
                    to={"/dashboard/home"}
                    className="hover:text-red-500 text-xl text-textColor"
                  >
                    Orders
                  </Link>
                  <hr />
                  <motion.div
                    {...buttonClick}
                    onClick={signOut}
                    className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-200 hover:bg-gray-100 gap-3"
                  >
                    <MdLogout className="text-2xl text-textColor group-hover::text-headingColor" />
                    <p
                      className="text-textColor text-xl group-hover:text-headingColor"
                      as
                    >
                      Sign Out
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer"
              >
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header