import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/MyLearningPresenter'

import PodcastFragment from '../podcast/PodcastFragment'
import PodcastPlayerFragment from '../podcastplayer/PodcastPlayerFragment'
import LibraryView from '../library/LibraryFragment'
import MyTrainingFragment from '../trainings/MyTrainingFragment'

import { InputModal, Card, GenericButton } from '../../ub-components'

import './styles/mylearning.css'

class MyLearningView extends BaseMVPView {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(4)
  }

  render () {
    const { history } = this.props
    const { accountNumber, showAccountNumberModal } = this.state
    const mylearning = [{
      id: 0 ,
      styleName: 'mylearning-cards-1',
      title: 'BOOKS',
      path: '/mylearning/books',
    }, {
      id: 1 ,
      styleName: 'mylearning-cards-1',
      title: 'PODCASTS',
      path: '/mylearning/podcasts',
    }, {
      id: 2 ,
      styleName: 'mylearning-cards-1',
      title: 'TRAININGS',
      path: '/mylearning/trainings',
    }]
    const MyLearning = () => (
      <div className = { 'mylearning-container' }>
        <h2 className = { 'header-margin-default ' }>MY LEARNING</h2>
        {
          showAccountNumberModal &&
            <InputModal
              isDismisable = { true }
              onClose = { () => this.setState({ showAccountNumberModal : false }) }
              onChange = { e => this.setState({ accountNumber: e.target.value }) }
              placeholder = { 'Account Number' }
              type = { 'text' }
              onSubmit = { e => {
                  e.preventDefault()
                  this.presenter.validateAccountNumber(accountNumber)
                }
              }
          />
        }
        <div className = { 'mylearning-adjustment' }>
        <div className = { 'mylearning-card-container' }>
          {
          mylearning.map((value, idx) => (
            <Card
              className = { 'mylearning-card-adjustment' } key={ idx }>
              <div
                className = { value.styleName }
                text = { value.title }
                onClick = { () => history.push(value.path) }>
                <p className = { 'mylearning-option-cards' }> { value.title } </p>
              </div>
            </Card>
          ))
          }
        </div>
      </div>
    </div>)

    return (
      <div>
        <Switch>
          <Route path = '/mylearning/trainings' render = { props =>
            <MyTrainingFragment { ...props } /> } />
          <Route exact path = '/mylearning/podcasts' render = { props =>
            <PodcastFragment { ...props } /> } />
          <Route exact path = '/mylearning/podcasts/:id' render = { props =>
            <PodcastPlayerFragment { ...props } /> } />
          <Route path = '/mylearning/books' render = { props =>
            <LibraryView { ...props } /> } />
          <Route path = '/mylearning' render = { MyLearning } />
        </Switch>
      </div>
    )
  }
}

MyLearningView.propTypes = {
  setSelectedNavigation: PropTypes.func,
}
export default ConnectView(MyLearningView, Presenter)
