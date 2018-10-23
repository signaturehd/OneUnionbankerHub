import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Modal,
  GenericButton,
  CircularLoader
}  from '../../../ub-components/'

import './styles/viewAttachment.css'

class PreEmploymentViewAttachmentsComponent extends Component {
  constructor (props) {
    super(props)
  }
  extensionFunc(file) {
    let bool = false
    let extension = file.split(';')

    extension[0] == 'data:image/png' ||
    extension[0] == 'data:image/jpg' ||
    extension[0] == 'data:image/jpeg' ?
    bool = true
    :
    bool = false

    return bool
  }

  render () {
    const {
      file,
      onClick,
      title
    } = this.props

    return (
      <div>
        <h2 className = { 'text-align-left font-weight-bold font-size-18px' }>{ title } Attachments</h2>
        <br/>
        <div className = { 'grid-attachment' }>
          {
            file.map((resp) =>
              <Card onClick = { () => onClick(resp.file) }>
              <div>
              {
                this.extensionFunc(resp.file) ?
                  <img src = { resp.file } className = { 'view-size' }/>
                  :
                  <span className = { 'view-size pdf-img' }/>
              }
              </div>
              </Card>
            )
          }
        </div>
      </div>

    )
  }
}

PreEmploymentViewAttachmentsComponent.propTypes = {

}

export default PreEmploymentViewAttachmentsComponent
