import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookBorrowedCard from '../components/BookCardComponent/BookBorrowedCard'
import BookBorrowModal from '../modals/BookBorrowModal'

class BookBorrowedFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating : false,
      view : false,
      bookRequest : null,
    }
  }

  addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
    console.log(borrowed)
  }

  render () {
    const { detail, borrowed } = this.props
    const { bookRequest } = this.state
    return (
      <div className = {'library-container'}>
        {
          borrowed  && borrowed.requests && borrowed.requests.map((bookRequest, key) =>
            <BookBorrowedCard

              rateBook = { (id, rating) => this.addRating(id, rating) }
              detail = { bookRequest.book } key = { key }
              onClick = { (details, view) => this.setState({ bookRequest, view }) }
            />
          )
        }
        {
          this.state.view &&
          <BookBorrowModal detail = { bookRequest } onClose = { () => this.setState({ view : false }) }/>
        }
      </div>
    )
  }
}

export default BookBorrowedFragment
