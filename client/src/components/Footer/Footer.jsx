import { Link } from 'react-router'
import { assets } from '../../assets/assets'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti qui quae nam tempora sed, temporibus nostrum amet nemo quisquam molestias, enim laudantium labore exercitationem velit deleniti.</p>
            <div className="footer-content-socials">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul className="footer-content-center-list">
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul className="footer-content-right-list">
                <li>+1-212-456-7890</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 &copy; Tomato.com - Al Right Reserved.</p>
    </div>
  )
}

export default Footer
