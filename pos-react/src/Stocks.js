import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./utils/AuthContext";

function Stocks() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [stocks, setStocks] = useState(null);
  const [stockId, setStockId] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [items, setItems] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [item, setItem] = useState(null);

  const [edit, setEdit] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:8080/stocks", config)
        .then(function (response) {
          setStocks(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get("http://localhost:8080/items", config)
        .then(function (response) {
          setItems(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [isAuthenticated]);

  function getStocks() {
    axios
      .get("http://localhost:8080/stocks", config)
      .then(function (response) {
        setStocks(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleQuantity(event) {
    setQuantity(parseFloat(event.target.value));
  }

  function handleItem(event) {
    setItemId(parseInt(event.target.value));
  }

  function addStock(event) {
    event.preventDefault();

    const data = {
      itemId: itemId,
      quantity: quantity
    };

    axios
      .post("http://localhost:8080/stocks", data, config)
      .then(function (response) {
        getStocks();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateStock(event) {
    event.preventDefault();

    const data = {
      quantity: quantity,
      itemId: item.id
    };

    axios
      .put("http://localhost:8080/stocks/" + edit, data, config)
      .then(function (response) {
        getStocks();
        setEdit(null);
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
          <h1 className="text-center mb-4">Stocks</h1>

          {stocks &&
            stocks.map((stock) => (
              <div className="card mb-3" key={stock.id}>
                <div className="card-body">
                  <h5 className="card-title">{stock.item.name}</h5>
                  <p className="card-text">Quantity: {stock.quantity}</p>
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={() => {
                      setEdit(stock.id);
                      setStockId(stock.id);
                      setQuantity(stock.quantity);
                      setItem(stock.item);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}

          {!edit && (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Add Stock</h2>

                <form onSubmit={addStock}>
                  <div className="mb-3">
                    <label className="form-label">Item</label>
                    <select className="form-select" onChange={handleItem} required>
                      <option value="">Select an item</option>
                      {items &&
                        items.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={handleQuantity}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-success">
                    Add Stock
                  </button>
                </form>
              </div>
            </div>
          )}

          {edit && (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Edit Stock</h2>

                <form onSubmit={updateStock}>
                  <div className="mb-3">
                    <label className="form-label">Item - {item.name}</label>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={handleQuantity}
                      value={quantity}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Edit Stock
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

export default Stocks;
