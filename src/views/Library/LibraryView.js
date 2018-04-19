import React from 'react'
import { Switch, Route } from 'react-router-dom'


import ConnectView from '../../utils/ConnectView'
import Interactor from '../../domain/interactor/library/GetbooksInteractor'

import Presenter from './presenter/LibraryPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import { BookCardComponent } from './component'


import './css/styles.css'

class LibraryView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
        books : []
    }
  }

  componentDidMount () {
      this.presenter.getBooks()
  }

  books (books) {
this.setState({ books })
}

  render () {
    const { books } = this.state

    return (
      <div className = {'library-container'}>
        {
          books.map((book, key) => (
              <BookCardComponent
                title = { book.title }
                author = { book.author }
                image = { book.image }
                description = { book.description }
              />
            ))
        }
      </div>
    )
  }
}

export default ConnectPartial(LibraryView, Presenter)


// TODO {book.Title}{book.Author}{book.id}{book.Rating}
