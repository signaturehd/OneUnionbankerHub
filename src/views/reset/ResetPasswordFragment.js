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
      successMessageComponent: '',
      loader: false,
    }
  }

  showOtpResponse (successMessage, successMessageComponent) {
    this.setState({ successMessage, successMessageComponent })
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
      loader,
      successMessageComponent
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
              <div>
                {
                  successMessageComponent ?

                  <div>
                    <br/>
                    <center>
                      <span  className = { 'upload-success-icon security-icon-settings' }/>
                    </center>
                    <h2>{ successMessage }</h2>
                  </div>

                  :
                  <div>
                    <br/>
                    <center>
                      <span  className = { 'upload-fail-icon security-icon-settings' }/>
                    </center>
                    <h2>Failed: Unable to unlock employee account.</h2>
                    <br/>
                  </div>
                }
              </div>
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
