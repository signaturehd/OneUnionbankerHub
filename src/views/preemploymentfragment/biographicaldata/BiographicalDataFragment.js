import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card
} from '../../../ub-components/'

import Presenter from './presenter/BiographicalDataPresenter'

import './styles/biographicalDataStyle.css'

class BiographicalDataFragment extends BaseMVPView {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(2)
  }

  render() {
    const {
      history,
      checkPEUndertaking,
    } = this.props

    return(
    <div>
    { super.render() }
      <div>
        <br/>
        <h2 className={ 'header-margin-default text-align-left' }>Biographical Data</h2>
        <h2>Setup your work experience</h2>
        <br/>
      </div>
    </div>
    )
  }
}

BiographicalDataFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

BiographicalDataFragment.defaultProps = {
}

export default ConnectView(BiographicalDataFragment, Presenter)
