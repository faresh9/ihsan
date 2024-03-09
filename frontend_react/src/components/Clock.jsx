import React from 'react'
import Clock from 'react-simple-clock'
function AnalogClock() {
  return (
    <>
    <Clock live={true} hourMarkFormat="roman" className="border-8 bg-black" mode="dark"/>
{/* <div className = "underline decoration-sky-500 text-sky-400/100">clock</div> */}
</>
  )
}

export default AnalogClock