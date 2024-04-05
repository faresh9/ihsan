import React from 'react'
import Clock from 'react-simple-clock'
import '../../styles/clock.css'
function AnalogClock() {
  return (
    <div className='clock-container'>
      <Clock live={true} hourMarkFormat="roman" className="your-class" mode = 'dark'/>
      </div>
    

  )
}

export default AnalogClock