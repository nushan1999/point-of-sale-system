import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./utils/AuthContext";

function Stocks(){

    const { isAuthenticated, jwtToken } = useAuth();

    const [stocks, setStocks] = useState(null);
    const [stockId, setStockId] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [items, setItems] = useState (null);
    const [itemId, setItemId] = useState (null);
    const [item, setItem] = useState(null);

    const [edit, setEdit] = useState(null);

    const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      }

    useEffect(() => {

        if (isAuthenticated) {

            axios.get("http://localhost:8080/stocks", config)
            .then(function(response) {
                setStocks(response.data);
            })
            .catch(function (error){
                console.log(error);
            });

        axios.get("http://localhost:8080/items", config)
            .then(function (response) {
                setItems(response.data);
            })
            .catch(function (error) {
                console.log(error);
        });

        }
        

    },[isAuthenticated])

    function getStocks(){
  
        axios.get("http://localhost:8080/stocks", config)
          .then(function (response) {
            setStocks(response.data);
          })
          .catch(function (error) {
            console.log(error);
          })
    
    }
    
    function handleQuantity(event){
        setQuantity(parseFloat(event.target.value));
    }

    function handleItem (event) {
        setItemId(parseInt(event.target.value));
    }

    function addStock(event){
  
        event.preventDefault();
    
        const data = {
          itemId: itemId,
          quantity: quantity
        }
    
        axios.post("http://localhost:8080/stocks",data, config)
          .then(function(response){
            getStocks();
            console.log(response);
          })
          .catch(function(error){
            console.log(error);
          })
    
      }

    function updateStock(event) {
        event.preventDefault();
    
        const data = {
          quantity: quantity,
          itemId: item.id
        }
    
        axios.put("http://localhost:8080/stocks/" + edit, data, config)
          .then(function(response){
            getStocks();
            setEdit(null);
            console.log(response);
          })
          .catch(function(error){
            console.log(error);
          })
    }

    return (
        <div>
            <h1>Stocks</h1>

            {stocks && stocks.map((stock) => {
                return (
                    <div key = {stock.id}>
                        <p>{stock.quantity} - {stock.item.name}</p>
                        <button type="button" onClick={() => {
                            setEdit(stock.id);
                            setStockId(stock.id);
                            setQuantity(stock.quantity);
                            setItem(stock.item);
                            }}>Edit</button>
                    </div>
                )
            })
            }

            {!edit &&
                <div>
                    <h2>Add Stock</h2>
        
                    <form onSubmit={addStock}>
        
                        <div>
                            <label>Item</label>
                            <select onChange={handleItem} required>
                                <option value="">Select an item</option>

                                {items && items.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Quantity</label>
                            <input type="number" onChange={handleQuantity} required />
                        </div>
        
                    <button type="submit">Add Stock</button> 
        
                    </form>
                </div>
            }
            
            {edit &&
                <div>
                <h2>Edit Stock</h2>
    
                    <form onSubmit={updateStock}>
        
                    <div>
                        <label>Item - {item.name} </label>
                    </div>
        
                    <div>
                        <label>Quantity</label>
                        <input type="number" onChange={handleQuantity} value={quantity} required />
                    </div>
        
                    <button type="submit">Edit Stock</button> 
                    <button type='button' onClick={() => {
                        setEdit(null);
                    }}>Cancel</button>

                    </form>
                </div>
            }

        </div>


    )

}

export default Stocks;