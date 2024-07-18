import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./utils/AuthContext";

function ItemCategories() {

    const { isAuthenticated, jwtToken } = useAuth();

    const [itemCategories, setItemCategories] = useState(null);

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
        </div>
    )

}

export default ItemCategories;