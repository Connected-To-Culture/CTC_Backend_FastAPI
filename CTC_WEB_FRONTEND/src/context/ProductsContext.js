import React, {useState, createContext} from 'react';

export const ProductsContext = createContext();


export const ProductsContextProvider = props => {

    const[products,setProducts] = useState([]);
    const[selectedProduct,setSelectedProduct] = useState(null);


    //pass the value restaurants to all the componetns and setRestaurant to update the state
    return(
        // adding addRestaurants will make this function avaialable to all the components
        <ProductsContext.Provider value={{products,setProducts, selectedProduct,setSelectedProduct}}>
            {props.children}
        </ProductsContext.Provider>
    )
}