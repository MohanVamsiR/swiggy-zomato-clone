import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const RestaurantItem = props => {
  const {details} = props
  const {id, cuisine, imageUrl, name, rating, totalReviews} = details

  return (
    <Link to={`/restaurant/${id}`} className="restaurant-link">
      <li
        className="restaurant-card" // testid="restaurant-item"
      >
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div className="restaurant-info">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="star-rating">
            <AiFillStar className="star" />
            <p className="rest-rating">{rating}</p>
            <p className="user-total-reviews">({totalReviews} rating)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantItem
