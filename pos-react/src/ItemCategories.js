import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./utils/AuthContext";

function ItemCategories() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [itemCategories, setItemCategories] = useState(null);
  const [name, setName] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:8080/itemCategories", config)
        .then(function (response) {
          setItemCategories(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [isAuthenticated]);

  function handleName(event) {
    setName(event.target.value);
  }

  function getItemCategories() {
    axios
      .get("http://localhost:8080/itemCategories", config)
      .then(function (response) {
        setItemCategories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function addItemCategory(event) {
    event.preventDefault();

    const data = {
      name: name
    };

    axios
      .post("http://localhost:8080/itemCategories", data, config)
      .then(function (response) {
        getItemCategories();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Item Categories</h1>

          {itemCategories && itemCategories.map((itemCategory) => (
            <div className="card mb-3" key={itemCategory.id}>
              <div className="card-body">
                <h5 className="card-title">{itemCategory.name}</h5>
              </div>
            </div>
          ))}

          <div className="card mt-4">
            <div className="card-body">
              <h2 className="card-title">Add Item Category</h2>

              <form onSubmit={addItemCategory}>
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleName}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success">
                  Add Item Category
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCategories;
