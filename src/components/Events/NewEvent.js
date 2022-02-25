import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import EventContext from "../../context/events/EventContext";
import Layout from "../ui/Layout";

const formStyles = {
  width: "50%",
  margin: "5rem auto",
};

const NewEvent = () => {
    
  const authContext = useContext(AuthContext);
  const { authenticated, user } = authContext;

  const eventContext = useContext(EventContext);
  const { addEvent } = eventContext;

  let navigate = useNavigate();
  
  useEffect(()=> {
      if(!authenticated) return navigate('/');
  }, [authenticated])

  const [newEvent, setNewEvent] = useState({
    name: "",
    startDate: '',
    endDate: '',
    userId: user ? user.id : null,
  });

  const {name,startDate,endDate} = newEvent;

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  const checkDates = (startDate, endDate) => {
    
    let now = new Date(),
        start = new Date(startDate),
        end = new Date(endDate);

    if(start < now || end < now || start > end || +start === +end ) {
      console.log('error');
      return null;
    }

    return {start, end};
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let dates = checkDates(startDate, endDate);
    if( dates === null) {
      return;
    }

    setNewEvent({
      ...newEvent,
      startDate : dates.start.toISOString(),
      endDate : dates.end.toISOString()
    })

    addEvent(newEvent);
    navigate('/events');
  };

  return (
    <Layout>
      <form style={formStyles} onSubmit={handleSubmit}>
        <h1 className="text-center">New Event</h1>

        <div className="form-group my-4">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="name"
            aria-describedby="nameHelp"
            placeholder="Enter Name"
            required
          />
        </div>

        <div className="form-group my-4">
          <label htmlFor="startDate">Start Date</label>
          <input
            value={startDate}
            onChange={handleChange}
            type="datetime-local"
            className="form-control"
            name="startDate"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="endDate">End Date</label>
          <input
            value={endDate}
            onChange={handleChange}
            type="datetime-local"
            className="form-control"
            name="endDate"
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="mt-4 btn btn-lg btn-primary">
            Create Event
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default NewEvent;
