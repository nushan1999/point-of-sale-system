import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./utils/AuthContext";

function Users() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [users, setUsers] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [edit, setEdit] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [inputPassword, setInputPassword] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleteUsername, setDeleteUsername] = useState("");


  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUsers();
    }
  }, [isAuthenticated]);

  function getUsers() {
    axios
      .get("http://localhost:8080/users", config)
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handleInputPassword(event) {
    setInputPassword(event.target.value);
  }

  function createUser(event) {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email
    };

    axios
      .post("http://localhost:8080/users", data, config)
      .then(function (response) {
        getUsers();
        setMessage("User created successfully!");
        setError("");
        resetForm();
        console.log(response);
      })
      .catch(function (error) {
        setError("Error creating user.");
        setMessage("");
        console.log(error);
      });
  }

  function updateUser(event) {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email
    };

    axios
      .put(`http://localhost:8080/users/${edit}?password=${inputPassword}`, data, config)
      .then(function (response) {
        getUsers();
        setEdit(null);
        setMessage("User updated successfully!");
        setError("");
        console.log(response);
      })
      .catch(function (error) {
        if (error.response && error.response.status === 403) {
          setError("Current password is incorrect.");
        } else {
          setError("Error updating user.");
        }
        setMessage("");
        console.log(error);
      });
  }

  function deleteUser(event) {
    event.preventDefault();
    axios
      .delete(`http://localhost:8080/users/${deleteId}?password=${inputPassword}`, config)
      .then(function () {
        getUsers();
        setMessage("User deleted successfully!");
        setError("");
        setInputPassword("");
        setDeleteId(null);
        setDeleteUsername("");
      })
      .catch(function (error) {
        if (error.response && error.response.status === 403) {
          setError("Current password is incorrect.");
        } else {
          setError("Error deleting user.");
        }
        setMessage("");
        console.log(error);
      });
  }

  function resetForm() {
    setUsername("");
    setPassword("");
    setEmail("");
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Users</h1>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {users &&
            users.map((row) => (
              <div className="card mb-3" key={row.id}>
                <div className="card-body">
                  <h5 className="card-title">{row.username}</h5>
                  <p className="card-text">Email: {row.email}</p>

                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={() => {
                      setEdit(row.id);
                      setUsername(row.username);
                      setEmail(row.email);
                      setDeleteId("");
                    }}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setDeleteId(row.id);
                      setDeleteUsername(row.username);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

        {deleteId && (
            <div className="card">
              <div className="card-body">
              <h2 className="card-title">Delete User: {deleteUsername}</h2>
                <form onSubmit={deleteUser}>
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handleInputPassword}
                      value={inputPassword}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-danger">
                    Confirm Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setDeleteId(null);
                      setInputPassword("");
                      setDeleteUsername("");
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}

          {!edit && !deleteId && (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Create User</h2>

                <form onSubmit={createUser}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleUsername}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handlePassword}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={handleEmail}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-success">
                    Create User
                  </button>
                </form>
              </div>
            </div>
          )}

          {edit && !deleteId && (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Edit User</h2>

                <form onSubmit={updateUser}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleUsername}
                      value={username}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handleInputPassword}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handlePassword}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={handleEmail}
                      value={email}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Update User
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setEdit(null);
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
