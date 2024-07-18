import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from './utils/AuthContext';

function Items() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [items, setItems] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [edit, setEdit] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }

  function getItems() {
    axios.get("http://localhost:8080/items", config)
      .then(function (response) {
        setItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    if (isAuthenticated) {
      axios.get("http://localhost:8080/items", config)
        .then(function (response) {
          setItems(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios.get("http://localhost:8080/itemCategories", config)
        .then(function (response) {
          setCategories(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [isAuthenticated]);

  function handleName(event) {
    setName(event.target.value);
  }

  function handlePrice(event) {
    setPrice(parseFloat(event.target.value));
  }

  function handleDescription(event) {
    setDescription(event.target.value);
  }

  function handleCategory(event) {
    setCategoryId(parseInt(event.target.value));
  }

  function createItem(event) {
    event.preventDefault();

    const data = {
      name: name,
      price: price,
      description: description,
      categoryId: categoryId
    }

    axios.post("http://localhost:8080/items", data, config)
      .then(function (response) {
        getItems();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  function updateItem(event) {
    event.preventDefault();

    const data = {
      name: name,
      price: price,
      description: description,
      categoryId: categoryId,
      stockId: 1
    }

    axios.put("http://localhost:8080/items/" + edit, data, config)
      .then(function (response) {
        getItems();
        setEdit(null);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Items</h1>

          {items && items.map((row) => (
            <div className="card mb-3" key={row.id}>
              <div className="card-body">
                <h5 className="card-title">{row.name}</h5>
                <p className="card-text">Price: Rs. {row.price}</p>
                <p className="card-text">Description: {row.description}</p>
                <p className="card-text">Category: {row.category?.name}</p>

                <button type="button" className="btn btn-primary me-2" onClick={() => {
                  setEdit(row.id);
                  setItemId(row.id);
                  setName(row.name);
                  setPrice(row.price);
                  setDescription(row.description);
                  setCategoryId(row.category ? row.category.id : null);
                }}>Edit</button>

                <button type="button" className="btn btn-danger" onClick={() => {
                  axios.delete("http://localhost:8080/items/" + row.id, config)
                    .then(function () {
                      getItems();
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                }}>Delete</button>
              </div>
            </div>
          ))}

          {!edit && (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Create Item</h2>

                <form onSubmit={createItem}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={handleName} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" step="0.01" className="form-control" onChange={handlePrice} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={handleDescription} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" onChange={handleCategory} required>
                      <option value="">Select a category</option>
                      {categories && categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-success">Create Item</button>
                </form>
              </div>
            </div>
          )}

          {edit && (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Edit Item</h2>

                <form onSubmit={updateItem}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={handleName} value={name} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" step="0.01" className="form-control" onChange={handlePrice} value={price} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={handleDescription} value={description} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" onChange={handleCategory} required>
                      <option value="">Select a category</option>
                      {categories && categories.map((category) => (
                        <option key={category.id} value={category.id} selected={category.id === categoryId}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary">Edit Item</button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={() => setEdit(null)}>Cancel</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Items;
