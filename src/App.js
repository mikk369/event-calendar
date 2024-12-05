import React, { useState } from 'react';
import Modal from 'react-modal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './App.css';

const CalendarApp = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);
  
    const events = [
    { title: 'Event 1', date: '2024-12-10', location: 'Location', description: 'description'},
    { title: 'Event 2', date: '2024-12-11', location: 'Location', description: 'description'},
    { title: 'Event 3', date: '2024-12-15', location: 'Location', description: 'description'},
    { title: 'Event 4', date: '2024-12-19', location: 'Location', description: 'description'},
    { title: 'Event 5', date: '2024-12-30', location: 'Location', description: 'description'},
    ];
  
    const months = [
      'Jaanuar', 'Veebruar', 'Märts', 'Aprill',
      'Mai', 'Juuni', 'Juuli', 'August',
      'September', 'Oktoober', 'November', 'Detsember',
    ];
  
    const openModal = (monthIndex) => {
      setSelectedMonth(monthIndex);
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      setSelectedMonth(null);
    };

    // Function to handle showing event information
    const showEventInfo = (events) => {
    };

    // Function to handle hiding event information
    const hideEventInfo = () => {
    };
  
    return (
        <div id='agility-calendar-wrapper'>
          <h1 className='calendar-title'>Võistluste kalender</h1>
          <div className="calendar-container">
            {months.map((month, index) => (
              <div key={index} className="month-box" onClick={() => openModal(index)}>
                <h3 className="month-title">{month}</h3>
                <div className="month-grid">
                  {/* Add Day Headers */}
                  {['E', 'T', 'K', 'N', 'R', 'L', 'P'].map((day, i) => (
                    <div key={i} className="day-header">
                      {day}
                    </div>
                  ))}
                  {/* Add Days of the Month */}
                  {Array.from({ length: 35 }).map((_, i) => {
                    const currentYear = new Date().getFullYear();
                    const date = new Date(currentYear, index, i + 1); // Adjust for the correct month and day
                    const isCurrentMonth = date.getMonth() === index;

                    // Filter events for the current day
                    const dayEvents = events.filter(
                      (event) =>
                        new Date(event.date).getFullYear() === currentYear &&
                        new Date(event.date).getMonth() === index &&
                        new Date(event.date).getDate() === i + 1
                    );

                    return (
                      <div
                        key={i}
                        className={`day-box ${isCurrentMonth ? '' : 'inactive'} ${
                           dayEvents.length ? 'booked' : ''}`}
                           onMouseEnter={() => showEventInfo(dayEvents)}
                           onMouseLeave={hideEventInfo}>
                        {isCurrentMonth ? i + 1 : ''} {/* Show day number */}
                        {/* {SHOW EVENT TOOLTIP} */}
                        {dayEvents.length > 0 && (
                          <div className='event-tooltip'>
                            {dayEvents.map((event, index) => (
                              <div key={index} className='event-info'>
                                <strong>{event.title}</strong>
                                <p>{event.description}</p>
                                <small>{event.location}</small>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {/* Modal for detailed monthly view */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Month Details"
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            <div className='modal-header'>
              <button className='modal-close-button' onClick={closeModal}>Close</button>
            </div>
            {selectedMonth !== null && (
               <div className="fullcalendar-container">
               <FullCalendar
                 locale="et"
                 firstDay={1}
                 plugins={[dayGridPlugin]}
                 initialView="dayGridMonth"
                 initialDate={`2024-${String(selectedMonth + 1).padStart(2, '0')}-01`}
                 events={events.filter(
                   (event) => new Date(event.date).getMonth() === selectedMonth
                 )}
                 headerToolbar={{
                  left: '', // Removes navigation buttons (Prev/Next)
                  center: 'title', // Only show the title (e.g., "December 2024")
                  right: '', // Removes the "Today" button and other options
                }}
                dayHeaderContent={(arg) => {
                  const dayLetters = ['E', 'T', 'K', 'N', 'R', 'L', 'P']; 
                  return dayLetters[arg.date.getDay() === 0 ? 6 : arg.date.getDay() - 1];
                }}
               />
             </div>
            )}
          </Modal>
        </div>
      );
  };

  export default CalendarApp;

// document.addEventListener('DOMContentLoaded', () => {
//     const container = document.getElementById('my-calendar');
//     if (container) {
//         ReactDOM.render(<CalendarApp />, container);
//     }
// });
