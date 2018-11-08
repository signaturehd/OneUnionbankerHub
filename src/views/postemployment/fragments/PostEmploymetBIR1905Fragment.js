import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
  Line ,
  MultipleAttachments
}  from '../../../ub-components/'

import ResponseModal from '../../notice/NoticeResponseModal'

import PostEmploymentViewComponent from '../components/PostEmploymentViewComponent'

import PreEmploymentViewAttachmentsComponent from '../../preemployment/components/PreEmploymentViewAttachmentsComponent'
import ViewAttachmentModal from '../../preemployment/modals/ViewAttachmentModal'

class PostEmploymetBIR1905Fragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPdfViewComponent : false,
      enabledLoader : false,
      birDataFormData : false,
    }
  }

  componentDidMount () {
    this.props.subtitle('Please download and fill-up the Bereau of Internal Revenue(BIR) 1905 Form then attach the document.')
    this.props.title('Bereau of Internal Revenue (BIR) Form 1905.')
    // this.checkAttachments()
  }

  onCheckedPdf (link) {
    this.props.getOnBoardingDocument(link)
  }

  checkAttachments () {
    const {
      bir1905Array
    } = this.props
    console.log('test ' + bir1905Array)
    this.props.getSelectedAttachments(bir1905Array)
  }

  submitForm (id) {

  }

  render () {
    const {
      enabledLoaderPdfModal,
      pdfFile,
      pageId,
      bir1905Array,
      attachmentsData,
      count
    } = this.props

    const {
      enabledLoader,
      showPdfViewComponent,
    } = this.state
    console.log(bir1905Array)
    console.log(attachmentsData)

    return (
      <div>
        <div className = { 'postemployment-grid-card' }>
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
          <Card
            onClick = { () => {
              try {
                this.onCheckedPdf('/2018-10-30/12345-BIR Form 1905-1540879726833.pdf')
                this.setState({ showPdfViewComponent : true  })
                console.log('tst')
              } catch (e) {
                console.log(e)
              }
              }
            }
            className = { 'postemployment-card' }>
            <div className = { 'postemployment-grid-x2' }>
              <h2>Download BIR 1905 Form</h2>
              <div>
                <span className = { 'postemployment-icon postemployment-seemore-button' }/>
              </div>
            </div>
          </Card>
          {
            showPdfViewComponent &&
            <PostEmploymentViewComponent
              pdfFile = { pdfFile }
              onClose = { () => this.setState({ showPdfViewComponent: false }) }
            />
          }
        </div>
        <br/>
        <Line />
        <br/>
          {
              bir1905Array.map((status) =>
              <div>
                {
                  status.status === 1  &&
                  <div className = { 'text-align-right' }>
                    <GenericButton
                      text = { 'Add Attachments' }
                      onClick = { () => this.props.addAttachmentsFunc(attachmentsData, count) }
                      />
                  </div>
                }
                {
                  status.status === 2 ?
                  attachments.length !== bir1905Array.length &&
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
                      title = { 'BIR 1905' }
                      file = { attachments }
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
                      BIR 1905 Attachments
                    </h4>
                    <br/>
                    <MultipleAttachments
                      count = { count }
                      countFunc = { (count) => this.setState({ count }) }
                      placeholder = { '' }
                      fileArray = { attachmentsData }
                      setFile = { (attachmentsData) =>
                          this.setState({ attachmentsData })
                      }
                    />
                    <center>
                      <GenericButton
                      text = { 'Upload' }
                      onClick = { () => {
                        // this.setState({ enabledLoader : true })
                        // this.submitForm(status.id)
                      }
                    }/>
                    </center>
                  </div>
                }
              </div>
              )
           }
      </div>
    )
  }
}

export default PostEmploymetBIR1905Fragment
