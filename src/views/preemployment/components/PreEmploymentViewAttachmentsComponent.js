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
      <Card onClick = { () => onClick(file) }>
          <img src = { file } className = { 'view-size' }/>
      </Card>
    )
  }
}

PreEmploymentViewAttachmentsComponent.propTypes = {
}
PreEmploymentViewAttachmentsComponent.defaultProps = {
}

export default PreEmploymentViewAttachmentsComponent
