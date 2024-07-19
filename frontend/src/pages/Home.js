import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalProductCard from '../components/HorizontalProductCard'
import VerticalProductCard from '../components/VerticalProductCard'

const Home = () => {
  return (
    <div >
      <CategoryList />
      <BannerProduct/>

      
      {/* //Horzontal card for airpodes */}
      <HorizontalProductCard category={"airpodes"} heading={"Top Airpodes's"}/>
      {/* //Horzontal card for Watches */}
      <HorizontalProductCard category={"watches"} heading={"Popular Watches"}/>
      {/* //Horzontal card for Earphones */}
      <HorizontalProductCard category={"earphones"} heading={"Best Selling Earphones"}/>
      {/* //Vertical card for Mobiles */}
      <VerticalProductCard category={"mobiles"} heading={"Trending Phones"}/>
      {/* //Vertical card for Mouse */}
      <VerticalProductCard category={"mouse"} heading={"Top Deals on Mouse"}/>
      {/* //Vertical card for Television */}
      <VerticalProductCard category={"television"} heading={"Best Deals on Television"}/>
      {/* //Vertical card for Camera */}
      <VerticalProductCard category={"camera"} heading={"Camera & Accessories"}/>
      {/* //Vertical card for Speakers */}
      <VerticalProductCard category={"speakers"} heading={"Sound & Speakers"}/>
      {/* //Vertical card for refrigerator */}
      <VerticalProductCard category={"refrigerator"} heading={"Best Deals on Refregerator"}/>

      {/* //Horzontal card for trimmers */}
      <VerticalProductCard  category={"trimmers"} heading={"Best Trimmer's"}/>
      

    </div>
  )
}

export default Home
