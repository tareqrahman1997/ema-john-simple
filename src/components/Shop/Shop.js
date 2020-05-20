import React, { useState } from 'react';
import './shop.css';
import Product from '../Product/Product';
import Cart from '../../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Shop = () => {
    
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    
    useEffect(() =>{
        fetch('http://localhost:4200/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data);

        })
    }, [])

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if(products.length > 0){
           const previousCart = productKeys.map( existingKey => {
           const product = products.find( pd => pd.key === existingKey);
              // console.log(product);
                product.quantity = savedCart[existingKey];
                return product;
            } )
            setCart(previousCart);
        }
    }, [products])

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