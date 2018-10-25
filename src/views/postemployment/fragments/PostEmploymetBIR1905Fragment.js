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

  componentDidMount () {
    this.props.subtitle('Please download and fill-up the Bereau of Internal Revenue(BIR) 1905 Form then attach the document.')
    this.props.title('Bereau of Internal Revenue (BIR) Form 1905.')
  }

  render () {
    const {
      pageId
    } = this.props

    return (
      <div>
        <div className = { 'postemployment-grid-card' }>
          <Card
            onClick = { () => {
              this.onCheckedPdf('/2018-10-15/12345-BSP Biographical Data-1539596592662.pdf')
              this.setState({ showPdfViewComponent : true  })
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
            // showPdfViewComponent &&
            // <BiographicalViewerComponent
            //   pdfFile = { pdfFile }
            //   onClose = { () => this.setState({ showPdfViewComponent: false }) }
            // />
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
