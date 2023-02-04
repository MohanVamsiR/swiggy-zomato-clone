import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import Carousel from '../Carousel'
import PopularRestaurantsSection from '../PopularRestaurantsSection'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <Carousel />
        <PopularRestaurantsSection />
      </div>
      <Footer />
    </>
  )
}
export default Home
