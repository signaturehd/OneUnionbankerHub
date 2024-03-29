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


  addRating (id, rating, comment) {
    this.props.presenter.addRating(id, rating, comment)
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
    const { detail, borrowed, cancelRequest, showConfirmation, confirmation } = this.props
    const { bookRequest } = this.state

    const BookBorrowed = () => (
      <div className = {'library-container'}>
        {
          borrowed  &&
          borrowed.requests &&
          borrowed.requests.map((bookRequest, key) =>
            <BookBorrowedCard
              rateBook = { (id, rating, comment) => this.addRating(id, rating, comment) }
              detail = { bookRequest.book }
              date = { bookRequest.date }
              quantity = { bookRequest.quantity }
              key = { key }
              onClick = { (details, view) => this.setState({ bookRequest, view }) }
            />
          )
        }
        {
          this.state.view &&
          <BookBorrowModal
            showConfirmation = { showConfirmation }
            detail = { bookRequest }
            cancelRequest = { (bool) =>
              cancelRequest(bool)
            }
            confirmation = { (id) => {
              confirmation(id)
              this.setState({ view: false })
            } }
            onClose = { () => this.setState({ view : false }) }/>
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
