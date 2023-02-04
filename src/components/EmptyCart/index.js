import {Link} from 'react-router-dom'
import './index.css'

const EmptyCart = () => (
  <div className="empty-cart-container">
    <img
      src="https://ik.imagekit.io/wk6og9zu09/tasty_kitchens/OBJECTS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673669577708"
      alt="cart empty"
      className="empty-cart-image"
    />
    <h1 className="empty-cart-heading">No Orders Yet!</h1>
    <p className="empty-cart-para">
      Your cart is empty.Add something form the menu.
    </p>
    <Link to="/">
      <button type="button" className="order-now">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCart
