import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/CompliancePresenter'
import ResponseModal from '../notice/NoticeResponseModal'
import {
  InputModal,
  Card,
  Modal,
  GenericButton,
  GenericInput,
  CircularLoader,
  FloatingActionButton
 } from '../../ub-components'

import './styles/compliancesStyle.css'

let page = 22;

class ComplianceFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      enabledLoader : false,
      compliancesData : null,
      showEnterPin : false,
      pin : '',
      noticeResponse : null,
      showNoticeResponseModal : false,
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(9)
    this.presenter.getCompliancesPdf(page)
  }

  onNextPage () {
    this.presenter.getCompliancesPdf(++page)
  }

  onPreviousPage () {
    if (page > 1)
      this.presenter.getCompliancesPdf(--page)
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  setCompliancesPdf (compliancesData) {
    this.setState({ compliancesData })
  }

  noticeResponse (noticeResponse, showNoticeResponseModal) {
    this.setState({ noticeResponse, showNoticeResponseModal, showEnterPin : false })
  }

  navigate () {
    this.props.history.push('/')
  }

  render () {
    const { history, onClick, inputProps } = this.props
    const {
      compliancesData,
      page,
      enabledLoader,
      showEnterPin,
      pin,
      noticeResponse,
      showNoticeResponseModal,
    } = this.state
    const pageNumber = compliancesData ? compliancesData[0].page : 1
    const pageTotal = compliancesData ? compliancesData[0].total : 1

    return (
      <div>
      {
        showNoticeResponseModal &&
        <ResponseModal
          onClose = { () => {
            this.setState({ showNoticeResponseModal : false })
            this.navigate()
          }}
          noticeResponse = { noticeResponse }
        />
      }
      {
        showEnterPin &&
        <Modal
          onClose={ () => this.setState({ showEnterPin : false }) }
          isDismisable={ true }
          >
          <div>
            <p className = { 'pin-label' }>Please enter your registered digital signature (PIN).</p>
            <GenericInput
              autocomplete = { 'off' }
              value = { pin }
              onChange = { e => this.setState({ pin : parseInt(e.target.value) || '' }) }
              text = { 'Password' }
              type = { 'password' }
              maxLength = { 5 }
              inputProps = { 'pin-label' }
            />
            <p className={ 'pin-label font-12' }>Please enter your 5-digits code</p>
            <br/>
            <GenericButton
              type = { 'button' }
              text = { 'Submit' }
              onClick = {
                () => {
                  this.presenter.submitPin(String(pin))
                  this.setState({ showEnterPin : false, pin : '' })
                }
              }
              className={ 'compliance-buttons compliance-submit' }
              />
          </div>
        </Modal>
      }

      {
        enabledLoader ?
        <center className = { 'circular-loader-center' }>
          <CircularLoader show = { enabledLoader }/>
        </center> :
        <div className={ 'compliance-body' }>
          <div></div>
          <div>
            <div className={ 'compliance-container' }>
              {
                compliancesData &&
                compliancesData.map((compliance, key) => <div key = { key } dangerouslySetInnerHTML = {{ __html : compliance.content }}></div>)
              }
              <div>
                <h6 className={ 'compliance-page' }>Page { pageNumber } - {pageTotal}</h6>
              </div>
            </div>
            <br/>
            <div className={ 'buttons-grid-2' }>
              {
                ( pageNumber > 1 ) ?
                <GenericButton
                  type = { 'button' }
                  text = { 'Previous' }
                  onClick = {
                    () => this.onPreviousPage()
                  }
                  className={ 'compliance-buttons' }
                  /> :
                  <div></div>
              }
              {
                ( pageNumber >= pageTotal ) ?
                <GenericButton
                  type = { 'button' }
                  text = { 'I Acknowledge' }
                  onClick = {
                    () => this.setState({ showEnterPin : true })
                  }
                  className={ 'compliance-buttons' }
                  /> :
                <GenericButton
                  type = { 'button' }
                  text = { 'Next' }
                  onClick = {
                    () => this.onNextPage()
                  }
                  className={ 'compliance-buttons' }
                  />
              }
            </div>
          </div>
        </div>
      }
      </div>
    )
  }
}

ComplianceFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
  onClick: PropTypes.func,
  history: PropTypes.object,
}

export default ConnectView(ComplianceFragment, Presenter)


/*
  <div className={ `ic-previous` } onClick = {() => this.onPreviousPage()}></div>
  <div className={ `ic-next` } onClick = {() => this.onNextPage()}></div>
*/
