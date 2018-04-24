import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Switch, Route, Link } from 'react-router-dom'
import BookList from '../../../booklist/BookListFragment'
import BookOwned from '../../../bookowned/BookOwnedFragment'
import BookRecommendation from '../../../bookrecommendation/BookRecommendationFragment'
import './styles.css'

class BookTabsComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { onTabLink, history , htmlFor, books } = this.props
    return (
    <main>
        <input className = { 'input-tab' } id="tab1" defaultChecked  type="radio" name="tabs" />
        <label htmlFor = 'tab1'>All Books</label>

        <input className = { 'input-tab' } id="tab2" type="radio" name="tabs" />
        <label  htmlFor = 'tab2'>Recommended</label>

        <input className = { 'input-tab' } id="tab3"  type="radio" name="tabs" />
        <label htmlFor = 'tab3' >My Library</label>

        <section id="content1">
            <BookList books={ books }/>
        </section>
        <section id="content2">
            <BookRecommendation/>
        </section>
        <section  id="content3">
            <BookOwned/>
        </section>
    </main>
    )
  }
}
export default BookTabsComponent
