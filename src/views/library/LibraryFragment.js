import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Presenter from './presenter/LibraryPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import BookListFragment from './fragments/BookListFragment'
import BookBorrowedFragment from './fragments/BookBorrowedFragment'
import BookRecommendationFragment from './fragments/BookRecommendationFragment'

import { GenericButton } from '../../ub-components'

import './styles/libraryFragment.css'

class LibraryFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      books : [],
      recommended : [],
      borrowed : [],
      reserve: [],
      filteredBook: [],
      showRating : false,
      showBook : false,
      showBorrowed : false,
      showRecommendation : false,
      showBorrowedFiltered : false,
      searchString : '',
      pageNumber : null,
      borrowedPageNumber: null,
      refresh : 0
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  componentDidMount () {
    const { pageNumber, borrowedPageNumber } = this.state
      this.getBooks(pageNumber)
      this.presenter.getBooksBorrowed(borrowedPageNumber)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  getBooks (pageNumber) {
    this.presenter.getBooks(pageNumber ? pageNumber : 1, '')
  }

  getFilterBooks (pageNumber, find) {
    this.setState({ books: [], recommended: [], pageNumber: 1 })
    this.presenter.getBooks(pageNumber ? pageNumber : 1, find)
  }

  getBooksBorrowed (borrowedPageNumber) {
    this.presenter.getBooksBorrowed(borrowedPageNumber ? borrowedPageNumber : 1, '')
  }

  getFilterBooksBorrowed () {
    this.setState({ borrowed: [], recommended: [],  borrowedPageNumber: 1 })
    this.presenter.getBooksBorrowed(borrowedPageNumber ? borrowedPageNumber : 1, find)
  }

  showBooks (books) {
    if (this.state.books.length === 0) {
      this.setState({ books })
    } else {
      const updateBooks = [...this.state.books]
      updateBooks.push(...books)
      this.setState({ books: updateBooks })
    }
  }

  showRecommendation (recommended) {
    if (this.state.recommended.length === 0) {
      this.setState({ recommended })
    } else {
      const updateRecommendedBooks = [...this.state.recommended]
      updateRecommendedBooks.push(...recommended)
      this.setState({ recommended: updateRecommendedBooks })
    }
  }

  showBorrowed (borrowed) {
    if (this.state.borrowed.length === 0) {
      this.setState({ borrowed })
    } else {
      const updateBorrowedBooks = [...this.state.borrowed]
      updateBorrowedBooks.push(...borrowed)
      this.setState({ borrowed: updateBorrowedBooks })
    }
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  updateSearch () {
    const search = this.refs.search.value.substr(0 , 20)
    this.setState({ searchString: search })
    this.startTimer()
  }

  tick () {
    const ref = this.state.refresh
    this.setState({ refresh: (ref + 1) })
    if (ref >= 1) {
      this.stopTimer()
      this.getFilterBooks (this.state.pageNumber, this.state.searchString)
      this.setState({ refresh: 0 })
    }
  }

  startTimer () {
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 500)
  }

  stopTimer () {
    clearInterval(this.timer)
  }

  showBorrowedFiltered (filteredBook) {
    this.setState({ filteredBook })
  }

  render () {
    const {
      filteredBook,
      books,
      tabs,
      recommended,
      borrowed,
      reserve,
      searchString,
      pageNumber,
      borrowedPageNumber
    } = this.state
    const filteredBooks = books
    const search = searchString.trim().toLowerCase()
    return (
      <div>
      { super.render() }
      <div className={ 'header-margin-container' }>
        <i className = { 'back-arrow' } onClick = { this.navigate.bind(this) }></i>
      </div>
      <input type = 'text'
           className = {'booksSearchBar'}
           ref='search'
           placeholder = {'Search Books'}
           value = { this.state.searchString }
           onChange = { this.updateSearch } />
        <div className = { 'tabs-container' }>
          <input
            className = { 'input-tab' }
            id='tab1'
            type='radio'
            name='tabs'
            onClick = { () => this.props.history.push('/mylearning/books') }
            defaultChecked />
          <label  htmlFor = 'tab1'>All Books</label>

          <input
            className = { 'input-tab' }
            id='tab2'
            type='radio'
            onClick = { () => this.props.history.push('/mylearning/books/recommended') }
            name='tabs' />
          <label  htmlFor='tab2'>Recommended</label>

          <input
            className = { 'input-tab' }
            id='tab3'
            onClick = { () => this.props.history.push('/mylearning/books/history') }
            type='radio'
            name='tabs' />
          <label  htmlFor = 'tab3' >Borrowed</label>

          <section id='content1'>
              <Switch>
                <Route path = '/mylearning/books/recommended'
                  render = { props => <BookRecommendationFragment
                    page = { pageNumber => this.getBooks(pageNumber) } presenter = { this.presenter } recommended = { recommended }  filteredBooks = { filteredBooks }/> } />
                <Route path = '/mylearning/books/history'
                  render = { props => <BookBorrowedFragment
                    presenter = { this.presenter } borrowed = { borrowed }  /> } />
                <Route path = '/mylearning/books'
                  render = { props => <BookListFragment
                    page = { pageNumber => this.getBooks(pageNumber) } presenter = { this.presenter } filteredBooks = { filteredBooks } /> } />
             </Switch>
          </section>
        </div>
      </div>
    )
  }
}

LibraryFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(LibraryFragment, Presenter)
