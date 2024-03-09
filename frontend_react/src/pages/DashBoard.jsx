import React from 'react'
import Chart from "../components/Chart"
import EventCalendar from "../components/Calendar component/EventCalendar"
import AnalogClock from '../components/Clock'

function DashBoard() {
  return (
    <div>
       <AnalogClock/>
       {/* <Chart/> */}
       <EventCalendar/>
   
        
    </div>
  )
}

export default DashBoard