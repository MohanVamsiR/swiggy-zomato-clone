import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import './index.css'
import CartContext from '../../context/CartContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  let selected = ''
  const changeColor = current => {
    const {history} = props
    if (history.location.pathname === current) {
      selected = 'colored'
    } else {
      selected = 'notColored'
    }
  }

  return (
    <nav className="header-container">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://ik.imagekit.io/wk6og9zu09/tasty_kitchens/Group_7420.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673321846120"
            alt="website logo"
            className="website-header-logo"
          />
        </Link>

        <h1 className="logo-header-heading">Tasty Kitchens</h1>
      </div>

      <ul className="header-link-options">
        <Link to="/" className="link-item">
          <li
            onClick={changeColor('/')}
            className={`header-link-item ${selected}`}
          >
            Home
          </li>
        </Link>

        <Link to="/cart" className="link-item">
          <li
            onClick={changeColor('/cart')}
            className={`header-link-item ${selected}`}
          >
            Cart
            {renderCartItemsCount()}
          </li>
        </Link>

        <button type="button" className="Logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </ul>

      <Popup
        trigger={
          <button type="button" className="btn-hamburger">
            <GiHamburgerMenu className="hamburger" />
          </button>
        }
        position="bottom right"
      >
        {close => (
          <div className="modal-container">
            <div className="nav-link-container">
              <Link to="/" className="nav-link">
                <p
                  onClick={changeColor('/')}
                  className={`nav-menu-item ${selected}`}
                >
                  Home
                </p>
              </Link>
              <Link to="/cart" className="nav-link">
                <p
                  onClick={changeColor('/cart')}
                  className={`nav-menu-item ${selected}`}
                >
                  Cart
                </p>
              </Link>
              <button
                type="button"
                className="logout-mob"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
            <button type="button" className="close-btn">
              <AiOutlineCloseCircle size={18} onClick={() => close()} />
            </button>
          </div>
        )}
      </Popup>
    </nav>
  )
}

export default withRouter(Header)
