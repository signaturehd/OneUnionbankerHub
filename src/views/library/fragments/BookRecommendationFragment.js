import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookCardComponent from '../components/BookCardComponent/BookCardComponent'
import BookViewModal from '../modals/BookViewModal'
import BookConfirmationModal from '../modals/BookConfirmationModal'

class BookRecommendationFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating : false,
      view : false,
      details : null,
      showConfirmationRateModal : false,
      showConfirmationReserveModal : false,
      bookId : null,
      bookRating : null,
      bookQuantity : null,
      title : null,
    }
  }

  componentDidMount () {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount () {
    window.removeEventListener("scroll", this.handleScroll);
  }

  addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
  }

  addReserve (id, quantity) {
    this.props.presenter.reserveBook(id, quantity)
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.floor(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight) - 1;
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      console.log('end of line for recommendation')
    }
  }

  render () {
    const {
      detail,
      recommended
    } = this.props

    const {
      details,
      view,
      showConfirmationRateModal,
      showConfirmationReserveModal,
      bookId,
      bookRating,
      bookQuantity,
      title,
    } = this.state
    const BookRecommendation = () => (
      <div className = {'library-container'}>
        {
          recommended.map((book, key) =>
            <BookCardComponent
              rateBook = { (id, rating) => this.addRating(id, rating) }
              detail = { book } key = { key }
              onClick = { (details, view) => this.setState({ details, view }) }
            />
          )
        }
        {
          view &&
          <BookViewModal
           rateBook = { (bookId, bookRating) => this.setState({ bookId, bookRating, showConfirmationRateModal : true, title : 'Rate' }) }
           reserveBook = { (bookId, bookQuantity) => this.setState({ bookId, bookQuantity, showConfirmationReserveModal : true, title : 'Reserve' }) }
           details = { details }
           onClose = { () => this.setState({ view : false }) }
          />
        }

        {
          showConfirmationReserveModal &&
          <BookConfirmationModal
            onYes = { () => {
this.addReserve(bookId, bookQuantity), this.setState({ showConfirmationReserveModal : false })
} }
            title = { title }
            onClose = { () => this.setState({ showConfirmationReserveModal : false }) }
          />
        }

        {
          showConfirmationRateModal &&
          <BookConfirmationModal
            onYes = { () => {
this.addRating(bookId, bookRating), this.setState({ showConfirmationRateModal : false })
} }
            title = { title }
            onClose = { () => this.setState({ showConfirmationRateModal : false }) }
          />
        }
      </div>
    )

    return (
      <div>
        <Switch>
          <Route exact path = '/mylearning/books/recommended'  render = { BookRecommendation } />
        </Switch>
      </div>
    )
  }
}

export default BookRecommendationFragment
