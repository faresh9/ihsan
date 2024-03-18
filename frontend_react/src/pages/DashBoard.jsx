import React from 'react'
import Chart from "../components/Chart"
import EventCalendar from "../components/Calendar component/EventCalendar"
import AnalogClock from '../components/Clock'
import Notes from '../components/Notes component/Notes'
import '../../styles/dashboard.css'

function DashBoard() {
  return (
    <div>
       <AnalogClock/>
       {/* <Chart/> */}
       <Notes/>
       <EventCalendar/>
       
   
        
    </div>
  )
}

export default DashBoard