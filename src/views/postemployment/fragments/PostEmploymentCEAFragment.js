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

class PostEmploymentCEAFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPdfViewComponent : false,
      birDataFormData : false,
    }
  }

  componentDidMount () {
    this.props.subtitle('Please attach your Certificate of Employment.')
    this.props.title('Certificate of Employment')
    this.checkAttachments()
  }

  checkAttachments () {
    const {
      certificateArray
    } = this.props
    this.props.getSelectedAttachments(certificateArray)
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
      attachments,
      certificateArray
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

        </div>
          {
              certificateArray.map((status) =>
              <div>
                {
                  status.status === 1  &&
                  <div className = { 'text-align-right' }>
                    <GenericButton
                      text = { 'Add Attachments' }
                      onClick = { () => {
                        try {
                          this.props.addAttachmentsFunc(attachmentsData, count)
                        } catch (e) {
                          console.log(e)
                        }
                      } }
                      />
                  </div>
                }
                {
                  status.status === 2 ?
                  attachments.length !== certificateArray.length &&
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
                      title = { 'Certificate of Employment ' }
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

PostEmploymentCEAFragment.propTypes = {
}
PostEmploymentCEAFragment.defaultProps = {
}

export default PostEmploymentCEAFragment
