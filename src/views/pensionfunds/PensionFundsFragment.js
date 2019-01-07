import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PensionFundsPresenter'

import {
  CircularLoader
} from '../../ub-components/'

import './styles/fundsStyle.css'

class PensionFundsFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      loader : false,
    }
  }

  componentDidMount () {
    this.presenter.getPensionFunds()
  }

  showCircularLoader (loader) {
    this.setState({ loader })
  }

  setPensionFundsData (pensionFundsData) {
    this.setState({ pensionFundsData })
  }

  navigate () {
    this.props.history.push('/phenom')
  }

  render () {

    const {
      loader,
      pensionFundsData
    } = this.state

    return (
      <div className = { 'funds-fragment' }>
        {
          enabledLoader ?
          <CircularLoader show = { loader } />
          :
          <div>
            text
          </div>
        }
      </div>
    )
  }
}

PensionFundsFragment.propTypes = {
}

PensionFundsFragment.defaultProps = {
  selected : -1
}

export default ConnectView (PensionFundsFragment, Presenter)
