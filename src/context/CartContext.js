import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  addToCart: () => {},
})

export default CartContext
