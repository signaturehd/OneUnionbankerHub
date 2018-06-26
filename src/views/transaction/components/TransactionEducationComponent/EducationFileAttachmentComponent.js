import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { CircularLoader } from '../../../../ub-components/'

class EducationFileAttachmentComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details, attachments } = this.props
    return (
      <div className={ 'transaction-card-details' }>
        <center><h4 className={ 'details-bold' }> Attachments </h4></center>
          {
            attachments ?
              <div className={ 'transaction-attachments-container' }>
                {
                  attachments.map((image, key) => (
                    <img
                      key = { key }
                      className={ 'transaction-attachments _img-ub-logo' }
                      src={image}
                    />
                  ))
                }
              </div>              :
              <center>
                <br/>
                <br/>
                  <CircularLoader show={true}/>
                <br/>
                <br/>
              </center>
          }
      </div>
    )
  }
}

export default EducationFileAttachmentComponent
