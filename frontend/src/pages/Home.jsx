import React from 'react'
import HomeSlider from '../components/HomeSlider'
import ExploreCategories from '../components/ExploreCategories'
import HomeProductSlider from '../components/HomeProductSlider'
import HomeBannerBlogSlider from '../components/HomeBannerBlogSlider'

const Home = () => {
  return (
    <>
      <HomeSlider/>
      <ExploreCategories/>
      <HomeProductSlider/>
      <HomeBannerBlogSlider/>
    </>
  )
}

export default Home