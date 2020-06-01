import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import {loadStripe} from '@stripe/stripe-js';
import {Elements } from '@stripe/react-stripe-js';
import { getDatabaseCart ,clearLocalShoppingCart} from '../../utilities/databaseManager';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useState } from 'react';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const [shipInfo, setShipInfo] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const auth = useAuth();

    const stripePromise = loadStripe('pk_test_dDemrV0Hy6kFvLXeOl9s3nTJ00eCa40bVp');
    

    const onSubmit = data => {
      setShipInfo(data); 
    }

    const handlePlaceOrder = (payment) =>{
      const savedCart= getDatabaseCart();
      const orderDetails = {
        email:auth.user.email,
        cart:savedCart,
        Shipment:shipInfo,
        payment: payment

      };

      fetch('https://tareqrahman.herokuapp.com/placeOrder',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(order => {
        setOrderId(order._id);
        clearLocalShoppingCart();
      })
    }
    


  return (
    <div className="container">
        <div className="row">
          <div style={{display: shipInfo && 'none'}} className="col-md-6">
              <h3>Shipment info</h3>
              <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                  <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name" />
                  {errors.name && <span className="error">Name is required</span>}
                  <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email" />
                  {errors.email && <span className="error">Email is required</span>}
                  <input name="addressLink1" ref={register({ required: true })} placeholder="AddressLink1" />
                  {errors.addressLink1 && <span className="error">AddressLink1 is required</span>}
                  <input name="addressLink2 "ref={register({ required: true })} placeholder="AddressLink2" />
                  {errors.addressLink2 && <span className="error">AddressLink2 is required</span>}
                  <input name="city" ref={register({ required: true })} placeholder="City" />
                  {errors.city && <span className="error">City is required</span>}
                  <input name="country" ref={register({ required: true })} placeholder="Country" />
                  {errors.country && <span className="error">Country is required</span>}
                  <input name="zipcode" ref={register({ required: true })} placeholder="Zipcode" />
                  {errors.zipcode && <span className="error">Zipcode is required</span>}
      
                  <input type="submit" />
              </form>

          </div>
          <div style={{display:shipInfo ? 'block' : 'none'}} className="col-md-6">
              <h3 className="success" >Payment info</h3>
              <Elements stripe={stripePromise}>
                  <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
              </Elements>
              <br/>
              {
                orderId && <div>
                  <h3>Thank You For with Us</h3>
                  <p>Your order id: {orderId}</p>
                </div>
              }
          </div>
        </div>
    </div>
    
  )
};

export default Shipment;