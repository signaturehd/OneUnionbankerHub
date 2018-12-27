import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/MobilePresenter'
import ConnectView from '../../utils/ConnectView'

/* Mobile View Components */
import MobileHeaderComponent from './components/MobileHeaderComponent'

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
      height: '-webkit-fill-available',
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
            <br/>
            <h2>awdawd</h2>
            <span className = { 'mobile-view-phone-vertical mobile-view-phone-vertical-detail' }/>
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
