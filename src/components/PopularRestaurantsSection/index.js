import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {MdOutlineSort} from 'react-icons/md'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import RestaurantItem from '../RestaurantItem'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class PopularRestaurantsSection extends Component {
  state = {
    isLoading: false,
    sortOption: sortByOptions[0].value,
    restaurantsList: [],
    searchInput: '',
    activePage: 1,
    totalPages: 0,
  }

  componentDidMount() {
    this.getPopularRestaurants()
  }

  getPopularRestaurants = async () => {
    this.setState({isLoading: true})
    const {activePage, searchInput, sortOption} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortOption}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const totalRestaurants = data.total
    const totalPages = Math.ceil(totalRestaurants / limit)
    const updatedData = data.restaurants.map(each => ({
      id: each.id,
      cuisine: each.cuisine,
      imageUrl: each.image_url,
      name: each.name,
      rating: each.user_rating.rating,
      totalReviews: each.user_rating.total_reviews,
    }))

    this.setState({restaurantsList: updatedData, isLoading: false, totalPages})
  }

  changeSortOption = event => {
    this.setState({sortOption: event.target.value}, this.getPopularRestaurants)
  }

  onDecrement = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getPopularRestaurants,
      )
    }
  }

  onIncrement = () => {
    const {activePage, totalPages} = this.state
    if (activePage < totalPages) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getPopularRestaurants,
      )
    }
  }

  renderPopularRestaurants = () => {
    const {sortOption, restaurantsList, activePage, totalPages} = this.state
    return (
      <div className="restaurantView">
        <div className="popular-restaurant-sort">
          <div className="pop-rest-description">
            <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
            <p className="popular-restaurants-description">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div className="sorting">
            <MdOutlineSort className="sort-icon" />
            <select
              id="sortBy"
              onChange={this.changeSortOption}
              value={sortOption}
              className="select-sort"
            >
              {sortByOptions.map(each => (
                <option key={each.id}>{each.displayText}</option>
              ))}
            </select>
          </div>
        </div>
        <hr className="hrz-line" />

        <ul className="restaurants-list">
          {restaurantsList.map(each => (
            <RestaurantItem details={each} key={each.id} />
          ))}
        </ul>

        <div className="counter-container">
          <button
            type="button"
            onClick={this.onDecrement}
            className="decrement-button "
            // testid="pagination-left-button"
          >
            <IoIosArrowBack className="icon-class" />
          </button>
          <div className="pages-class">
            <span // testid="active-page-number"
            >
              {activePage}
            </span>{' '}
            of {totalPages}
          </div>
          <button
            type="button"
            onClick={this.onIncrement}
            className="increment-button"
            // testid="pagination-right-button"
          >
            <IoIosArrowForward className="icon-class" />
          </button>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div
      className="carousel-loader" // testid="restaurants-list-loader"
    >
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return isLoading ? this.renderLoader() : this.renderPopularRestaurants()
  }
}
export default PopularRestaurantsSection
