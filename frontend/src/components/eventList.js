import React, { useState, useEffect } from 'react';

function EventList() {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [organizations, setOrganizations] = useState([]); // You need to fetch organizations
  const [students, setStudents] = useState([]); // You need to fetch students


  useEffect(() => {
    // Fetch event data from your backend API
    fetch('/api/event')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
      fetch('/api/org')
      .then((response) => response.json())
      .then((data) => {
        setOrganizations(data);
      })
      .catch((error) => {
        console.error('Error fetching organizations:', error);
      });
    fetch('/api/student')
        .then((response) => response.json())
        .then((data) => {
        setStudents(data);
    })
        .catch((error) => {
        console.error('Error fetching students:', error);
    });
  }, []);

  const handleEdit = async (eventId) => {
    // Fetch event data based on ID for editing
    try {
      const response = await fetch(`/api/event/${eventId}`);
      if (response.status === 200) {
        const eventData = await response.json();
        setEditEvent(eventData);
      } else {
        console.error('Error fetching event for editing:', response.status);
      }
    } catch (error) {
      console.error('Error fetching event for editing:', error);
    }
  };

  const handleUpdate = async () => {
    if (editEvent) {
      try {
        const response = await fetch(`/api/event/${editEvent._id}`, {
          method: 'PATCH', // Use PUT or PATCH as appropriate
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editEvent),
        });

        if (response.status === 200) {
          // Update the local state with the edited event
          setEvents((prevState) =>
            prevState.map((event) =>
              event._id === editEvent._id ? editEvent : event
            )
          );
          // Clear the editEvent state
          setEditEvent(null);
        } else {
          console.error('Error updating event:', response.status);
        }
      } catch (error) {
        console.error('Error updating event:', error);
      }
    }
  };

  const handleDelete = async (eventId) => {
    console.log(`Delete event with ID: ${eventId}`);
    try {
      const response = await fetch(`/api/event/${eventId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        // Event was successfully deleted
        // You can also remove the event from the local state
        setEvents(events.filter((event) => event._id !== eventId));
      } else {
        const data = await response.json();
        console.error('Error deleting event:', data.error);
        // Handle the error or display an error message
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      // Handle network or other errors
    }
  };

  return (
    <div className="table-container">
      <h2>List of Events</h2>
      <table className="event-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Organization</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Facilitator</th>
            <th>Description</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.name}</td>
              <td>{event.org.name}</td>
              <td>{new Date(event.time_start).toLocaleString()}</td>
              <td>{new Date(event.time_end).toLocaleString()}</td>
              <td>{event.facilitator.first_name + ' ' + event.facilitator.last_name}</td>
              <td>{event.description}</td>
              <td>{event.location}</td>
              <td>
                <button onClick={() => handleEdit(event._id)}>Edit</button>
                <button onClick={() => handleDelete(event._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Event Form */}
      {editEvent && (
        <div className="edit-event-form">
          <h2>Edit Event</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              value={editEvent.name}
              onChange={(e) =>
                setEditEvent({ ...editEvent, name: e.target.value })
              }
              placeholder="Event Name"
              className="input-field"
            />
            <select
              name="org"
              value={editEvent.org}
              onChange={(e) =>
                setEditEvent({ ...editEvent, org: e.target.value })
              }
              className="select-field"
            >
              <option value="">Select an Organization</option>
              {organizations.map((org) => (
                <option key={org._id} value={org._id}>
                  {org.name}
                </option>
              ))}
            </select>
            <input
              type="datetime-local"
              name="time_start"
              value={editEvent.time_start}
              onChange={(e) =>
                setEditEvent({ ...editEvent, time_start: e.target.value })
              }
              className="input-field"
            />
            <input
              type="datetime-local"
              name="time_end"
              value={editEvent.time_end}
              onChange={(e) =>
                setEditEvent({ ...editEvent, time_end: e.target.value })
              }
              className="input-field"
            />
            <select
              name="facilitator"
              value={editEvent.facilitator}
              onChange={(e) =>
                setEditEvent({ ...editEvent, facilitator: e.target.value })
              }
              className="select-field"
            >
              <option value="">Select a Facilitator</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.first_name + ' ' + student.last_name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="description"
              value={editEvent.description}
              onChange={(e) =>
                setEditEvent({ ...editEvent, description: e.target.value })
              }
              placeholder="Event Description"
              className="input-field"
            />
            <input
              type="text"
              name="location"
              value={editEvent.location}
              onChange={(e) =>
                setEditEvent({ ...editEvent, location: e.target.value })
              }
              placeholder="Event Location"
              className="input-field"
            />
            <button type="submit" className="submit-button">
              Update Event
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EventList;
