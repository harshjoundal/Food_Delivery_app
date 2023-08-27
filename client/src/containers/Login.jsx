import React, { useEffect, useState } from 'react'
import LoginBg from '../assets/img/LoginBg.jpg'
import logo from '../assets/img/logo.png'
import { LoginInput } from '../components'
import {FaEnvelope,FaLock} from "react-icons/fa"
import {FcGoogle} from "react-icons/fc"
import {motion} from 'framer-motion'
import { buttonClick } from '../animations'
import {getAuth, signInWithPopup,GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {app} from '../config/firebase.config'
import { validateJWTToken } from '../api'
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../context/actions/userActions'
import { alertInfo, alertWarning } from '../context/actions/alertActions'



const Login = () => {

const navigate = useNavigate()
const dispatch = useDispatch();

const [userEmail,setUserEmail] = useState("")
const [isSignUp,setIsSignUp] = useState(false)
const[password,setPassword] = useState("")
const[confirm_password,setConfirm_Password] = useState("")

const firebaseAuth = getAuth(app)
const provider = new GoogleAuthProvider()

const user = useSelector(state => state.user)
const alert = useSelector(state => state.alert)


useEffect(() => {
  if (user) {
    navigate("/", { replace: true });
  }
}, [user]);

const loginWithGoogle=async ()=>{
    await signInWithPopup(firebaseAuth,provider)
    .then(userCred =>{
        firebaseAuth.onAuthStateChanged(cred => {
            if(cred){
                cred.getIdToken()
                .then((token)=>{
                    validateJWTToken(token)
                    .then((data)=>{
                        dispatch(setUserDetails(data));
                    })
                })
                navigate("/", { replace: true });
            }
        })
    })
}

const signUpwiEmailPassword =async ()=>{
    if(userEmail === ""|| password=== "" || confirm_password=== ""){
        alert("Req");
        dispatch(alertInfo("Required fields should not be empty"));
    }
    else {
        if(password === confirm_password){
            await createUserWithEmailAndPassword(firebaseAuth,userEmail,password)
            .then((userCred)=>{
                firebaseAuth.onAuthStateChanged(cred => {
                    if(cred){
                        cred.getIdToken()
                        .then((token)=>{
                            validateJWTToken(token)
                            .then((data)=>{
                                dispatch(setUserDetails(data));
                                setUserEmail("");
                                setConfirm_Password("")
                                setConfirm_Password("")
                            })
                            navigate("/", { replace: true });

                        })
                    }
                })
            })
        }
        else{
            dispatch(alertWarning("Password doesn't match"));
        }
    }
}

const signInwithEmailPassword= async()=>{
    if(userEmail !== "" && password !== ""){
        await signInWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateJWTToken(token).then((data) => {
                 dispatch(setUserDetails(data));
                //   setUserEmail("");
                //   setConfirm_Password("");
                //   setConfirm_Password("");
                });
                navigate("/",{replace:true})
              });
            }
          });
        });
    }
    else{
         dispatch(alertWarning("Password doesn't match"));
    }
}
   
return (
    <div className='w-screen h-screen relative overflow-hidden flex'>
        {/* Background image */}
        <img src={LoginBg} alt='background' className='w-full h-full object-cover absolute top-0 left-0'/>
        {/* content box */}
        <div className='flex flex-col gap-6 items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 pr-12'>
            {/* Top logo section */}
            <div className='flex items-center justify-start gap-4 w-full cursor-pointer' onClick={()=>navigate('/')}>
                <img src={logo} alt='' className='w-8'/>
                <p className="text-headingColor font-semibold text-2xl">City</p>
            </div>

         
                {/* wecome text */}
                <p className='text-3xl font-semibold text-headingColor'> Welcome Back</p>
                <p className='text-xl text-textColor -mt-6'>{isSignUp ? "Sign Up" : "Sign in"} with following</p>
           
           {/* imnput section */}

           <div className='w-full flex flex-col items-center justify-center gap-6 px-4  md:px-12 py-4'>
                <LoginInput placeholder={"Email Here"} icon={<FaEnvelope className='text-xl text-textColor'/>} inputStateFunc={setUserEmail} inputState={userEmail} type="email" isSignUp={isSignUp}/>
                <LoginInput placeholder={"Password Here"} icon={<FaLock className='text-xl text-textColor'/>} inputStateFunc={setPassword} inputState={password} type="password" isSignUp={isSignUp}/>
                {isSignUp && (
                    <LoginInput placeholder={"Password Here"} icon={<FaLock className='text-xl text-textColor'/>} inputStateFunc={setConfirm_Password} inputState={confirm_password} type="password" isSignUp={isSignUp}/>
                )}
                {!isSignUp ?
                    <p>Doesn`t have an account: <motion.button {...buttonClick} className="text-red-400 cursor-pointer bg-transparent" onClick={()=>setIsSignUp(true)}>Create one</motion.button></p>
                    :
                    <p>Already have an account: <motion.button {...buttonClick} className="text-red-400 cursor-pointer bg-transparent" onClick={()=>setIsSignUp(false)}>Sign-in here</motion.button></p>
                }

                {/* button section */}
                {
                    isSignUp ?
                    <motion.button 
                        onClick={signUpwiEmailPassword}
                    {...buttonClick} className='w-full p-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl hover:bg-red-500 transition-all duration-150'>
                        Sign Up
                    </motion.button>
                    :
                    <motion.button
                        onClick={signInwithEmailPassword}
                    {...buttonClick} className='w-full p-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl hover:bg-red-500 transition-all duration-150'>
                        Sign In
                    </motion.button>
                }
            </div>
                <div className='flex items-center justify-between gap-16'>
                    <div className='w-24 h-[1px] bg-white'></div>
                    <p className='text-white'>or</p>
                    <div className='w-24 h-[1px] bg-white'></div>
                </div>

                <motion.div
                onClick={loginWithGoogle}
                {...buttonClick} className='flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4'>
                    <FcGoogle className='text-3xl'/>
                    <p className='capitalize text-base text-headingColor'>Sign in with Google</p>
                </motion.div>
        </div>
    </div>
  )
}

export default Login