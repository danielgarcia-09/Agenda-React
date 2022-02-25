import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import tokenAuth from "./config/token";
import AuthState from "./context/auth/AuthState";
import reportWebVitals from "./reportWebVitals";
import Events from "./components/Events/Events";
import EventState from "./context/events/EventState";
import NewEvent from "./components/Events/NewEvent";
import EditEvent from "./components/Events/EditEvent";
import CreateUser from "./components/auth/CreateUser";

const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

ReactDOM.render(
  <React.StrictMode>
    <EventState>
      <AuthState>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App />} />
            <Route exact path="/" element={<App />} />
            <Route exact path="/new-user" element={<CreateUser />} />
            <Route exact path="/events" element={<Events />} />
            <Route exact path="/events/new" element={<NewEvent />} />
            <Route exact path="/events/:id" element={<EditEvent />} />
          </Routes>
        </BrowserRouter>
      </AuthState>
    </EventState>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
