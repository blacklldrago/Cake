import React from 'react'
import RecipeReviewCard from '../../components/news/News'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay} from "swiper";
const Home = () => {
  return (
    <div className='Home'>
      <div className='flex justify-evenly pt-[100px] pl-[100px]'>

          <>
      <Swiper 
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        loop = {true}
        className="mySwiper"
      >
        <SwiperSlide><RecipeReviewCard img = "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/4/5/1/IG1C17_30946_s4x3.jpg.rend.hgtvcom.406.406.suffix/1433541424559.jpeg" text1="Shrimp and Chorizo Paella"
      text2="September 14, 2016"
      text3="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      text4="Method:"
      text5="Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes."/>
        </SwiperSlide>
        <SwiperSlide><RecipeReviewCard img = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Pound_layer_cake.jpg/800px-Pound_layer_cake.jpg" text1="Shrimp and Chorizo Paella"
      text2="September 14, 2016"
      text3="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      text4="Method:"
      text5="Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes."/>
        </SwiperSlide>
        <SwiperSlide><RecipeReviewCard img = "https://livforcake.com/wp-content/uploads/2017/07/black-forest-cake-thumb.jpg" text1="Shrimp and Chorizo Paella"
      text2="September 14, 2016"
      text3="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      text4="Method:"
      text5="Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes."/>
        </SwiperSlide>
        <SwiperSlide><RecipeReviewCard img = "https://www.fnp.com/images/pr/x/v20221205202014/blackforest-cake-1kg_1.jpg" text1="Shrimp and Chorizo Paella"
      text2="September 14, 2016"
      text3="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      text4="Method:"
      text5="Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes."/>
        </SwiperSlide>
        <SwiperSlide><RecipeReviewCard img = "https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg" text1="Shrimp and Chorizo Paella"
      text2="September 14, 2016"
      text3="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      text4="Method:"
      text5="Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes."/>
        </SwiperSlide>
        <SwiperSlide><RecipeReviewCard img = "https://www.allrecipes.com/thmb/BY8CcWT0JZOjFcWeIem9Fik1x78=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9266919-c023924050f9406bab6eccea1664e88b.jpg" text1="Shrimp and Chorizo Paella"
      text2="September 14, 2016"
      text3="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      text4="Method:"
      text5="Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes."/>
        </SwiperSlide>
        <SwiperSlide><RecipeReviewCard img = "https://img.taste.com.au/9isesBer/taste/2016/11/caramello-cake-105070-1.jpeg" text1="Shrimp and Chorizo Paella"
      text2="September 14, 2016"
      text3="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      text4="Method:"
      text5="Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes."/>
        </SwiperSlide>
      </Swiper>
    </>
      
      </div>
    </div>
  )
}

export default Home