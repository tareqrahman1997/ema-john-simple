import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => { console.log(data) }
    const auth = useAuth()


  return (
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
  )
};

export default Shipment;