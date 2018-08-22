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
      styleName: 'mylearning-cards-1 font-weight-bold',
      title: 'Borrow Books',
      path: '/mylearning/books',
    }, {
      id: 1 ,
      styleName: 'mylearning-cards-2 font-weight-bold',
      title: 'Listen Podcasts',
      path: '/mylearning/podcasts',
    }, {
      id: 2 ,
      styleName: 'mylearning-cards-3 font-weight-bold',
      title: 'Enroll to Trainings',
      path: '/mylearning/trainings',
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
            <TrainingFragment { ...props } /> } />
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
