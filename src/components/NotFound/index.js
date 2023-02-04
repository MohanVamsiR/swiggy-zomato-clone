import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://ik.imagekit.io/wk6og9zu09/tasty_kitchens/not-found.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673269564717"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-para">
      We are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage
    </p>

    <Link to="/">
      <button type="button" className="home-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
