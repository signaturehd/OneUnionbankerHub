import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/MyLearningPresenter'

import PodcastFragment from '../podcast/PodcastFragment'
import PodcastPlayerFragment from '../podcastplayer/PodcastPlayerFragment'
import LibraryView from '../library/LibraryFragment'
import TrainingFragment from '../trainings/TrainingFragment'
import MyGoalsFragment from '../mygoals/MyGoalsFragment'

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
    const { history, profile, isLineManager } = this.props
    const { accountNumber, showAccountNumberModal } = this.state
    const mylearning = [{
      id: 0 ,
      styleName: 'mylearning-cards-1 mylearning-option-default font-weight-bold',
      title: 'Borrow a Book',
      path: '/mylearning/books/recommended',
    }, {
      id: 1 ,
      styleName: 'mylearning-cards-3 mylearning-option-default font-weight-bold',
      title: 'Listen to a Podcast',
      path: '/mylearning/podcasts',
    }, {
      id: 2 ,
      styleName: 'mylearning-cards-2 mylearning-option-default font-weight-bold',
      title: 'Enroll to Training',
      path: '/mylearning/trainings',
    }, {
      id: 3 ,
      styleName: 'mylearning-cards-4 mylearning-option-default font-weight-bold',
      title: 'My Goals',
      path: '/mylearning/mygoals',
    }]
    const MyLearning = () => (
      <div className = { 'mylearning-container' }>
        <div>
          <h2 className={ 'header-margin-default text-align-left' }> My Learning </h2>
          <h2> How would you want to develop yourself today? </h2>
        </div>
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
              className = { 'mylearning-card' }
              onClick={ () =>
                history.push(value.path)
              }
              key={ idx }>
              <div className = { 'mylearning-column-grid' }>
                <div
                  className={ value.styleName }
                  text={ value.title } >
                </div>
                <p className={ 'mylearning-option-cards font-weight-bold' }>{ value.title }</p>
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
          <Route path = '/mylearning/mygoals' render = { props =>
            <MyGoalsFragment { ...props } /> } />
          <Route path = '/mylearning/trainings' render = { props =>
            <TrainingFragment { ...props } /> } />
          <Route exact path = '/mylearning/podcasts' render = { props =>
            <PodcastFragment { ...props } /> } />
          <Route exact path = '/mylearning/podcasts/:id' render = { props =>
            <PodcastPlayerFragment { ...props } /> } />
          <Route path = '/mylearning/books/recommended' render = { props =>
            <LibraryView { ...props } /> } />
          <Route path = '/mylearning/books/history' render = { props =>
            <LibraryView { ...props } /> } />
          <Route path = '/mylearning/books/all' render = { props =>
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
