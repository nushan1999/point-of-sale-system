import axios from "axios";
import { useState } from "react";
import { useAuth } from "./utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:8080/auth/login", data)
      .then(function (response) {
        login(response.data);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <p className="badge text-bg-primary text-wrap w-100 p-3 fs-1">
                POS System
              </p>
            </div>
            <div className="card-body">
              <p className="fs-2 text-center">Login</p>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fs-4" htmlFor="username">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fs-4" htmlFor="password">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Login
                  </button>
                </div>
              </form>
              <div className="mt-3 text-center">
                New User?{" "}
                <Link to="/users" className="btn btn-link">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
