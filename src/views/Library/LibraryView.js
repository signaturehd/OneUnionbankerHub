import React from 'react'
import { Switch, Route } from 'react-router-dom'


import ConnectView from '../../utils/ConnectView'
import Interactor from '../../domain/interactor/library/GetbooksInteractor'

import Presenter from './presenter/LibraryPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import { GenericCard } from '../../ub-components/Cards'

import './css/styles.css'

class LibraryView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
        showBooks: []
    }
  }

  componentDidMount () {
      this.presenter.getBooks()
  }

  showBooks (books) {
    this.setState({ showBooks:books })
}

  render () {
    const { showBooks } = this.state

    return (
      <div className = {'library-container'}>
        {
          showBooks.map((book, key) => (
              <GenericCard
                title = { book.title }
                description = { book.Author }
              />
            ))
        }
      </div>
    )
  }
}

export default ConnectPartial(LibraryView, Presenter)


// TODO {book.Title}{book.Author}{book.id}{book.Rating}
