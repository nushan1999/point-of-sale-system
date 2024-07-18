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
      }

    useEffect(() => {
        if (isAuthenticated) {
            axios.get("http://localhost:8080/itemCategories", config)
            .then(function(response) {
                setItemCategories(response.data);
            })
            .catch(function (error){
                console.log(error);
            });

        }
    },[isAuthenticated])

    function handleName(event) {
        setName(event.target.value);
      }

    function getItemCategories(){
  
        axios.get("http://localhost:8080/itemCategories", config)
          .then(function (response) {
            setItemCategories(response.data);
          })
          .catch(function (error) {
            console.log(error);
          })
    
    }

    function addItemCategory(event){
  
        event.preventDefault();
    
        const data = {
            name: name
        }
    
        axios.post("http://localhost:8080/itemCategories", data, config)
          .then(function(response){
            getItemCategories();
            console.log(response);
          })
          .catch(function(error){
            console.log(error);
          })
      }
    
    return(
        <div>
            <h1>Item Categories</h1>

            {itemCategories && itemCategories.map((itemCategory) => {
                return (
                    <div key = {itemCategory.id}>
                        <p>{itemCategory.name}</p>
                    </div>
                )
            })
            }

            <div>
                    <h2>Add Item Category</h2>
        
                    <form onSubmit={addItemCategory}>
        
                        <div>
                            <label>Category Name</label>
                            <input type="text" onChange={handleName} required />
                        </div>
        
                    <button type="submit">Add Item Category</button> 
        
                    </form>
                </div>
        </div>

        
    )

}

export default ItemCategories;