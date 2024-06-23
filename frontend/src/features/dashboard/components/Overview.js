// frontend_new/src/features/dashboard/components/Overview.js
import React, { useState, useEffect } from 'react';
import PrayerTime from './PrayerTime';

const Overview = ({ tasks, habits }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCurrentDay = () => {
    return currentTime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  };

  const currentDayHabits = habits.filter(habit => habit.day.toLowerCase() === getCurrentDay());

  return (
    <div className="flex flex-col gap-4 bg-base-100 p-6 rounded-lg shadow-md w-full">
      {/* Current Time and Date */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold bg-base-100">
            {formatDate(currentTime)}
          </h2>
          <p className="text-lg bg-base-100">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <PrayerTime fajr="5:00 AM" dhuhr="1:00 PM" asr="5:00 PM" maghrib="8:00 PM" isha="10:00 PM" />
      </div>

      {/* Daily Tasks Summary */}
      <div className="bg-base-200 p-4 rounded-lg">
        <h3 className="text-xl font-semibold bg-base-100 mb-2">Today's Tasks</h3>
        {tasks.length === 0 ? (
          <p className="bg-base-200">No tasks for today.</p>
        ) : (
          <ul className="list-disc list-inside">
            {tasks.map((task, index) => (
              <li key={index} className="bg-base-200">{task.name}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Habit Progress for Current Day */}
      <div className="bg-base-200 p-4 rounded-lg">
        <h3 className="text-xl font-semibold bg-base-100 mb-2">Today's Habits</h3>
        {currentDayHabits.length === 0 ? (
          <p className="text-gray-600">No habits tracked today.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {currentDayHabits.map((habit) => (
              <div key={habit.id} className="flex flex-col mb-4">
                {/* <h4 className="font-semibold">{habit.day}</h4> */}
                <ul className="list-disc list-inside">
                  {habit.tasks.map((task, index) => (
                    <li key={index} className="bg-base-200">{task}</li>
                  ))}
                </ul>
                <p className="text-sm mt-1">
                  {habit.progress} of {habit.tasks.length} completed
                </p>
                <progress className="progress progress-primary w-full" value={habit.progress} max={habit.tasks.length}></progress>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
