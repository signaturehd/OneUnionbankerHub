import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import { Progress } from 'react-sweet-progress'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/AuthorizationBackgroundCheckPresenter'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
  Line,
  MultipleAttachments
} from '../../../ub-components/'

import ResponseModal from '../../notice/NoticeResponseModal'

import AuthorizationBackgroundCheckViewPdfComponent from './components/AuthorizationBackgroundCheckViewPdfComponent'

import "react-sweet-progress/lib/style.css"
import './styles/authorizationStyle.css'

class AuthorizationBackgroundCheckFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      pdfFile: '',
      showPdfViewComponent : false,
      enabledLoaderPdfModal : false,
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

  showDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : true })
  }

  hideDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : false })
  }


  render() {
    const {
      percentage
    } = this.props

    const {
      pdfFile,
      showPdfViewComponent,
      enabledLoaderPdfModal,
    } = this.state

    return(
    <div>
      { super.render() }
      {
        enabledLoaderPdfModal &&
        <Modal>
          <div>
            <center>
              <br/>
              {
                showPdfViewComponent ?

                <h2>Please wait while we we&#39;re retrieving the documents</h2> :
                <h2>Please wait while we we&#39;re validating your submitted documents</h2>
              }
              <br/>
              <CircularLoader show = { enabledLoaderPdfModal }/>
              <br/>
            </center>
          </div>
        </Modal>
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
            this.setState({ showPdfViewComponent : true  })
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
        {
          showPdfViewComponent &&
          <AuthorizationBackgroundCheckViewPdfComponent
            pdfFile = { pdfFile }
            onClose = { () => this.setState({ showPdfViewComponent: false }) }
          />
        }
        </div>
        <br/>
        <Line />
      </div>
    </div>
    )
  }
}

AuthorizationBackgroundCheckFragment.propTypes = {
  onSendPageNumberToView  : PropTypes.func,
  birthArray : PropTypes.array
}

AuthorizationBackgroundCheckFragment.defaultProps = {
}

export default ConnectView(AuthorizationBackgroundCheckFragment, Presenter)
