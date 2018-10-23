import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
}  from '../../../ub-components/'

import ResponseModal from '../../notice/NoticeResponseModal'

import PreEmploymentViewAttachmentsComponent from '../../preemployment/components/PreEmploymentViewAttachmentsComponent'
import ViewAttachmentModal from '../../preemployment/modals/ViewAttachmentModal'

class PostEmploymetBIR1905Fragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      pageId
    } = this.props

    return (
      <div>
      { super.render() }

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
              <h2 className={ 'header-margin-default text-align-left' }>Bureau of Internal Revenue(BIR) Form</h2>
              <h2>Please download the BIR 1902 form by clicking the button below</h2>
              </div>
              <Progress
                type = { 'circle' }
                height = { 65 }
                width = { 65 }
                percent = { percentage } />
            </div>
          <br/>
          <div className = { 'bir-grid-card' }>
            <Card
              onClick = { () => {
                this.onCheckedPdf('/2018-09-28/12345-BIR Form-1538123091552.pdf')
                this.setState({ showPdfViewComponent : true  })
                }
              }
              className = { 'bir-card' }>
              <div className = { 'bir-grid-x2' }>
                <h2>BIR 1902 Form</h2>
                <div>
                  <span className = { 'bir-icon biographical-seemore-button' }/>
                </div>
              </div>
            </Card>
          </div>
          {
            showPdfViewComponent &&
            <Bir1902ViewPdfComponent
              pdfFile = { pdfFile }
              onClose = { () => this.setState({ showPdfViewComponent: false }) }
            />
          }
          <br/>
          <Line />
          <br/>
          {
            bir1902FormData.length !== 0  &&
            bir1902Array.map((status) =>
              <div>
                {
                  status.status === 2 || status.status === 4 &&
                  <div className = { 'text-align-right' }>
                    <GenericButton
                      text = { 'Add Attachments' }
                      onClick = { () => this.addAttachmentsFunc(bir1902FormData, count) }
                      />
                  </div>
                }
                {
                  attachments.lenght !== 0 &&
                    enabledLoader ?
                    <center>
                    <CircularLoader show = { enabledLoader } />
                    </center>
                    :
                    <PreEmploymentViewAttachmentsComponent
                      file = { attachments }
                      onClick = { (viewFile) => this.setState({ viewFile, showViewModal : true }) }/>
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
                 status.status  === 1 &&
                  <div>
                    <h4>
                      <br/>
                      Form Attachments
                    </h4>
                    <MultipleAttachments
                      count = { count }
                      countFunc = { (count) => this.setState({ count }) }
                      placeholder = { '' }
                      fileArray = { bir1902FormData }
                      setFile = { (bir1902FormData) =>
                          this.setState({ bir1902FormData })
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

PostEmploymetBIR1905Fragment.propTypes = {
}
PostEmploymetBIR1905Fragment.defaultProps = {
}

export default PostEmploymetBIR1905Fragment
