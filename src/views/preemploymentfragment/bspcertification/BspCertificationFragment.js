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

import Presenter from './presenter/BspCertificationPresenter'
import BspCertificationViewPdfComponent from './components/BspCertificationViewPdfComponent'

import { Progress } from 'react-sweet-progress'

import "react-sweet-progress/lib/style.css"
import './styles/bspCertificateStyle.css'

class BspCertificationFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      pdfFile: '',
      showPdfViewComponent : false,
      enabledLoaderPdfModal : false,
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(9)
  }

  onCheckedPdf (link) {
    this.presenter.getOnBoardingDocument(link)
  }

  showPdfFileView (pdfFile) {
    this.setState({ pdfFile, showPdfViewComponent : true })
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

    const documentCardOptions = [
      {
        id: 0,
        title: 'Banko Sentral ng Pilipinas(BSP) Certificate',
        link: '/2018-10-16/12345-BSP Certification-1539624445855.pdf',
      }
    ]
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
            <h2 className={ 'header-margin-default text-align-left' }>BSP Certificate Download</h2>
            <h2>Please download the Banko Sentral Pilipinas(BSP) Certificate by clicking the button below.</h2>
          </div>
          <Progress
            type = { 'circle' }
            height = { 65 }
            width = { 65 }
            percent = { percentage } />
        </div>
        <br/>
        <div className = { 'bsp-grid-card' }>
          {
            documentCardOptions.map((resp, key) =>
            <Card
              key = { key }
              className = { 'bsp-card' }
              onClick = { () => {
                this.onCheckedPdf(resp.link)
                this.setState({ showPdfViewModal : true  })
                }
              }>
              <div className = { 'bsp-grid-x2' }>
                <h2> { resp.title } </h2>
                <div className = { 'text-align-right' }>
                  <span
                    className = { 'bsp-icon biographical-seemore-button' }/>
                </div>
              </div>
            </Card>
            )
          }
        </div>
        {
          showPdfViewComponent &&
          <BspCertificationViewPdfComponent
            pdfFile = { pdfFile }
            onClose = { () => this.setState({ showPdfViewComponent: false }) }
          />
        }
      </div>
    </div>
    )
  }
}

BspCertificationFragment.propTypes = {
  onSendPageNumberToView  : PropTypes.func,
}

BspCertificationFragment.defaultProps = {
}

export default ConnectView(BspCertificationFragment, Presenter)
