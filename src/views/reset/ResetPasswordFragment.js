import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/ResetPasswordPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import {
  Card,
  CircularLoader,
  GenericButton
} from '../../ub-components/'

import NoticeResponse from '../notice/NoticeResponseModal'

import { connect } from 'react-redux'

import store from '../../store'
import { NotifyActions } from '../../actions'

import './styles/reset.css'

class ResetPasswordFragment extends BaseMVPView {

  constructor (props) {
    super(props)
    this.state = {
      token: '',
      successMessage: '',
      loader: false,
    }
  }

  showOtpResponse (successMessage) {
    this.setState({ successMessage })
  }

  showCircularLoader () {
    this.setState({ loader : true })
  }

  hideCircularLoader () {
    this.setState({ loader : false })
  }

  componentDidMount () {
    const {
      token
    } = this.props.match.params
    this.setState({ token : token })
    this.presenter.requestOtpVerification(token)
  }

  render () {
    const {
      token,
      successMessage,
      loader
    } = this.state

    const {
      idReplace,
      history,
      notify,
    } = this.props

    return (
      <Card className = {'login-form'}>
        { super.render() }
        {
          loader ?

          <center className = { 'circular-loader-center' }>
            <h2>Please wait...</h2>
            <br/>
            <CircularLoader show = { true }/>
          </center>
          :
          <div>
            <br/>
            <div
              className = { 'login-back-icon-grid cursor-pointer' }>
              <i
                onClick = { () => history.push('/') }
                className = { 'back-arrow' }></i>
              <div></div>
            </div>
            <div className = { 'circular-loader-center' }>
              <br/>
              <center>
                <span  className = { 'upload-success-icon security-icon-settings' }/>
              </center>
              <h2>Successfully  Unlocked Account Pin</h2>
              <br/>
              <h2>{ successMessage }</h2>
              <GenericButton
                className = { 'profile-button-small' }
                onClick = { () => history.push('/') }
                text = { 'Ok' }
                />
            </div>
          </div>
        }
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  notify : state.notify.notify
})

export default ConnectView(connect(mapStateToProps)(ResetPasswordFragment), Presenter)
