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

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.floor(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight) - 1;
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      console.log('end of line for borrowed')
    }
  }

  render () {
    const { detail, borrowed } = this.props
    const { bookRequest } = this.state

    const BookBorrowed = () => (
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
