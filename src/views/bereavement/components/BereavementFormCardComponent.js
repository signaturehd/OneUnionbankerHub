import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import './styles/bereavementComponentStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import moment from 'moment'

class BereavementFormCardComponent extends Component {
  constructor (props) {
    super (props)
    this.state = {
      file: '',
      imagePreviewUrl: null
    }
  }

  getExtension (filename) {
    const parts = filename.split('/')
    return parts[parts.length - 1]
  }

  render () {

    const {
      presenter,
      withDeathCert
    } = this.props

    const {
      file,
      imagePreviewUrl
    } = this.state

    const styles = {
      image1 : {
        backgroundImage: `url('${imagePreviewUrl}')`,
        width : 'auto',
        height : '60px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      }
    }

    return (
      <div className = {'brv-container'}>
        <div className = { 'brv-grid-column-2' }>
          <div></div>
          <Card className = { 'brv-form-card' }>
            <h4>
            Deceased Detail
            </h4>
            <div className = {'brv-form-card-body '}>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'Deceased Name' }
                type = { 'text' }/>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'Relationship' }
                type = { 'text' }/>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'Date of Birth' }
                type = { 'text' }/>
              <br/>
              <br/>
            </div>
          </Card>
        </div>
        <br/>
        <br/>
        <div className = { 'brv-grid-column-2' }>
          <div></div>
          <Card className = { 'brv-form-card' }>
            <h4>
            Funeral Detail
            </h4>
            <div className = {'brv-form-card-body '}>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'Date of Wake' }
                type = { 'text' }/>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'Location' }
                type = { 'text' }/>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'Funeral Home' }
                type = { 'text' }/>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'Address' }
                type = { 'text' }/>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'City' }
                type = { 'text' }/>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'Region' }
                type = { 'text' }/>
              <br/>
              <br/>
            </div>
          </Card>
        </div>
        <br/>
        <br/>
        <div className = { 'brv-grid-column-2' }>
          <div></div>
          <Card className = { 'brv-form-card' }>
            <h4>
            Internment Detail
            </h4>
            <div className = {'brv-form-card-body '}>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'Date of Internment' }
                type = { 'text' }/>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'Location of Internment' }
                type = { 'text' }/>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'Memorial Park' }
                type = { 'text' }/>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'Address' }
                type = { 'text' }/>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'City' }
                type = { 'text' }/>
              <GenericTextBox
                value = {''}
                onChange = {() => {}}
                placeholder = { 'Region' }
                type = { 'text' }/>
              {
                !withDeathCert &&
                <GenericButton
                  type = { 'button' }
                  text = { 'continue' }
                  onClick = {
                    () => console.log('clicked submit')
                  }
                  className = { 'brv-submit' } />
              }
            </div>
          </Card>
        </div>

        {
          withDeathCert &&
          <div>
          <br/>
          <br/>
          <div className = { 'brv-grid-column-2' }>
            <div></div>
            <Card className = { 'brv-form-card' }>
              <h4>
              Form Attachments
              </h4>
              <div className = {'brv-form-card-body '}>

                {
                  imagePreviewUrl &&
                  <div>
                    <label className="brv-form-title">Form Attachments</label>
                    <div className="brv-attachment-form">
                      <img
                        src={ require('../../../ub-components/Notify/images/x-circle.png') }
                        className='close-button'
                        onClick={
                          () => {
                            this.setState({ file : '', imagePreviewUrl : null })
                          }
                        }
                      />
                      <div style = {styles.image1}><h6 className="brv-file-name">{ file.name }</h6></div>
                    </div>
                  </div>
                }

                {
                  !imagePreviewUrl &&
                  <FileUploader
                    accept="image/gif,image/jpeg,image/jpg,image/png,"
                    value = { file.name }
                    placeholder = 'Form Attachments'
                    onChange = {
                      (e) => {
                        e.preventDefault()
                        const reader = new FileReader()
                        const file = e.target.files[0]
                        let isValid
                        switch (this.getExtension(file.type).toLowerCase()) {
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
                            this.setState({
                              file,
                              imagePreviewUrl: reader.result
                            })
                          }
                          reader.readAsDataURL(file)
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

                <GenericButton
                  type = { 'button' }
                  text = { 'continue' }
                  onClick = {
                    () => {}
                  }
                  className = { 'brv-submit' } />
              </div>
            </Card>
          </div>
        </div>
        }

      </div>
    )
  }
}

export default BereavementFormCardComponent