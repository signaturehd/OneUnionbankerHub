import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PayslipPresenter'


import { Card, List, Modal, GenericButton } from '../../ub-components'

import './styles/payslip.css'

class PayslipFragment extends BaseMVPView {

  constructor (props) {
    super(props)

    this.state={
      payslipList : [],
      showMessageModal : true,
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(8)
  }

  showPayslipList (payslipList) {
    this.setState({ payslipList })
  }

  navigate () {
    this.setState({ showMessageModal : false })
    this.props.history.push('/')
  }

  render () {
    const { history }=this.props
    const { showMessageModal }=this.state
    return (
      <div>
        { super.render() }
        <h2 className={ 'header-margin-default ' }> Payslip </h2>
        {
          showMessageModal &&
          <Modal>
            <h1> Coming Soon ! </h1>
            <center>
              <h2> The current feature is not available yet </h2>
              <br/>
              <br/>
            <GenericButton
              text={ 'Ok' }
              onClick={ () => this.navigate() }
              />
            </center>
          </Modal>
        }
      </div>
    )
  }
}

PayslipFragment.propTypes={
  setSelectedNavigation: PropTypes.func,
  history : PropTypes.object,
}
export default ConnectView(PayslipFragment, Presenter)
