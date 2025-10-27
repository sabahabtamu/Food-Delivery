import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

  const {getTotalCartAmount, token, foods, cartItems, url} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setData(data => ({...data, [name]: value}));
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    foods.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+2,
    }
    let res = await axios.post(`${url}/api/order/place`, orderData,{headers: {token}});
    if (res.data.success) {
      const {session_url} = res.data;
      window.location.replace(session_url)
    } else {
      alert('Error');
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount()===0) {
        navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.firstName} name='firstName' type="text" placeholder='First name' required />
          <input onChange={onChangeHandler} value={data.lastName} name='lastName' type="text" placeholder='Last name' required />
        </div>
        <input onChange={onChangeHandler} value={data.email} name='email' type="email" placeholder='Email address' required />
        <input onChange={onChangeHandler} value={data.street} name='street' type="text" placeholder='Street' required />
        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.city} name='city' type="text" placeholder='City' required />
          <input onChange={onChangeHandler} value={data.state} name='state' type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.zipcode} name='zipcode' type="text" placeholder='Zip code' required />
          <input onChange={onChangeHandler} value={data.country} name='country' type="text" placeholder='Country' required />
        </div>
        <input onChange={onChangeHandler} value={data.phone} name='phone' type="text" placeholder='Phone' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()+2}</b>
            </div>
            <hr />
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
