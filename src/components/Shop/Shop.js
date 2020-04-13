import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './shop.css';
import Product from '../Product/Product';
import Cart from '../../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) =>{
      //  console.log('Product added',product);
        
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd =>pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct) {
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd =>pd.key !== toBeAddedKey);
            newCart = [...others,sameProduct]

        }
        else{
            product.quantity =1;
            newCart = [...cart, product];

        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);

    }

    return (
        <div className="shop-container">
        <div className="product-container">
                
                {
                    products.map(pd => <Product
                    key= {pd.key}
                    showAddToCart= {true}
                    handleAddProduct = {handleAddProduct}
                     product={pd}></Product>)
                }
                

        </div>
        <div className="cart-container">
            <Cart cart ={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>   
                    </Link>
            </Cart>
        </div>
            
        </div>
    );
};

export default Shop;