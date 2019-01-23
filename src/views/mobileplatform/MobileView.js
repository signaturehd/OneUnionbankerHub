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
import MobileDiscountComponent from './components/MobileDiscountComponent'

import './styles/mobileStyle.css'

class MobileView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      iosUserGuide : false,
    }
  }

  render () {
    const {
      platformUsed
    } = this.props

    const {
      iosUserGuide
    } = this.state

    const bodyStyle = {
      backgroundImage: `url(${require('../../images/mobileview/bg.png')})`,
      backgroundSize: 'cover',
      padding: '0',
      height: `${iosUserGuide ? '-webkit-fill-available' : 'fit-content'}`,
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
            <MobileHeaderComponent
              iosUserGuide = { iosUserGuide }
              platformUsed = { platformUsed }
              iosUserGuideFunc = { (iosUserGuide) => this.setState({ iosUserGuide }) }
              />
            <div>
              {
                iosUserGuide ?
                <div></div>
                :
                <div>
                  <img
                    src = { require('../../images/mobileview/login phone.png') }
                    style = {{
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
                  <br/>
                  <MobileDiscountComponent/>
                  <br/>
                  <br/>
                  <br/>
                  <center>
                    <h4
                      style = {{
                        fontSize : '12pt'
                      }}
                      className = { 'font-weight-normal unionbank-color mobile-view-label-detail' }>Check our Data Privacy Statement</h4>
                    <br/>
                    <h2
                      style = {{
                        fontSize : '8pt'
                      }}
                      className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>&#169; 2018 Union Bank of the Philippines</h2>
                  </center>
                </div>
              }
            </div>
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
