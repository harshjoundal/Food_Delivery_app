import React from 'react'
import {motion} from 'framer-motion'
import delivery from "../assets/img/delivery.png";
import herobg from "../assets/img/heroBg.png";
import { buttonClick, staggerFadeInOut } from '../animations';
import { randomData } from '../utils/styles';
import { useDispatch } from 'react-redux';
import { setCartOn } from '../context/actions/displayCartAction';

const Home = () => {
  const dispatch = useDispatch()
  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full">
          <p className="text-lf font-semibold text-orange-500">Free Delivery</p>
          <img src={delivery} alt="" className="w-10 h-10 object-contain " />
        </div>

        <p className="text-[40px] text-headingColor md:text-[72px] font-sans font-extrabold tracking-wider">
          The Fastest Delivery in{" "}
          <span className="text-orange-500">Your City</span>
        </p>

        <p className="text-textColor text-lg">
          {" "}
          Discover lightning-fast food delivery in our city! Our website is your
          go-to destination for the quickest food delivery service, ensuring
          your favorite dishes reach your doorstep in record time. With a wide
          selection of local restaurants and a streamlined ordering process, we
          prioritize speed and convenience. Say goodbye to hunger and hello to
          rapid, delicious deliveries with us!
        </p>

        <motion.button
          {...buttonClick}
          onClick={()=>{
            dispatch(setCartOn());
          }}
          className="bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold"
        >
          Order Now
        </motion.button>
      </div>
      <div className="py-2 flex-1 flex items-center justify-end relative">
        <img
          className="absolute top-0 right-0 md:-right-12 w-full h-420 md:w-auto md:h-650"
          src={herobg}
          alt=""
        />
        <div className="w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-14">
          {randomData &&
            randomData.map((data, i) => (
              <motion.div
                key={i}
                {...staggerFadeInOut(i)}
                className="w-32 h-36 md:h-auto md:w-190 p-4 bg-lightOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={data.imageURL}
                  className="w-12 h-12 md:w-32 md:h-32 md:-mt-16 object-contain"
                  alt=""
                />

                <p className="text-sm lg:text-xl font-semibold text-textColor">
                  {data.product_name.slice(0, 14)}
                </p>

                <p className="text-[12px] text-center md:text-base text-lighttextGray font-semibold capitalize">
                  {data.product_category}
                </p>

                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">Rs.</span>{" "}
                  {data.product_price}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Home