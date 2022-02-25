import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const formStyles = {
  width: "60%",
  margin: "5rem auto",
};

const Login = () => {
  
  const authContext = useContext(AuthContext);

  const { authenticated, logIn, getUserAuthenticated } = authContext;

  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const { email, password } = user;
  
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

    if (email.trim() === "" || password.trim() === "") {
      return;
    }

    logIn({ email, password });
    navigate("/events");
  };

  return (
    <form 
      className="shadow-lg p-5 mb-5 bg-body rounded"
      style={formStyles} 
      onSubmit={handleSubmit}
    >
      <h1 className="text-center">Login</h1>
      <div className="form-group my-4">
        <label htmlFor="email" className="fw-bold">Email address</label>
        <input
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
          onChange={handleChange}
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <span>
        <Link to={"new-user"}>Create a new account</Link>
      </span>

      <div className="d-grid">
        <button type="submit" className="mt-4 btn btn-lg btn-primary">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
