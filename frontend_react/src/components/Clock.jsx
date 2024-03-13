import React from 'react'
import Clock from 'react-simple-clock'
import '../../styles/clock.css'
function AnalogClock() {
  return (
    <>
    <Clock live={true} hourMarkFormat="roman" className="your-class"/>
{/* <div className = "underline decoration-sky-500 text-sky-400/100">clock</div> */}
</>
  )
}

export default AnalogClock