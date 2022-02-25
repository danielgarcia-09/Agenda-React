import { useContext } from "react";
import { Link } from "react-router-dom";
import EventContext from "../../context/events/EventContext";

const EventCard = ({ event }) => {

  const eventContext = useContext(EventContext);

  const { deleteEvent } = eventContext;

  const { id, name, startDate, endDate } = event;

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          <span>Start Date: {new Date(startDate).toLocaleDateString() + " " + new Date(startDate).toLocaleTimeString()}  </span>
          <span>End Date: {new Date(endDate).toLocaleDateString() + " " + new Date(endDate).toLocaleTimeString()} </span>
        </p>
        <Link className="me-3" to={`${id}`}>Edit</Link>
        <Link to={"#"} onClick={()=> deleteEvent(id)}>
          Delete
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
