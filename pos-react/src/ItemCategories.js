import axios from "axios";
import { useEffect, useState } from "react";

function ItemCategories() {

    const [itemCategories, setItemCategories] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/itemCategories")
            .then(function(response) {
                setItemCategories(response.data);
            })
            .catch(function (error){
                console.log(error);
            });
    },[])
    
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