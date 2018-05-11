import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/MyLearningPresenter'

import PodcastView from '../podcast/PodcastView'
import Library from '../library/LibraryFragment'

import { InputModal, Card, GenericButton } from '../../ub-components'

import './styles/benefits.css'

class MyLearningView extends BaseMVPView {
  constructor (props) {
    super(props)
  }

  render () {
    const { history } = this.props
    const benefitsOptions = [{
      id: 0 ,
      styleName: 'option-cards-1',
      title: 'PODCASTS',
      path: '/mylearning/podcast',
    }, {
      id: 1 ,
      styleName: 'option-cards-2',
      title: 'LIBRARY',
      path: '/mylearning/book',
    }]
    const Learning = () => (
      <div className = { '_benefits-container' }>
        <h1>My Learning</h1>
        <div className = { 'adjustment' }>
        <div className = { 'card-container' }>
          {
          benefitsOptions.map((value, idx) => (
            <Card key={ idx }>
              <div
                className = { value.styleName }
                text = { value.title }
                onClick = { () => history.push(value.path) } >
                <p className = { 'benefits-option-cards' }> { value.title } </p>
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
         <Route exact path = '/mylearning' render = { Learning } />
         <Route path = '/mylearning/podcast' render = { props => <PodcastView />}/>
         <Route path = '/mylearning/book' render = { props => <Library />}/>
      </Switch>
    </div>)
  }
}

export default ConnectView(MyLearningView, Presenter)
