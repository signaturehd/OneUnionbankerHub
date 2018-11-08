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

class PostEmploymentBIR2316Fragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPdfViewComponent : false,
      birDataFormData : false,
    }
  }

  componentDidMount () {
    this.props.subtitle('Please download and fill-up the Bereau of Internal Revenue(BIR) 2316 Form then attach the document.')
    this.props.title('Bereau of Internal Revenue (BIR) Form 2316.')
    this.checkAttachments()
  }

  checkAttachments () {
    const {
      bir2316Array
    } = this.props
    this.props.getSelectedAttachments(bir2316Array)
  }

  render () {
    const {
      enabledLoaderPdfModal,
      pdfFile,
      pageId,
      bir2316Array,
      attachmentsData,
      enabledLoader,
      count,
      attachments
    } = this.props

    const {
      showPdfViewComponent,
    } = this.state

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
                this.onCheckedPdf('/2018-10-30/12345-BIR Form 2316-1540879749374.pdf')
                this.setState({ showPdfViewComponent : true  })
                console.log('tst')
              } catch (e) {
                console.log(e)
              }
              }
            }
            className = { 'postemployment-card' }>
            <div className = { 'postemployment-grid-x2' }>
              <h2>Download BIR 2316 Form</h2>
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
              bir2316Array.map((status) =>
              <div>
                {
                  status.status === 1  &&
                  <div className = { 'text-align-right' }>
                    <GenericButton
                      text = { 'Add Attachments' }
                      onClick = { () =>
                          this.props.addAttachmentsFunc(attachmentsData, count)
                        }
                      />
                  </div>
                }
                {
                  status.status === 2 ?
                  attachments.length !== bir2316Array.length &&
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
                      title = { 'BIR 2316' }
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
                      BIR 2316 Attachments
                    </h4>
                    <br/>
                    <MultipleAttachments
                      count = { count }
                      countFunc = { (count) => this.props.countFunc(count) }
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
                        this.props.submitForm(status.id)
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

PostEmploymentBIR2316Fragment.propTypes = {
}
PostEmploymentBIR2316Fragment.defaultProps = {
}

export default PostEmploymentBIR2316Fragment
