import {Component} from 'react'
import Payment from '../Payment'
import CartItem from '../CartItem'
import TotalBill from '../TotalBill'

// import './index.css'

import CartContext from '../../context/CartContext'

class CartListView extends Component {
  state = {ordernow: false}

  orderPlaced = () => {
    this.setState(prevState => ({ordernow: !prevState.isOrderPlaced}))
  }

  render() {
    const {ordernow} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const cartListFromLocalStorage = localStorage.getItem('cartData')
          const parsedCartList = JSON.parse(cartListFromLocalStorage)
          return ordernow ? (
            <Payment />
          ) : (
            <div className="cart-content-container">
              <ul className="ul-cartlist">
                {parsedCartList.map(each => (
                  <CartItem key={each.id} cartItem={each} value={value} />
                ))}
              </ul>
              <TotalBill orderPlaced={this.orderPlaced} />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartListView
