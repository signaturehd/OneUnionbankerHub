import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/PagIbigPresenter'

import {
  Modal,
  GenericButton,
  CircularLoader,
  MultipleAttachments,
  GenericInput,
  Card,
  Line,
} from '../../../ub-components/'

import { Progress } from 'react-sweet-progress'
import ResponseModal from '../../notice/NoticeResponseModal'

import PagIbigViewPdfComponent from './components/PagIbigViewPdfComponent'

class PagIbigFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
      showPdfViewComponent : false,
      pdfFile: '',
      pagibigAttachment : [{
        name : 'Pag-IBIG Form'
      }],
      count : 2
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(14)
  }

  onCheckedPdf (link) {
    this.presenter.getOnBoardingDocument(link)
  }

  showPdfFileView (pdfFile) {
    this.setState({ pdfFile })
  }

  addAttachmentsFunc (attachment, tempCount) {
    const attachmentTemp = [...attachment]
    let newCount = tempCount + 1
    this.setState({ count : newCount })
    attachmentTemp.push({
      name : 'Pag-IBIG Form ' + tempCount
    })
    this.setState({ pagibigAttachment : attachmentTemp })
  }

  uploadForm () {
    const {
      pagibigAttachment
    } = this.state

    const {
      pagibigArray
    } = this.props
    pagibigArray.map((pagibig) =>
      this.presenter.uploadPagibigForm(pagibig.id, pagibigAttachment)
    )
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

  render () {
    const {
      enabledLoader,
      showPdfViewComponent,
      pdfFile,
      count,
      noticeResponse,
      showNoticeResponseModal,
      pagibigAttachment
    } = this.state

    const { percentage, pagibigArray } = this.props

    return (
      <div>
        { super.render() }
        {
          enabledLoader &&
          <Modal>
          <center>
          <CircularLoader show = { enabledLoader }/>
          </center>
          </Modal>
        }
        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false})
            }}
            noticeResponse={ noticeResponse }
          />
        }
        <div className = { 'percentage-grid' }>
          <div>
          <h2 className={ 'header-margin-default text-align-left' }>Pag-IBIG</h2>
          <br/>
          <h2>Set up your Pag-IBIG</h2>
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
              this.onCheckedPdf('/2018-09-28/12345-Pagibig Form-1538123144111.pdf')
              this.setState({ showPdfViewComponent : true  })
              }
            }>
            <div className = { 'abc-grid-x2' }>
              <h2>Pag Ibig MDR Form</h2>
              <div>
                <span
                  className = { 'abc-icon biographical-seemore-button' }/>
              </div>
            </div>
          </Card>
          {
            showPdfViewComponent &&
            <PagIbigViewPdfComponent
              pdfFile = { pdfFile }
              onClose = { () => this.setState({ showPdfViewComponent: false }) }
            />
          }
          </div>
        <br/>
        <Line />
        <br/>
          {
            pagibigAttachment.length !== 0  &&
            pagibigArray.map((status) =>
              <div>
                {
                  status.status === 2 &&
                  <div>
                  <center>
                    <h4 className = { 'font-size-14px font-weight-lighter' }>
                      Your documents has been <b>submitted for confirmation</b>.
                    </h4>
                  </center>
                  </div>
                }
                {
                  status.status === 4 &&
                  <div>
                  <center>
                    <h4 className = { 'font-size-14px font-weight-lighter' }>
                      Your documents are <b>verified</b>.
                    </h4>
                  </center>
                  </div>
                }
              </div>
            )
          }
          {
            pagibigArray.length === 0 &&
            <div>
              <div className = { 'grid-global' }>
                <h2></h2>
                <div className = { 'text-align-right' }>
                  <GenericButton
                    text = { 'Add Attachments' }
                    onClick = { () => this.addAttachmentsFunc(pagibigAttachment, count) }
                    />
                </div>
              </div>
              <h4>
                <br/>
                Form Attachments
              </h4>
              <MultipleAttachments
                count = { count }
                countFunc = { (count) => this.setState({ count }) }
                placeholder = { 'Pag Ibig MDR Attachments' }
                fileArray = { pagibigAttachment }
                setFile = { (pagibigAttachment) =>
                    this.setState({ pagibigAttachment })
                }
                />
              <center>
               <GenericButton
                 text = { 'Save' }
                 onClick = { () => this.uploadForm()  }
               />
             </center>
            </div>
          }
      </div>
    )
  }
}

PagIbigFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(PagIbigFragment, Presenter )
