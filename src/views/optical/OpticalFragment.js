import React, { Component } from 'react'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/OpticalPresenter'
import ConnectView from '../../utils/ConnectView'

import OpticalCard from './components/optical-card/'
import './styles/optical.css'

class OpticalFragment extends BaseMVPView {
  constructor(props) {
    super(props)
  }
  navigate () {
      this.props.history.push('/benefits/medical')
  }
  render () {
    return (
      <div  className = { 'benefits-container' }>
        <div className={ 'breadcrumbs-container' }>
          <i className = { 'left' } onClick = { this.navigate.bind(this) }></i>
          <h1>Optical Fragment</h1>

        </div>
          <div className = { 'optical-container' }>
            <OpticalCard/>
          </div>
      </div>
    )
  }
}

export default ConnectView(OpticalFragment, Presenter)
