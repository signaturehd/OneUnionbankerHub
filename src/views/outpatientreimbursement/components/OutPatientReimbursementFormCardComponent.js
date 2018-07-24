import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  Card,
  GenericButton,
  FileUploader
} from '../../../ub-components/'

import './styles/outpatientComponentStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class OutPatientReimbursementFormCardComponent extends Component {
  constructor (props) {
    super (props)
    this.state = {
      attachments : ''
    }
  }

  getExtension (filename) {
    const parts = filename.split('/')
    return parts[parts.length - 1]
  }

  render () {
  const {
    attachments
  } = this.state

  const styles = {
    image1 : {
      backgroundImage: `url('${attachments.image}')`,
      width : 'auto',
      height : '60px',
      backgroundSize : 'contain',
      backgroundRepeat : 'no-repeat',
    }
  }

  return (
    <div className={ 'outpatient-container' }>
      <div className={ 'outpatient-grid-column-2' }>
        <div></div>
        <div>
          <Card className={ 'outpatient-form-card' }>
            <div className={ 'outpatient-form-card-body' }>
            <GenericInput
              value = { '' }
              onChange = {() => {}}
              hint = { 'Recipient' }
              type = { 'text' }/>
            <GenericInput
              value = { '' }
              onChange = {() => {}}
              hint = { 'Official Receipt Date' }
              type = { 'text' }/>
            <GenericInput
              value = { '' }
              onChange = {() => {}}
              hint = { 'Official Receipt Number' }
              type = { 'text' }/>
            <GenericInput
              value = { '' }
              onChange = {() => {}}
              hint = { 'Diagnosis' }
              type = { 'text' }/>
            </div>
            {
              attachments && attachments ?
              <div>
                <label className="outpatient-form-title">Form Attachments</label>
                <div className="outpatient-attachment-form">
                  <img
                    src={ require('../../../ub-components/Notify/images/x-circle.png') }
                    className='close-button'
                    onClick={
                      () => {
                        this.setState({ attachments : '' })
                      }
                    }
                  />
                  <div style = {styles.image1}><h6 className="educ-file-name">{ attachments.file.name }</h6></div>
                </div>
              </div>
              :
              <FileUploader
                accept="image/gif,image/jpeg,image/jpg,image/png,"
                value = { attachments ? attachments.file.name : '' }
                placeholder = { 'Form Attachments' }
                onChange = {
                  (e) => {
                    e.preventDefault()
                    const reader = new FileReader()
                    const attachmentFile = e.target.files[0]
                    let isValid
                    switch (this.getExtension(attachmentFile.type).toLowerCase()) {
                      case 'jpeg' :
                        isValid = true
                      case 'jpg' :
                        isValid = true
                      case 'png' :
                        isValid = true
                      case 'pdf' :
                        isValid = true
                    }

                    if (isValid) {
                      reader.onloadend = () => {
                        let attachments = []
                        attachments.file = attachmentFile
                        attachments.image = reader.result
                        this.setState({ attachments })
                      }
                      reader.readAsDataURL(attachmentFile)
                   } else {
                       store.dispatch(NotifyActions.addNotify({
                           title : 'File Uploading',
                           message : 'The accepted attachments are JPG/PNG/PDF',
                           type : 'warning',
                           duration : 2000
                         })
                       )
                     }
                  }
                }
              />
            }
            <br/>
            <br/>
            <h4>
              Procedures
            </h4>
            <div className={ 'outpatient-form-card-body' }>
            </div>
            <GenericButton
              type = { 'button' }
              text = { 'continue' }
              onClick = {
                () => {}
              }
              className = { 'outpatient-submit' } />
          </Card>
        </div>
      </div>
    </div>
    )
  }
}

export default OutPatientReimbursementFormCardComponent
