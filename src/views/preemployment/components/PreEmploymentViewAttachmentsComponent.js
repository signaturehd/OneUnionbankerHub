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

  render () {
    const {
      file,
      onClick
    } = this.props

    return (
      <div className = { 'grid-attachment' }>
        {
          file.map((resp) =>
          <Card onClick = { () => onClick(resp.file) }>
              <img src = { resp.file } className = { 'view-size' }/>
          </Card>
          )
        }
      </div>

    )
  }
}

PreEmploymentViewAttachmentsComponent.propTypes = {
}
PreEmploymentViewAttachmentsComponent.defaultProps = {
}

export default PreEmploymentViewAttachmentsComponent
