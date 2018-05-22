import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookCardComponent from '../components/BookCardComponent/BookBorrowedCard'
import BookViewModal from '../modals/BookViewModal'
import BookConfirmationModal from '../modals/BookConfirmationModal'

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
  }

  addRating (id, rating) {
    console.log(rating)
    this.props.presenter.rateBook(id, rating)
  }

  addReserve (id, quantity) {
    this.props.presenter.reserveBook(id, quantity)
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    if (nextProps.notify) {
      this.setState({showConfirmationReserveModal: false, showConfirmationRateModal: false})
    }
  }

  render () {
    const {
      books,
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
    return (
      <div className = {'library-container'}>
        {
          books.map((book, key) =>
            <BookCardComponent
              detail = { book } key = { key }
              onClick = { (details, view) => this.setState({ details, view }) }
            />
          )
        }

        {
          view &&
          <BookViewModal
           rateBook = { (bookId, bookRating) => this.setState({bookId, bookRating, showConfirmationRateModal : true, title : 'Rate'}) }
           reserveBook = { (bookId, bookQuantity) => this.setState({bookId, bookQuantity, showConfirmationReserveModal : true, title : 'Reserve'}) }
           details = { details }
           onClose = { () => this.setState({ view : false }) }/>
        }

        {
          showConfirmationReserveModal &&
          <BookConfirmationModal
            onYes = { () => this.addReserve(bookId, bookQuantity) }
            title = { title }
            onClose = { () => this.setState({ showConfirmationReserveModal : false }) }
          />
        }

        {
          showConfirmationRateModal &&
          <BookConfirmationModal
            onYes = { () => this.addRating(bookId, bookRating) }
            title = { title }
            onClose = { () => this.setState({ showConfirmationRateModal : false }) }
          />
        }

      </div>
    )
  }
}

export default BookListFragment
