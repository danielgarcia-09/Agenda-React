import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import EventContext from "../../context/events/EventContext";
import Layout from "../ui/Layout";
import EventCard from "./EventCard";

const Events = () => {
  const authContext = useContext(AuthContext);

  const eventContext = useContext(EventContext);

  const { authenticated, getUserAuthenticated } = authContext;

  const { events, getEvents } = eventContext;

  let navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) return navigate("/");
    getUserAuthenticated();

    getEvents();
  }, [authenticated]);

  return (
    <Layout>
      <h1 className="text-center">
        Events 
        <Link className="ms-3 text-decoration-none" to={"new"}>+</Link>
      </h1>

      <section style={{width: "50%"}} className="my-4 mx-auto row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
        {events &&
          events.map((e) => (
            <div key={e.id} className="col">
              <EventCard event={e} />
            </div>
          ))}
      </section>
    </Layout>
  );
};

export default Events;
