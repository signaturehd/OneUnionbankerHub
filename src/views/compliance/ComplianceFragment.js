import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/CompliancePresenter'

import {
  InputModal,
  Card,
  Modal,
  GenericButton,
  GenericTextBox,
  CircularLoader,
  FloatingActionButton
 } from '../../ub-components'

//import './styles/benefits.css'

class ComplianceFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      compliancesData : []
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(9)
    this.presenter.getCompliancesPdf()
  }

  showCircularLoader () {
    this.setState({ enableLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enableLoader : false })
  }

  setCompliancesPdf (compliancesData) {
    this.setState({ compliancesData })
  }

  navigate () {
    this.props.history.push('/')
  }

  render () {
    const { history, onClick } = this.props
    const { compliancesData } = this.state

    return (
      <div>
        <h2 className={'header-margin-default' }>MY COMPLIANCE</h2>
        <div className={ 'tabs-container' }>

          <section id='content1'>
            <h1>HELLO COMPLIANCE</h1>
          </section>
        </div>
      </div>
    )
  }
}

ComplianceFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
  onClick: PropTypes.func,
  history: PropTypes.object,
}

export default ConnectView(ComplianceFragment, Presenter)
