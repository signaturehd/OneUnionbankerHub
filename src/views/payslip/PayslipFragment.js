import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PayslipPresenter'

import PayslipCardComponent from './components/PayslipCardComponent'

import { Card, Modal, GenericButton, GenericSelect } from '../../ub-components'

import './styles/payslip.css'

class PayslipFragment extends BaseMVPView {

  constructor (props) {
    super(props)

    this.state={
      payslipList : [],
      showMessageModal : false,
      employeeId : [],
      payslipResult : [],
      showPayslipDetails: false
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(8)
    this.presenter.getPayslip()
    this.presenter.getProfile()
  }

  showPayslipList (payslipList) {
    this.setState({ payslipList })
  }

  getEmployeeId (employeeId) {
    this.setState({ employeeId })
  }

  getSelectedDate (payslipResult) {
    this.setState({ payslipResult })
  }

  selectedDate (empId, date) {
    this.presenter.addPayslipSelectedDate(empId, date)
  }

  displayShowDetails () {
    this.setState({ showPayslipDetails : true })
  }

  navigate () {
    this.props.history.push('/')
  }
  render () {
    const { payslipList, employeeId, payslipResult, showPayslipDetails }=this.state
    const { history }=this.props
    const empId=employeeId && employeeId.employeeNumber

    return (
      <div className={ 'payslip-container' }>
        { super.render() }
        {
          showPayslipDetails &&

            <PayslipDetailsModal
              payslipResult={ payslipResult }
              onClose={ () => this.setState({ showPayslipDetails: false }) }
            />
        }

        <h2 className={ 'header-margin-default ' }> Payslip </h2>
          <PayslipCardComponent
            payslipList={ payslipList }
            onSubmit={ (date) => this.selectedDate(empId, date) }
          />
      </div>
    )
  }
}

PayslipFragment.propTypes={
  setSelectedNavigation: PropTypes.func,
  history : PropTypes.object,
}

export default ConnectView(PayslipFragment, Presenter)
