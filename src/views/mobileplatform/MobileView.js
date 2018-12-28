import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/MobilePresenter'
import ConnectView from '../../utils/ConnectView'

/* Mobile View Components */
import MobileHeaderComponent from './components/MobileHeaderComponent'
import MobileFeaturesComponent from './components/MobileFeaturesComponent'
import MobileNewsFeedComponent from './components/MobileNewsFeedComponent'
import MobileMyLearningComponent from './components/MobileMyLearningComponent'
import MobileTeamGoalsComponent from './components/MobileTeamGoalsComponent'
import MobileOnboardingComponents from './components/MobileOnboardingComponents'

import './styles/mobileStyle.css'

class MobileView extends BaseMVPView {
  constructor (props) {
    super(props)
  }

  componentDidMount () {

  }

  render () {
    const bodyStyle = {
      backgroundImage: `url(${require('../../images/mobileview/bg.png')})`,
      backgroundSize: 'cover',
      padding: '0',
      height: 'fit-content',
      width: '-webkit-fill-available',
      margin: '0',
    }

   return (
      <div
        style = {
          bodyStyle
        }>
        <div className = { 'mobile-view-grid-row' }>
          <div></div>
          <div>
            <MobileHeaderComponent />
            <img
              src = { require('../../images/mobileview/login phone.png') }
              style = {{
                marginTop: '-120px',
                height: '100%',
                width : '100%'
              }}/>
            <MobileFeaturesComponent />
            <br/>
            <MobileNewsFeedComponent />
            <br/>
            <br/>
            <br/>
            <br/>
            <MobileMyLearningComponent />
            <br/>
            <br/>
            <MobileTeamGoalsComponent/>
            <br/>
            <br/>
            <MobileOnboardingComponents/>
            <br/>
            <div></div>
            <br/>
            <div></div>
            <br/>
            <div></div>
          </div>
          <div></div>
        </div>
      </div>
    )
  }
}
MobileView.propTypes = {
  setSelectedNavigation: PropTypes.func,
}
export default ConnectView(MobileView, Presenter)
