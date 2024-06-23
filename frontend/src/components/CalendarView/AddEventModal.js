// src/components/CalendarView/AddEventModal.js
import React, { useState, useEffect } from 'react';
import moment from 'moment';

function AddEventModal({ isOpen, onClose, onAddEvent, initialDate }) {
  const [eventDetails, setEventDetails] = useState({ title: '', theme: '', date: '' });

  useEffect(() => {
    if (initialDate) {
      setEventDetails(prevDetails => ({
        ...prevDetails,
        date: moment(initialDate).format('YYYY-MM-DD') // Format date to match input type="date"
      }));
    }
  }, [initialDate]);

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAddEvent(eventDetails);
    setEventDetails({ title: '', theme: '', date: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-box bg-base-100 rounded shadow-lg w-96">
        <div className="px-4 py-2">
          <h2 className="text-xl font-semibold">Add New Event</h2>
        </div>
        <div className="p-4">
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={eventDetails.title}
            onChange={handleChange}
            className="input input-bordered w-full mb-2"
          />
          <select
            name="theme"
            value={eventDetails.theme}
            onChange={handleChange}
            className="select select-bordered w-full mb-2"
          >
            <option disabled value="">Select theme</option>
            <option value="BLUE">BLUE</option>
            <option value="GREEN">GREEN</option>
            <option value="PURPLE">PURPLE</option>
            <option value="ORANGE">ORANGE</option>
            <option value="PINK">PINK</option>
          </select>
          <input
            name="date"
            type="date"
            value={eventDetails.date}
            onChange={handleChange}
            className="input input-bordered w-full mb-2"
          />
        </div>
        <div className="px-4 py-2 flex justify-end">
          <button onClick={handleSubmit} className="btn btn-primary mr-2">
            Add
          </button>
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEventModal;
