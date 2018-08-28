import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookCardComponent from '../components/BookCardComponent/BookBorrowedCard'
import BookViewModal from '../modals/BookViewModal'
import BookConfirmationModal from '../modals/BookConfirmationModal'
import { Switch, Route } from 'react-router-dom'

class BookListFragment extends Component {
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
    this.pageNumber = 2
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll, true)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll, true)
  }

  addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
  }

  addReserve (id, quantity) {
    this.props.presenter.reserveBook(id, quantity)
  }

  handleScroll () {
    const element = document.getElementById('navPanId')
    const scrollBar = element.scrollTop
    const docHeight = element.scrollHeight - element.offsetHeight
    const bookNumber = this.props.filteredBooks.length % 10
    if (Math.round(scrollBar) >= docHeight) {
      /*
      => the bookNumber == 0 validation is temporary,
      the API lacks the validation for paging thus makes it show unnecessary results
      outside the search query when the pageNumber increments further.
      this validation works fine unless the result/s (number of book/s) is 0 or 10,
      if the result is 0, it's ok as long as there is no scrollbar. theoritically,
      it will display the unnecessary result/s when the scrollbaw is clicked.
      if the result is 10, it will most likely show unnecessary result/s because of the
      visible scrollbar that when browse at the bottom, calls this method and (10 % 10) == 0
      this can be fixed through API or we can make another validation but its better to apply
      it on API.
      */
      if (bookNumber === 0) {
        this.props.page(this.pageNumber++)
      }
    }
  }

  render () {
    const {
      filteredBooks,
      detail
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

    const BookList = () => (
      <div className = {'library-container'}>
        {
          filteredBooks.map((book, key) =>
            <BookCardComponent
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
           onClose = { () => this.setState({ view : false }) }/>
        }

        {
          showConfirmationReserveModal &&
          <BookConfirmationModal
            onYes = { () => {
              this.addReserve(bookId, bookQuantity), this.setState({ showConfirmationReserveModal : false, view : false })
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
          <Route path = '/mylearning/books'  render = { BookList } />
        </Switch>
      </div>
    )
  }
}

export default BookListFragment
