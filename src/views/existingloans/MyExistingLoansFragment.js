import React from 'react'
import PropTypes from 'prop-types'

import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/MyExistingLoansPresenter'

import MyExistingLoansCardComponent from './components/MyExistingLoansCardComponent'

import {
  CircularLoader,
  Card,
  GenericButton,
} from '../../ub-components/'

import './styles/myExistingLoanStyle.css'

class MyExistingLoansFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      existingLoans : [],
      enabledLoader: false,
    }
  }

  componentDidMount () {
    this.presenter.getExistingLoans()
  }

  showGetExistingLoans (existingLoans) {
    this.setState({ existingLoans })
  }

  showCircularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  render () {
    const { history } = this.props
    const { existingLoans, enabledLoader } = this.state
    return (
      <div>
        {
          enabledLoader ?

          <div className = { 'existing-loans-loader' }>
            <center>
              <CircularLoader show = { true } />
            </center>
          </div>
          :
          <div className = { 'existing-loans-grid-container' }>
          {
            existingLoans.map((resp, key) => (
              <MyExistingLoansCardComponent
                key = { key }
                description = { resp.description }
                amortization = { resp.amortization }
                balance = { resp.balance }
                promissoryNote = { resp.promissoryNote }
                date = { resp.date }
                />
              )
            )
          }
          </div>
        }
      </div>
    )
  }
}

MyExistingLoansFragment.propTypes = {
}

MyExistingLoansFragment.defaultProps = {
}

export default ConnectPartial(MyExistingLoansFragment, Presenter)
