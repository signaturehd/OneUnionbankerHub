import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookCardComponent from '../components/BookCardComponent/BookBorrowedCard'
import BookViewModal from '../modals/BookViewModal'

class BookListFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating : false,
      view : false,
      details : null

    }
  }

  addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
  }

  render () {
    const { _books, detail } = this.props
    const { details } = this.state
    return (
      <div className = {'library-container'}>
        {
          _books.map((book, key) =>
            <BookCardComponent
              detail = { book } key = { key }
              onClick = { (details, view) => this.setState({ details, view }) }
            />
          )
        }
        {
          this.state.view &&
          <BookViewModal rateBook = { (id, rating) => this.addRating(id, rating) }
           details = { details }
           onClose = { () => this.setState({ view : false }) }/>
        }
      </div>
    )
  }
}

export default BookListFragment
