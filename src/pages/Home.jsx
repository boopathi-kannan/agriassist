import React from 'react'
import MainBanner from '../components/MainBanner'
import FarmPlanner from '../components/FarmerTimeline'
import Chatbot from '../components/Chatbox'

import Cart from './Cart'
import Categories from '../components/Categories'


const Home = () => {
  return (
    <div>
      <MainBanner/>
      <Categories/>
      <FarmPlanner/>
      <Chatbot/>
    </div>
  )
}

export default Home