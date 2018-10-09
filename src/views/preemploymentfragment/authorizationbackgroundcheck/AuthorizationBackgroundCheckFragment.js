import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import { Progress } from 'react-sweet-progress'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
  Line,
  MultipleAttachments
} from '../../../ub-components/'

import Presenter from './presenter/AuthorizationBackgroundCheckPresenter'
import ResponseModal from '../../notice/NoticeResponseModal'

import "react-sweet-progress/lib/style.css"
import './styles/authorizationStyle.css'

import AuthorizationBackgroundPreviewModal from './modal/AuthorizationBackgroundPreviewModal'

class AuthorizationBackgroundCheckFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      showPdfViewModal : false,
      pdfFile: ''
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(8)
  }

  onCheckedPdf (link) {
    this.presenter.getOnBoardingDocument(link)
  }

  showPdfFileView (pdfFile) {
    this.setState({ pdfFile })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  render() {
    const {
      history,
      percentage
    } = this.props

    const {
      showPdfViewModal,
      pdfFile
    } = this.state

    return(
    <div>
      { super.render() }
      {
        showPdfViewModal &&
        <AuthorizationBackgroundPreviewModal
          pdfFile = { pdfFile }
          onClose = { () => this.setState({ showPdfViewModal: false }) }
          />
      }
      <div>
        <br/>
          <div className = { 'percentage-grid' }>
            <div>
            <h2 className={ 'header-margin-default text-align-left' }>Authorization of Background Checks</h2>
            <h2>Make sure that you download the attached Data form before proceeding</h2>
            </div>
            <Progress
              type = { 'circle' }
              height = { 100 }
              width = { 100 }
              percent={ percentage } />
          </div>
        <br/>
        <div className = { 'abc-grid-card' }>
        <Card
          className = { 'abc-card' }
          onClick = { () => {
            this.onCheckedPdf('/2018-10-01/12345-Authorization - Background Check-1538362916663.pdf')
            this.setState({ showPdfViewModal : true  })
            }
          }>
          <div className = { 'abc-grid-x2' }>
            <h2> Authorization For Background Check </h2>
            <div>
              <span
                className = { 'abc-icon biographical-seemore-button' }/>
            </div>
          </div>
        </Card>
        </div>
        <br/>
        <Line />
      </div>
    </div>
    )
  }
}

AuthorizationBackgroundCheckFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
  birthArray : PropTypes.array
}

AuthorizationBackgroundCheckFragment.defaultProps = {
}

export default ConnectView(AuthorizationBackgroundCheckFragment, Presenter)
