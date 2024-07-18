import { Link } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";

function Home() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center">
            <p className="badge text-bg-primary text-wrap w-100 p-3 fs-1">
              POS System
            </p>
            <h1>Home</h1>
            <p>Welcome to the home page</p>

            <div className="list-group mb-3">
              <Link to="/items" className="list-group-item list-group-item-action">
                Items
              </Link>
              <Link to="/itemCategories" className="list-group-item list-group-item-action">
                Item Categories
              </Link>
              <Link to="/stocks" className="list-group-item list-group-item-action">
                Stocks
              </Link>
            </div>

            {isAuthenticated && (
              <button className="btn btn-primary" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
