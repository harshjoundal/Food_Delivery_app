import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import "../assets/css/swiperStyles.css"
import "swiper/css/bundle"
import { useSelector } from 'react-redux'
import SliderCard from './SliderCard'

const Slider = () => {
    const products = useSelector((state)=>state.products)
    const [fruits,setFruits] = useState(null);
    console.log(products,"<<<<<<<<<<<<<<<<<<<");

    useEffect(() => {
      setFruits(products?.filter((data) => data.product_category === "fruits"));
    }, [products]);


  return (
    <div className="w-full pt-24">
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        modules={[]}
        className="mySwiper"
      >
       {fruits && fruits.map((data,i)=>(
        <SwiperSlide key={i}>
            <SliderCard key={i} data={data} index={i}/>
        </SwiperSlide>
       ))}
      </Swiper>
    </div>
  );
}

export default Slider