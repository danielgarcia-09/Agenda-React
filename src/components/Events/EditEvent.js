import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import EventContext from "../../context/events/EventContext";
import Layout from "../ui/Layout";

const formStyles = {
  width: "50%",
  margin: "5rem auto",
};

const EditEvent = () => {
    
  const authContext = useContext(AuthContext);
  const { authenticated, user } = authContext;

  const eventContext = useContext(EventContext);
  const { events, editEvent } = eventContext;

  let params = useParams();

  const eventToEdit = events.find(e => e.id === parseInt(params.id));

  let navigate = useNavigate();
  
  useEffect(()=> {
      if(!authenticated) return navigate('/');
  }, [authenticated])

  const [event, setEvent] = useState({
    id : eventToEdit.id,
    deleted : eventToEdit.deleted,
    name: eventToEdit.name,
    startDate: eventToEdit.startDate,
    endDate: eventToEdit.endDate,
    userId: user ? user.id : null,
  });

  const {name, startDate, endDate} = event;

  const handleChange = (e) => {
    setEvent({
      ...event,
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

    setEvent({
      ...event,
      startDate : dates.start.toISOString(),
      endDate : dates.end.toISOString()
    })

    editEvent(event);
    navigate('/events');
  };

  return (
    <Layout>
      <form style={formStyles} onSubmit={handleSubmit}>
        <h1 className="text-center">Edit Event</h1>

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
            Edit Event
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default EditEvent;
