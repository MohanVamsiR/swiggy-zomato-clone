import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {increaseQuantity, decreaseQuantity} = value
      const {cartItem} = props
      const {id, name, quantity, cost, imageUrl} = cartItem

      const decreaseItemQuantity = () => {
        decreaseQuantity(id)
      }

      const increaseItemQuantity = () => {
        increaseQuantity(id)
      }

      return (
        <li
          className="cart-item" // testid="cartItem"
        >
          <div
            className="cart-item-info" // testid="cartItem"
          >
            <img src={imageUrl} alt={name} className="cart-item-image" />
            <h1 className="cart-item-desktop-name">{name}</h1>
          </div>
          <div
            className="cart-qty-price-cont" // testid="cartItem"
          >
            <h1 className="cart-item-mobile-name">{name}</h1>
            <div className="cart-qty-container">
              <button
                className="decrement-quantity"
                type="button"
                onClick={decreaseItemQuantity}
                // testid="decrement-quantity"
              >
                <BsDashSquare size={16} />
              </button>
              <p // testid="item-quantity"
                className="item-quantity"
              >
                {quantity}
              </p>
              <button
                className="increment-quantity"
                type="button"
                onClick={increaseItemQuantity}
                // testid="increment-quantity"
              >
                <BsPlusSquare size={16} />
              </button>
            </div>
            <p
              className="price" // testid="total-price"
            >
              <FaRupeeSign size={12} /> {cost * quantity}
            </p>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
