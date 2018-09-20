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

import Presenter from './presenter/AffirmDocumentPresenter'

import { Progress } from 'react-sweet-progress'

import 'react-sweet-progress/lib/style.css'
import './styles/affirmDocumentStyle.css'

import AffirmationEnrollPinModal from './modals/AffirmationEnrollPinModal'
import AffirmationDocumentPreviewModal from './modals/AffirmationDocumentPreviewModal'

class AffirmationDocumentFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      affirmationPreEmploymentStatus : [],
      previewDataPDF : [],
      showPdfViewModal : false,
      showPinCodeModal: false,
      enabledLoader: false,
      pdfFile: '',
      noticeResponse : [],
      uniquePIN: '',
    }
    this.onCheckedPdf = this.onCheckedPdf.bind(this)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(0)
    this.presenter.getAffirmationsStatus()
  }

  checkedAffirmationPreEmploymentStatus (affirmationPreEmploymentStatus) {
    this.setState({ affirmationPreEmploymentStatus })
  }

  onCheckedPdf (link) {
    this.presenter.getOnBoardingDocument(link)
  }

  showPdfFileView (pdfFile) {
    this.setState({ pdfFile })
  }

  showPinLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  noticeResponse (noticeResponse) {
    this.setState({ noticeResponse })
  }

  render() {
    const {
      history,
      checkPEUndertaking,
      percentage
    } = this.props

    const {
      affirmationPreEmploymentStatus,
      previewDataPDF,
      showPdfViewModal,
      showPinCodeModal,
      pdfFile,
      noticeResponse,
      enabledLoader
    } = this.state

    // const documentCardOptions = [
    //   {
    //     id: 0,
    //     title: 'Pre-Employment Undertaking',
    //     link: '/2018-09-11/12345-Pre-employment Undertaking-1536641036614.pdf',
    //     // nodeStatus : resp.preEmploymentUndertaking
    //   },{
    //     id: 1,
    //     title: 'Acceptable use of IT Resource Policy',
    //     link: '/2018-09-11/12345-Acceptable Use of IT Resource Policy-1536640939395.pdf',
    //     // nodeStatus: resp.itResource
    //   },{
    //     id: 2,
    //     title: 'Undertaking of Confidentiality',
    //     link: '/2018-09-11/12345-Undertaking on Confidentiality-1536641093668.pdf',
    //     // nodeStatus: resp.confidentiality,
    //   },{
    //     id: 3,
    //     title: 'Security of Bank Deposit',
    //     link: '/2018-09-11/12345-Law on Secrecy of Bank Deposits-1536640999233.pdf',
    //     // nodeStatus: resp.bankSecrecy,
    //   },
    // ]
    return(
    <div>
      { super.render() }
      {
        showPinCodeModal &&
        <AffirmationEnrollPinModal
          onClose = { () => this.setState({ showPinCodeModal : false }) }
          enabledLoader = { enabledLoader }
          uniquePIN = { uniquePIN }
          sendPinProps = { (uniquePIN) => this.setState({ uniquePIN }) }
          />
      }
      {
        showPdfViewModal &&
        <AffirmationDocumentPreviewModal
          pdfFile = { pdfFile }
          showPinCodeModal = { () => this.setState({ showPinCodeModal : true, showPdfFileView: false }) }
          onClose = { () => this.setState({ showPdfViewModal: false }) }
          />
      }
      <div>
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'font-size-30px text-align-left' }> Pre Employment Documents Affirmation </h2>
            <br/>
            <h4>Please click and read all documents below and affirm each one. Documents that are marked with checked are already affirmed</h4>
          </div>
          <Progress
            type = { 'circle' }
            height = { 100 }
            width = { 100 }
            percent={ percentage } />
        </div>
        <br/>
        <div className = { 'affirmation-grid-card' }>
          {
            affirmationPreEmploymentStatus.map((resp, key) =>
            <Card
              key = { key }
              className = { 'affirmation-card' }>
              <div className = { 'affirmation-grid-x2' }>
                <h2> { resp.title } </h2>
                <div>
                  {
                    resp.nodeStatus === 1 ?
                    <span className = { 'affirmation-icon affirmation-success float-right' }/>
                    :
                    <span
                      onClick = { () => {
                        this.onCheckedPdf(resp.link)
                        this.setState({ showPdfViewModal : true  })
                      }
                    }
                      className = { 'affirmation-icon affirmation-seemore-button float-right' }/>
                  }
                </div>
              </div>
            </Card>
            )
          }
        </div>
      </div>
    </div>
    )
  }
}

AffirmationDocumentFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

AffirmationDocumentFragment.defaultProps = {
}

export default ConnectView(AffirmationDocumentFragment, Presenter)
