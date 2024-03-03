import React from 'react'
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import Topic from "../pages/Topic"
import SubTopic from "../pages/SubTopic"
function Home() {
  return (
    <>
    <Header />
    <Topic />
    <SubTopic />
    <Footer />
    </>
  )
}

export default Home