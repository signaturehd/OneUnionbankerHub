import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  Modal,
  GenericButton,
  GenericInput,
  CircularLoader,
  SingleInputModal,
  MultipleAttachments,
  Card,
  Line
} from '../../../ub-components/'

import Presenter from './presenter/PagIbigLoanPresenter'

import { Progress } from 'react-sweet-progress'

import ResponseModal from '../../notice/NoticeResponseModal'

import PreEmploymentViewAttachmentsComponent from '../../preemployment/components/PreEmploymentViewAttachmentsComponent'
import ViewAttachmentModal from '../../preemployment/modals/ViewAttachmentModal'

import "react-sweet-progress/lib/style.css"
import './styles/loanStyle.css'

class PagIbigLoanFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      showDeductModal : false,
      enabledLoaderPdfModal : false,
      enabledLoader : false,
      showViewModal : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
      deductId : '',
      deductName : '',
      deductErrorMessage : '',
      deductData : [],
      pagibigLoanAttachment : [{
        name : 'PAG-IBIG Loan'
      }],
      count : 2,
      viewFile : '',
      attachments : []
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(15)
    this.presenter.getPagibiLoanDeduction()
    this.checkAttachments()
  }

  checkAttachments () {
    const {
      pagibigLoanArray
    } = this.props

    this.presenter.getSelectedAttachments(pagibigLoanArray)
  }

  showAttachmentsFileView (data) {
    let arrayNew = [...this.state.attachments]
    const objectArray = {
      file : data
    }
    arrayNew.push(objectArray)
    this.setState({ attachments : arrayNew })
  }

  setFileAttachments (pagibigLoanAttachment) {
    this.setState({ pagibigLoanAttachment })
  }

  getDeduction (deductData) {
    this.setState({ deductName : deductData.deductionLoan })
  }

  saveForm () {
    const {
      deductName
    } = this.state
    this.presenter.savePagibigLoan(deductName)
  }

  uploadForm () {
    const {
      pagibigLoanAttachment
    } = this.state

    const {
      pagibigLoanArray
    } = this.props
    pagibigLoanArray.map((pagibig) =>
      this.presenter.uploadPagibigLoan(pagibig.id, pagibigLoanAttachment)
    )
  }

  addAttachmentsFunc (attachment, tempCount) {
    const attachmentTemp = [...attachment]
    let newCount = tempCount + 1
    this.setState({ count : newCount })
    attachmentTemp.push({
      name : 'Pag-IBIG Loan ' + tempCount
    })
    this.setState({ pagibigLoanAttachment : attachmentTemp })
  }

  noticeResponseResp (noticeResponse) {
    this.setState({ noticeResponse , showNoticeResponseModal : true})
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  showDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : true })
  }

  hideDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : false })
  }

  render() {
    const {
      history,
      percentage,
      pagibigLoanArray
    } = this.props

    const {
      showDeductModal,
      enabledLoaderPdfModal,
      enabledLoader,
      showNoticeResponseModal,
      noticeResponse,
      showViewModal,
      deductId,
      deductName,
      deductErrorMessage,
      pagibigLoanAttachment,
      count,
      viewFile,
      attachments
    } = this.state

    const deductArray = [
      {
        id: 1,
        name: 'Payroll'
      },
      {
        id: 2,
        name: 'One-Time Payment to Pag-IBIG'
      }
    ]

    return(
    <div>
      { super.render() }
      {
        enabledLoaderPdfModal &&
        <Modal>
        <center>
        <br/>
        <h2>Please wait while we we&#39;re validating your submitted documents</h2>
        <br/>
        <CircularLoader show = { enabledLoaderPdfModal }/>
        </center>
        </Modal>
      }
      {
        showDeductModal &&
        <SingleInputModal
          label = { 'Deduction Loan values' }
          inputArray = { deductArray }
          selectedArray = { (deductId, deductName) =>
            this.setState({
              deductId,
              deductName,
              deductErrorMessage : '',
              showDeductModal : false
            })
          }
          onClose = { () => this.setState({ showDeductModal : false }) }
        />
      }
      {
        showNoticeResponseModal &&
        <ResponseModal
          onClose={ () => {
            this.setState({ showNoticeResponseModal : false})
            this.props.reloadPreEmploymentForm()
          }}
          noticeResponse={ noticeResponse }
        />
      }
      {
        showViewModal &&
        <ViewAttachmentModal
          file = { viewFile }
          onClose = { () => this.setState({ showViewModal : false }) }
        />
      }
      <div>
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'header-margin-default text-align-left' }>Pag-IBIG Loan Form</h2>
            <h2>Setup your Pag-IBIG.</h2>
          </div>
          <Progress
            type = { 'circle' }
            height = { 65 }
            width = { 65 }
            percent = { percentage } />
        </div>
        <br/>
        <br/>
        <h2>Where do you want to deduct your loan?</h2>
        <div className = { 'bsp-grid-card' }>
          <GenericInput
            value = { deductName }
            onClick = { () => this.setState({ showDeductModal : true }) }
            errorMessage = { deductErrorMessage }
          />
          <center>
          <GenericButton
          text = { 'Save' }
          onClick = { () => this.saveForm() }/>
          </center>
        </div>
        <br/>
        <Line />
        <br/>
        {
          pagibigLoanAttachment.length !== 0  &&
          pagibigLoanArray.map((status) =>
            <div>
              {
                status.status === 2 || status.status === 4 &&
                <div className = { 'text-align-right' }>
                  <GenericButton
                    text = { 'Add Attachments' }
                    onClick = { () => this.addAttachmentsFunc(pagibigLoanAttachment, count) }
                    />
                </div>
              }
              {
                status.status === 2 ?
                attachments.lenght !== 0 &&
                  enabledLoader ?
                  <center>
                    <br/>
                    <h2>Please wait while we we&#39;re retrieving your documents </h2>
                    <br/>
                    <CircularLoader show = { enabledLoader } />
                    <br/>
                  </center>
                  :
                  <PreEmploymentViewAttachmentsComponent
                    file = { attachments }
                    title = { 'Pag-IBIG Loan' }
                    onClick = { (viewFile) => this.setState({ viewFile, showViewModal : true }) }/>
                    :
                    <div></div>
              }
              {
                status.status === 2 &&
                <div>
                <center>
                  <h4 className = { 'font-size-14px font-weight-lighter' }>
                    Your documents has been submitted for confirmation.
                  </h4>
                </center>
                </div>
              }
              {
                status.status === 4 &&
                <div>
                <center>
                  <h4 className = { 'font-size-14px font-weight-lighter' }>
                    Your documents are verified.
                  </h4>
                </center>
                </div>
              }
              {
                status.status === 1 &&
                <div>
                  <h4>
                    <br/>
                    Form Attachments
                  </h4>
                  <MultipleAttachments
                    count = { count }
                    countFunc = { (count) => this.setState({ count }) }
                    placeholder = { '' }
                    fileArray = { pagibigLoanAttachment }
                    setFile = { (pagibigLoanAttachment) =>
                        this.setState({ pagibigLoanAttachment })
                    }
                    />
                  <center>
                   <GenericButton
                     text = { 'Upload' }
                     onClick = { () => this.uploadForm()
                   }
                   />
                 </center>
                </div>
              }
            </div>
            )
         }
      </div>
    </div>
    )
  }
}

PagIbigLoanFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

PagIbigLoanFragment.defaultProps = {
}

export default ConnectView(PagIbigLoanFragment, Presenter)
