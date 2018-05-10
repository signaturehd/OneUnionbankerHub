import React, { Component } from 'react'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/OpticalPresenter'
import ConnectView from '../../utils/ConnectView'
import Card from './components/OpticalCard'
import './styles/optical.css'

class OpticalFragment extends BaseMVPView {

  constructor(props) {
    super(props)
  }

  componentWillMount () {
    this.presenter.getOptical()
  }

  isEligible (resp) {
    // check if eligible
    if (!respo.isvalid) {
      this.props.history.push('/benefits/medical')
    }
  }

  navigate () {
    this.props.history.push('/benefits/medical')
  }

  render () {
    return (
      <div  className = { 'benefits-container' }>
        { super.render() }
        <div className={ 'breadcrumbs-container' }>
          <i className = { 'left' } onClick = { this.navigate.bind(this) }></i>
          <h1>Optical Reimbursement</h1>
        </div>
          <div className = { 'optical-container' }>
            <Card/>
          </div>
      </div>
    )
  }
}

export default ConnectView(OpticalFragment, Presenter)
