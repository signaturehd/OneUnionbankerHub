import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
  MultipleAttachments
}  from '../../../ub-components/'


class PostEmploymentCEAFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ceaAttachments: [{
        name : 'Certificate of Employment'
      }],
      count : 2,
    }
    this.addAttachmentsFunc = this.addAttachmentsFunc.bind(this)
  }

  componentDidMount () {
    this.props.subtitle('Please attach your Certificate of Employment.')
    this.props.title('Certificate of Employment')
  }

  addAttachmentsFunc () {
    const attachmentTemp = [...this.state.ceaAttachments]
    let newCount = this.state.count + 1
    this.setState({ count : newCount })
    attachmentTemp.push({
      name : 'Certificate of Employment ' + this.state.count
    })
    this.setState({ ceaAttachments : attachmentTemp })
  }

  render () {
    const {
      pageId,
    } = this.props

    const {
      count,
      ceaAttachments,
    } = this.state

    return (
      <div>
        <br/>
          <div className = { 'text-align-right' }>
            <GenericButton
              text = { 'Add Attachments' }
              onClick = { () => this.addAttachmentsFunc() }
              />
          </div>
          <div>
            <h4>
              Certificate of Employment Attachments
            </h4>
            <br/>
            <MultipleAttachments
              count = { count }
              countFunc = { (count) => this.setState({ count }) }
              placeholder = { '' }
              fileArray = { ceaAttachments }
              setFile = { (ceaAttachments) =>
                  this.setState({ ceaAttachments })
              }
            />
            <center>
              <GenericButton
                text = { 'Upload' }
                onClick = { () => {
              }
            }/>
            </center>
          </div>
      </div>
    )
  }
}

PostEmploymentCEAFragment.propTypes = {
}
PostEmploymentCEAFragment.defaultProps = {
}

export default PostEmploymentCEAFragment
