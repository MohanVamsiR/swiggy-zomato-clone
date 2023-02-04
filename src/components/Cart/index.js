import Header from '../Header'
import Footer from '../Footer'
import EmptyCart from '../EmptyCart'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
// import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const CartStatus = cartList.length === 0

      return (
        <div className="cart-container">
          <Header />
          {CartStatus ? <EmptyCart /> : <CartListView />}

          <Footer />
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
