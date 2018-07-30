import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/opticalCardComponent.css'
import Button from './OpticalButton'

import ConnectView from '../../../utils/ConnectView'
import Presenter from '../presenter/OpticalPresenter'
import { GenericTextBox, MultipleFileUploader } from  '../../../ub-components/'

import staticImage from '../../../images/uploadicon-grey.jpg'
import store from '../../../store'
import { NotifyActions } from '../../../actions'



class OpticalCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: null,
      file2: null,
      imagePreviewUrl: null,
      imagePreviewUrl2: null,
      warning: null,
      amount : 0
    }

    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleImageChange2 = this.handleImageChange2.bind(this)
  }

  getExtension (filename) {
    const parts = filename.split('/')
    return parts[parts.length - 1]
  }


  handleImageChange (e) {
    e.preventDefault()

    const reader = new FileReader()
    const [file] = e.target.files
    let isValid
      switch (this.getExtension(file.type).toLowerCase()) {
        case 'jpeg' :
          isValid = true
          break
        case 'jpg' :
          isValid = true
          break
        case 'png' :
          isValid = true
          break
        case 'pdf' :
          isValid = true
          break
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

  handleImageChange2 (e1) {
    e1.preventDefault()
    const reader2 = new FileReader()
    const [file2] = e1.target.files
    let isValid
      switch (this.getExtension(file2.type).toLowerCase()) {
        case 'jpeg' :
          isValid = true
          break
        case 'jpg' :
          isValid = true
          break
        case 'png' :
          isValid = true
          break
        case 'pdf' :
          isValid = true
          break
    }
      if (isValid) {
         reader2.onloadend = () => {
           this.setState({
             file2,
             imagePreviewUrl2: reader2.result
           })
         }
         reader2.readAsDataURL(file2)
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

  render () {
    const {
      proceedModal,
      props,
      fileReceived,
      fileReceived2,
      onClick,
      attachmentsData,
      showEditSubmitButton
    } = this.props

    const {
      confirm,
      cancel,
      warning,
      amount,
      file2,
      file,
      imagePreviewUrl,
      imagePreviewUrl2,
      acceptNumber,
    } = this.state

    return (
        <div className = { 'optical-card' } >
          <div>
            <div className = {'optical-header'} >
              <div className = { 'optical-amount-field' }>
                <GenericTextBox
                  value = { amount }
                  placeholder = { 'Enter Amount' }
                  maxLength = { 4 }
                  onChange = { e => this.setState({ amount: parseInt(e.target.value, 10) || 0 }) }
                />
              </div>
              <div className = {'optical-body'}>
                <br/>
                  {
                    attachmentsData.length !== 0  ?
                      <MultipleFileUploader
                        placeholder = { 'Form Attachments' }
                        fileArray = { attachmentsData }
                        getFile = { (resp) => setAttachmentArrayFunc(resp) }
                        disabled = { showEditSubmitButton }
                        errorMessage = { 'Please include required attachment' }
                      />
                    :
                    <div></div>
                  }
              </div>
              <div className = { 'optical-button-submit' }>
                <Button onClick = { () => onClick(
                  true, file, file2, amount, imagePreviewUrl, imagePreviewUrl2)}/>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  OpticalCard.propTypes = {
    onClose : PropTypes.func,
    details : PropTypes.func,
    attachmentsData : PropTypes.func,
    confirm : PropTypes.string,
    cancel : PropTypes.string,
    warning : PropTypes.string,
    showEditSubmitButton : PropTypes.bool,
  }

  OpticalCard.defaultProps = {
    confirm : 'Submit',
    cancel : 'Cancel',
    warning : '',

  }
export default OpticalCard
