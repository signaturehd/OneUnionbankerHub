import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PayslipPresenter'

import PayslipCardComponent from './components/PayslipCardComponent'
import PayslipDetailsModal from './modals/PayslipDetailsModal'
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
      pdfFile: null,
      showPayslipDetails: false,
      index : 3,
      viewMoreText : 'View more',
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

  setPdfFile (pdfFile) {
    this.setState({ pdfFile })
  }

  navigate () {
    this.props.history.push('/')
  }
  render () {
    const {
      payslipList,
      employeeId,
      payslipResult,
      showPayslipDetails,
      pdfFile,
      index,
      viewMoreText
    } = this.state

    const { history }=this.props
    const empId = employeeId && employeeId.employeeNumber

    return (

      <div className={ 'payslip-container' }>
        { super.render() }
        {
          showPayslipDetails &&
            <PayslipDetailsModal
              pdfFile = { pdfFile }
              showPayslipDetails = { showPayslipDetails }
              onClose={ () => this.setState({ showPayslipDetails: false, pdfFile : null }) }
            />
        }
        <div>
          <h2 className={ 'header-margin-default text-align-left' }> My Pay </h2>
          <h2>View your most recent payslip</h2>
        </div>
        <br/>
          <PayslipCardComponent
            index = { index }
            viewMoreText = { viewMoreText }
            viewMore = { () => this.setState({ index : payslipList.length, viewMoreText : 'View less' }) }
            viewLess = { () => this.setState({ index : 3, viewMoreText : 'View more' }) }
            payslipList={ payslipList }
            showPayslipDetails={showPayslipDetails}
            onSubmit={ (date) =>
                  {this.selectedDate(empId, date) , this.setState({ showPayslipDetails : true })}
             }
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
