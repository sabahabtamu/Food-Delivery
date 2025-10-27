import { useContext, useState } from 'react';
import './Login.css'
import axios from 'axios';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const Login = ({setShowLogin}) => {

  const {url, setToken} = useContext(StoreContext);

  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const onLogin = async (e) => {
    e.preventDefault();

    let newUrl = url;
    if (currState==='Login') {
      newUrl+='/api/user/login'
    } else {
      newUrl+='/api/user/register'
    }

    const res = await axios.post(newUrl,data);

    if (res.data.success) {
      setToken(res.data.token);
      localStorage.setItem('token',res.data.token);
      setShowLogin(false);
    } else {
      alert(res.data.message);
    }
  }

  return (
    <div className='login'>
      <form onSubmit={onLogin} className="login-container">
        <div className="login-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-inputs">
            {currState==='Sign Up'?<input onChange={onChangeHandler} value={data.name} name='name' type="text" placeholder='Your name' required />:null}
            <input onChange={onChangeHandler} value={data.email} name='email' type="email" placeholder='Email address' required />
            <input onChange={onChangeHandler} value={data.password} name='password' type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currState==='Sign Up'?'Create account':'Login'}</button>
        <div className="login-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {
            currState==='Sign Up'
            ? <p>Already have an account? <span onClick={()=>setCurrState('Login')}>Login</span></p>
            : <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
        }
      </form>
    </div>
  )
}

export default Login
