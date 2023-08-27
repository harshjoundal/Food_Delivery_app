import React, { useEffect, useState } from 'react'
import {statuses} from '../utils/styles'
import {Spin} from 'antd'
import {FaCloudUploadAlt} from 'react-icons/fa'
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {storage} from '../config/firebase.config'
import {useDispatch, useSelector} from 'react-redux'
import { alertDanger, alertNULL, alertSuccess } from '../context/actions/alertActions'
import {MdDelete} from 'react-icons/md'
import {motion} from "framer-motion"
import LinearProgress from "@mui/material/LinearProgress";
import { CircularProgress } from '@mui/material'
import { addNewProduct, getAll_Products } from '../api'
import {setAllProducts} from "../context/actions/productAction"

const DBNewItem = () => {
  const[itemName,setItemName] = useState("")
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(true);
  const [imageDownloadUrl, setImageDownloadUrl] = useState(false);
  const alert = useSelector(state => state.alert)
  const pData = useSelector((state) => state.products);
  const dispatch = useDispatch()

  


  const uploadImage =(e)=>{
      setIsLoading(true);
      const imageFile = e.target.files[0];
      const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on('state_changed',(snapshot)=>
      {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes)*100)
      },
      (error)=>{
        dispatch(alertDanger(`Error : ${error}`));
        setTimeout(()=>{
          dispatch(alertNULL())
        },3000)
      },
      ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageDownloadUrl(downloadURL)
            setIsLoading(false)
            setProgress(null)
            dispatch(alertSuccess("Image uploaded to the cloud"))
            setTimeout(()=>{
              dispatch(alertNULL)
            },3000)
          });
      })


  }

  const deleteImageFromFirebase =()=>{
      setIsLoading(true);
      const deleteRef = ref(storage,imageDownloadUrl)
      deleteObject(deleteRef)
      .then(()=>{
        setImageDownloadUrl(null);
        setIsLoading(false)
        dispatch(alertSuccess("Image removed from the cloud"));
        setTimeout(() => {
          dispatch(alertNULL);
        }, 3000);
      })

  }

  const submitNewData = async () =>{
      const data = {
        product_name :itemName,
        product_category:category,
        product_price:price,
        imageURL:imageDownloadUrl
      }
      
      await addNewProduct(data)
      .then((res)=>{
        console.log(res);
        dispatch(alertSuccess("New item added"))
        setTimeout(()=>{
          dispatch(alertNULL())
        },3000)
        setImageDownloadUrl(null);
        setItemName("")
        setPrice("")
        setCategory(null)
      })

      getAll_Products().then(data =>{
        dispatch(setAllProducts(data));
      })

  }


  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField
          type="text"
          placeholder={"Item name here"}
          stateFunc={setItemName}
          stateValue={itemName}
        />
        <div
          className="w-full flex items-center justify-around gqp-3
        flex-wrap"
        >
          {statuses &&
            statuses?.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data?.category)}
                className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                  data.category === category
                    ? "bg-red-400 text-primary"
                    : "bg-transparent"
                }`}
              >
                {data.title}
              </p>
            ))}
        </div>
        <InputValueField
          type="number"
          placeholder={"Item price here"}
          stateFunc={setPrice}
          stateValue={price}
        />

        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <Spin size="large" />
              {/* {progress} */}
              <React.Fragment>
                <CircularProgress
                  variant="determinate"
                  value={progress}
                />
                <LinearProgress
                  variant="determinate"
                  value={progress}
                />
              </React.Fragment>
            </div>
          ) : (
            <>
              {!imageDownloadUrl ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <p className="font-bold text-4xl">
                          <FaCloudUploadAlt className="rotate-0" />
                        </p>
                        <p className="text-lg text-textColor">
                          Click to upload an image
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imageDownloadUrl}
                      className="w-full h-full object-cover"
                    />

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={() => {
                        deleteImageFromFirebase(imageDownloadUrl);
                      }}
                    >
                      <MdDelete />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <motion.div onClick ={submitNewData} className='text-center py-2 bg-red-300 rounded-md w-9/12 hover:bg-red-500 cursor-pointer'>
                    Save
        </motion.div>
      </div>
    </div>
  );
}



export const InputValueField = ({type,placeholder,stateValue,stateFunc})=>{
  return (
  <>
    <input
      type={type}
      placeholder={placeholder}
      className='w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-x-red-400 '
      value={stateValue}
      onChange={(e)=>stateFunc(e.target.value)}
    />
  </>
)
}
export default DBNewItem