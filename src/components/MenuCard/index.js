import {Component} from 'react'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

class MenuCard extends Component {
  state = {quantity: 0}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {addToCart, increaseQuantity, decreaseQuantity} = value

          const {menuItem} = this.props
          const {id, imageUrl, name, cost, rating} = menuItem
          const {quantity} = this.state

          const onAdd = () => {
            this.setState(
              prevState => ({
                quantity: prevState.quantity + 1,
              }),
              addToCart({...menuItem, quantity: quantity + 1}),
            )
          }

          const onDecreaseQuantity = () => {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decreaseQuantity(id)
          }

          const onIncreaseQuantity = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
            increaseQuantity(id)
          }

          /* const fromLocal = localStorage.getItem('cartData')
          const parsed = JSON.parse(fromLocal)

          const productObject = parsed.find(each => each.id === id)
          console.log(productObject) */

          return (
            <li className="menuItem">
              <img src={imageUrl} className="menu-image" alt="food item" />
              <div className="menu-details">
                <h1 className="menu-heading">{name}</h1>
                <p className="item-cost">₹ {cost}.00</p>
                <div className="rating">
                  <AiFillStar className="menu-star" />
                  <p className="menu-rating">{rating}</p>
                </div>
                <div className="add-cart-btn">
                  {quantity === 0 ? (
                    <button
                      type="button"
                      className="addToCartButton"
                      onClick={onAdd}
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="cart-btn-qty-cont">
                      <button
                        // testid="decrement-count"
                        type="button"
                        className="decrement-count"
                        onClick={onDecreaseQuantity}
                      >
                        <BsDashSquare className="icon-btn" />
                      </button>
                      <p // testid="active-count"
                        className="active-count"
                      >
                        {quantity}
                      </p>
                      <button
                        // testid="increment-count"
                        type="button"
                        className="increment-count"
                        onClick={onIncreaseQuantity}
                      >
                        <BsPlusSquare className="icon-btn" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default MenuCard
