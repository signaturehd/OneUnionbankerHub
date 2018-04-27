import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookBorrowedFragment extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const { title, author, description } = this.props

    return (
      <div className={ 'container-option1' }>
      <h1>Book Borrowed</h1>
      </div>
    )
  }
}

export default BookBorrowedFragment
