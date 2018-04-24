import React from 'react'
import PropTypes from 'prop-types'


import BookCardComponent from '../common/components/BookCardComponent/BookCardComponent'
import BookViewModal from '../bookview/BookViewModal'

import Presenter from './presenter/BookListPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

class BookListFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      rating : false,
      view : false,
      details : null
    }
  }

  addRating (id, rating) {
    this.presenter.rateBook(id, rating)
  }

  render () {
    const { books, detail } = this.props
    const { details } = this.state
    return (
      <div>
      { super.render() }
      <div className = {'library-container'}>
        {
          books.map((book, key) =>
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
      </div>
    )
  }
}

export default ConnectPartial(BookListFragment, Presenter)
