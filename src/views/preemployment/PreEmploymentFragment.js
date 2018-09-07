import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import { Modal, GenericButton } from '../../ub-components/'

import Presenter from './presenter/PreEmploymentPresenter'

import './styles/preEmploymentStyle.css'

class PreEmploymentFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      welcomeModal : true,
      isDismisable : true,
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(11)
  }

  render() {
    const {
      setSelectedNavigation,
      selected,
      tempPreEmploymentModal,
      history,
      onChangeStatusPreEmploymentModal
    } = this.props

    const { isDismisable  } = this.state
    return(
      <div>
      {
        tempPreEmploymentModal &&
        <Modal
          isDismisable = { isDismisable  }
          >
          <center>
            <h2 className = { 'font-weight-bold font-size-24px' }>Hello</h2>
            <br/>
            <h2 className = { 'unionbank-color font-weight-lighter font-size-18px' }>
              Welcome to Unionbank!
            </h2>
            <br/>
            <br/>
          </center>
          <div className = { 'text-align-right' }>
            <GenericButton
              className = { 'pre-emp-setup-button' }
              text = { 'SETUP MY ACCOUNT' }
              onClick = { () => onChangeStatusPreEmploymentModal() }
               />
          </div>
        </Modal>
      }
      awdawd
      </div>
    )
  }
}

PreEmploymentFragment.propTypes = {
  setSelectedNavigation : PropTypes.func,
  selected : PropTypes.number,
  tempPreEmployment : PropTypes.number,
}

PreEmploymentFragment.defaultProps = {
  selected : -1
}

export default ConnectView(PreEmploymentFragment, Presenter)
