// src/features/calendar/index.js
import { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { openRightDrawer } from '../common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../../utils/globalConstantUtil';
import { showNotification } from '../common/headerSlice';
import CalendarView from '../../components/CalendarView';
import AddEventModal from '../../components/CalendarView/AddEventModal';

function Calendar() {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]); // State to store fetched events
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
  const [selectedDate, setSelectedDate] = useState(moment()); // State to store the selected date for adding an event

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch('http://localhost:3000/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch events');

        const events = await response.json();
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Handle opening the modal and setting the selected date
  const addNewEvent = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // Handle adding a new event
  const handleAddEvent = async (eventDetails) => {
    try {
      const newEventObj = {
        id: Math.floor(Math.random() * 1000000),
        title: eventDetails.title,
        theme: eventDetails.theme,
        date: eventDetails.date,
      };

      console.log('Adding event:', newEventObj);
      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newEventObj),
      });

      if (!response.ok) throw new Error('Failed to create event');

      const createdEvent = await response.json();
      setEvents((prevEvents) => [...prevEvents, createdEvent]);
      dispatch(showNotification({ message: "New Event Added!", status: 1 }));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  // Handle opening the day detail
  const openDayDetail = ({ filteredEvents, title }) => {
    dispatch(openRightDrawer({
      header: title,
      bodyType: RIGHT_DRAWER_TYPES.CALENDAR_EVENTS,
      extraObject: { filteredEvents },
    }));
  };

  return (
    <>
      <CalendarView
        calendarEvents={events}
        addNewEvent={addNewEvent}
        openDayDetail={openDayDetail}
      />
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddEvent={handleAddEvent}
        initialDate={selectedDate}
      />
    </>
  );
}

export default Calendar;
