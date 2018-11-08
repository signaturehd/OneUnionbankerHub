import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
}  from '../../../ub-components/'


class PostEmploymentBIR2316Fragment extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.subtitle('Please download and fill-up the Bereau of Internal Revenue(BIR) 2316 Form then attach the document.')
    this.props.title('Bereau of Internal Revenue (BIR) Form 2316.')
  }

  render () {
    const {
      pageId,
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

PostEmploymentBIR2316Fragment.propTypes = {
}
PostEmploymentBIR2316Fragment.defaultProps = {
}

export default PostEmploymentBIR2316Fragment