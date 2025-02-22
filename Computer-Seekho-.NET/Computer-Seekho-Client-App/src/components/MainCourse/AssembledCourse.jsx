import React from 'react'
import MainCourse from './MainCourse'

import StaffDetails from '../Staff/StaffDetails.jsx'
import Footer from '../Footer/Footer.jsx'
import Navbar from '../Navbar/Navbar.jsx'

const AssembledCourse = () => {
  return (
    <div>
      <Navbar/>
      <MainCourse/>
      <StaffDetails/>
      <Footer/>
    </div>
  )
}

export default AssembledCourse
