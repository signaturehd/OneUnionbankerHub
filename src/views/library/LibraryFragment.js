import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import RecommendationPresenter from './bookrecommendation/presenter/BookRecommendationPresenter'
import Presenter from './presenter/LibraryPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import BookListFragment from './fragments/BookListFragment'
import BookBorrowedFragment from './fragments/BookBorrowedFragment'
import BookRecommendationFragment from './fragments/BookRecommendationFragment'

import { GenericButton } from '../../ub-components/UButton'

import './styles/library-fragment.css'

class LibraryFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      books : [],
      showRating : false,
      showBook : false
    }
  }

  componentDidMount () {
      this.presenter.getBooks()
      this.props.setSelectedNavigation(5)
  }

  showBooks (books) {
    this.setState({ books })
  }

  render () {
    const { books, tabs } = this.state
    return (
      <div>
      { super.render() }
        <h1>Library</h1>
        <div className = { 'tabs-container' }>
          <input
            className = { 'input-tab' }
            id='tab1'
            type='radio'
            name='tabs'
            defaultChecked />
          <label htmlFor = 'tab1'>All Books</label>

          <input
            className = { 'input-tab' }
            id='tab2'
            type='radio'
            name='tabs' />
          <label htmlFor='tab2'>Recommended</label>

          <input className = { 'input-tab' } id='tab3'  type='radio' name='tabs' />
          <label htmlFor = 'tab3' >Borrowed</label>

          <section id='content1'>
            <BookListFragment presenter={ this.presenter } books={ books } />
          </section>
          <section id='content2'>
            <BookRecommendationFragment />
          </section>
          <section  id='content3'>
            <BookBorrowedFragment />
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
