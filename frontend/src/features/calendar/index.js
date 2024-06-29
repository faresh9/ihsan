// src/features/calendar/index.js
import { useState, useEffect } from 'react';
import CalendarView from '../../components/CalendarView';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { openRightDrawer } from '../common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../../utils/globalConstantUtil';
import { showNotification } from '../common/headerSlice';
import AddEventModal from '../../components/CalendarView/AddEventModal';

function Calendar() {
  const dispatch = useDispatch();

  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [eventToEdit, setEventToEdit] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('https://ihsan-backend-smoky.vercel.app/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const events = await response.json();
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const addNewEvent = (date) => {
    setSelectedDate(date);
    setEventToEdit(null); // Clear any event being edited
    setIsModalOpen(true);
  };

  const handleAddEvent = async (eventDetails) => {
    try {
      const newEventObj = {
        id: Math.floor(Math.random() * 1000000),
        title: eventDetails.title,
        theme: eventDetails.theme,
        date: eventDetails.date,
      };

      const response = await fetch('https://ihsan-backend-smoky.vercel.app/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newEventObj),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const createdEvent = await response.json();
      setEvents((prevEvents) => [...prevEvents, createdEvent]);
      dispatch(showNotification({ message: "New Event Added!", status: 1 }));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`https://ihsan-backend-smoky.vercel.app/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId));
      dispatch(showNotification({ message: "Event Deleted!", status: 1 }));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

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
        onDeleteEvent={handleDeleteEvent} // Pass delete handler to CalendarView
      />
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddEvent={handleAddEvent}
        initialDate={selectedDate}
        eventToEdit={eventToEdit}
      />
    </>
  );
}

export default Calendar;
