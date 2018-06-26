import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PayslipPresenter'


import { Card, List } from '../../ub-components'

import './styles/payslip.css'

class PayslipFragment extends BaseMVPView {

  constructor (props) {
    super(props)

    this.state = {
      payslipList : []
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(8)
  }

  showPayslipList (payslipList) {
    this.setState({ payslipList })
  }

  render () {
    const { history } = this.props

    return (
      <div>
        { super.render() }
        <h2 className = { 'header-margin-default ' }> Payslip </h2>
          <Card>
          </Card>
      </div>
    )
  }
}

PayslipFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}
export default ConnectView(PayslipFragment, Presenter)
