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
  consolelog(file) {
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
      onClick
    } = this.props

    return (
      <div className = { 'grid-attachment' }>
        {
          file.map((resp) =>
            <Card onClick = { () => onClick(resp.file) }>
            <div>
            {
              this.consolelog(resp.file) ?
                <img src = { resp.file } className = { 'view-size' }/>
                :
                <span className = { 'view-size pdf-img' }/>
            }
            </div>
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
