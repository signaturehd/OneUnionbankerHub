import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookCardComponent from '../components/BookCardComponent/BookCardComponent'
import BookViewModal from '../modals/BookViewModal'

class BookRecommendationFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating : false,
      view : false,
      details : null,
    }
  }

  addRating (id, rating) {
    this.props.presenter.rateBook(id, rating)
  }

  render () {
    const { detail, recommended } = this.props
    const { details } = this.state
    return (
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
          this.state.view &&
          <BookViewModal details = { details } onClose = { () => this.setState({ view : false }) }/>
        }
      </div>
    )
  }
}

export default BookRecommendationFragment
