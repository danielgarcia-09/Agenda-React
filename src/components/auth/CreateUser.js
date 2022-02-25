import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import Layout from "../ui/Layout";

const formStyles = {
  width: "50%",
  margin: "5rem auto",
};

const CreateUser = () => {
  const authContext = useContext(AuthContext);

  const { authenticated, createUser } = authContext;

  const [user, setUser] = useState({
    deleted: false,
    name: "",
    lastName: "",
    email: "",
    password: "",
    chkPassword: "",
  });

  const { name, lastName, chkPassword, email, password } = user;

  let navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/events");
    }
  }, [authenticated, navigate]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return;
    }

    if (chkPassword !== password) {
      return;
    }

    delete user.chkPassword;
    console.log(user);

    createUser(user);
    navigate("/events");
  };

  return (
    <Layout>
      <form
        className="shadow-lg p-5 mb-5 bg-body rounded" 
        style={formStyles}
        onSubmit={handleSubmit}>
        <h1 className="text-center">Create User</h1>

        <div className="form-group my-4">
          <label htmlFor="name" className="fw-bold">Name </label>
          <input
            value={name}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter name"
            required
          />
        </div>

        <div className="form-group my-4">
          <label htmlFor="lastName" className="fw-bold">Last Name </label>
          <input
            value={lastName}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="lastName"
            placeholder="Enter Last Name"
            required
          />
        </div>

        <div className="form-group my-4">
          <label htmlFor="email" className="fw-bold">Email address</label>
          <input
            value={email}
            onChange={handleChange}
            type="email"
            className="form-control"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="fw-bold">Password</label>
          <input
            value={password}
            onChange={handleChange}
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="chkPassword" className="fw-bold">Check Password</label>
          <input
            value={chkPassword}
            onChange={handleChange}
            type="password"
            className="form-control"
            name="chkPassword"
            placeholder="Check your Password"
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="mt-4 btn btn-lg btn-primary">
            Create Account
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default CreateUser;
