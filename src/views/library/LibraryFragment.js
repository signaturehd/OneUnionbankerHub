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

import './styles/library-fragment.css'

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

    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  componentDidMount () {
      this.presenter.getBooks()
      this.presenter.getBooksBorrowed()
      this.props.setSelectedNavigation(5)
  }

  showBooks (books) {
    this.setState({ books })
  }

  showRecommendation (recommended) {
    this.setState({ recommended })
  }

  showBorrowed (borrowed) {
    this.setState({ borrowed })
  }

  updateSearch () {
    this.setState({ searchString: this.refs.search.value.substr(0 , 20) })
  }
  showBorrowedFiltered (filteredBook) {
    this.setState({ filteredBook })
  }

  render () {
    const { filteredBook, books, tabs, recommended, borrowed, reserve } = this.state

    let _books = this.state.books
    const _borrowed = this.state.borrowed
    const search = this.state.searchString.trim().toLowerCase()
    if (search.length > 0) {
      _books = _books.filter(books => books.title.toLowerCase().match(search))
    }
    return (
      <div>
      { super.render() }
        <h1 className = {'title-view' }>Library</h1>
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
            defaultChecked />
          <label  className = { 'mobile-icon' } htmlFor = 'tab1'>All Books</label>

          <input
            className = { 'input-tab' }
            id='tab2'
            type='radio'
            name='tabs' />
          <label className = { 'mobile-icon' } htmlFor='tab2'>Recommended</label>

          <input className = { 'input-tab' } id='tab3'  type='radio' name='tabs' />
          <label className = { 'mobile-icon' } htmlFor = 'tab3' >Borrowed</label>

          <section id='content1'>
            <BookListFragment presenter={ this.presenter } _books = { _books } />
          </section>
          <section id='content2'>
            <BookRecommendationFragment presenter = { this.presenter } recommended = { recommended } />
          </section>
          <section  id='content3'>
            <BookBorrowedFragment presenter = { this.presenter } borrowed = { borrowed } />
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
