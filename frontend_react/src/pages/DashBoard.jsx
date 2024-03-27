import Header from "../components/common/Header"
import EventCalendar from "../components/Calendar component/EventCalendar"
import AnalogClock from '../components/Clock'
import Notes from '../components/Notes component/Notes'
import '../../styles/dashboard.css'
import HabitTracker from '../components/habit tracker component/HabitTracker'
function DashBoard() {
  return (
    <div>
<Header/>
       <AnalogClock/>
       {/* <Chart/> */}
       <Notes/>
       <EventCalendar/>
       <div className="flex justify-center items-center h-screen bg-gray-900">
      <HabitTracker />
    </div>
   
        
    </div>
  )
}

export default DashBoard