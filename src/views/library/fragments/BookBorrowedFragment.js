import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
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

    this.borrowedPageNumber = 2
    this.handleScroll = this.handleScroll.bind(this)
    this.scroll
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

  handleScroll () {
      const element = document.getElementById('navPanId')
      const scrollBar = element.scrollTop
      const docHeight = element.scrollHeight - element.offsetHeight
      if (scrollBar >= docHeight) {
          this.props.page(this.borrowedPageNumber++)
      }
  }

  render () {
    const { detail, borrowed } = this.props
    const { bookRequest } = this.state

    const BookBorrowed = () => (
      <div className = {'library-container'}>
        {
          borrowed  &&
          borrowed.requests &&
          borrowed.requests.map((bookRequest, key) =>
            <BookBorrowedCard

              rateBook = { (id, rating) => this.addRating(id, rating) }
              detail = { bookRequest.book }
              quantity = { bookRequest.quantity }
              key = { key }
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


    return (
      <div>
        <Switch>
          <Route exact path = '/mylearning/books/history'  render = { BookBorrowed } />
        </Switch>
      </div>
    )
  }
}

export default BookBorrowedFragment
