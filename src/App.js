import {Component} from 'react'

import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

import CartContext from './context/CartContext'

import './App.css'

// const getListFromLocalStorage = () => {
//   const stringifiedCartList = localStorage.getItem('cartData')
//   const parsedCartList = JSON.parse(stringifiedCartList)
//   if (parsedCartList === null) {
//     return []
//   }
//   return parsedCartList
// }

class App extends Component {
  state = {cartList: JSON.parse(localStorage.getItem('cartData')) || []}

  addToCart = product => {
    const {cartList} = this.state
    console.log(cartList)
    const productObj = cartList.find(each => each.id === product.id)
    if (productObj) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === productObj.id) {
            const updatedQauntity = product.quantity
            return {...each, quantity: updatedQauntity}
          }
          return each
        }),
      }))
    } else {
      const updatedList = [...cartList, product]
      this.setState({cartList: updatedList})
    }
  }

  increaseQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (id === each.id) {
          const increasedQuantity = each.quantity + 1
          return {...each, quantity: increasedQuantity}
        }
        return each
      }),
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newList = cartList.filter(each => each.id !== id)
    this.setState({cartList: newList})
  }

  decreaseQuantity = id => {
    const {cartList} = this.state
    const product = cartList.find(each => each.id === id)
    if (product.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (id === each.id) {
            const newQuantity = each.quantity - 1
            return {...each, quantity: newQuantity}
          }
          return each
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addToCart: this.addToCart,
            increaseQuantity: this.increaseQuantity,
            decreaseQuantity: this.decreaseQuantity,
            removeAllCartItems: this.removeAllCartItems,
            removeCartItem: this.removeCartItem,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={RestaurantDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
