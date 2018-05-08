import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'
import Button from './OpticalButton'
import Modal from '../modal/OpticalReviewModal'
import ConnectView from '../../../utils/ConnectView'
import Presenter from '../presenter/OpticalPresenter'
import  FileUploader  from  '../../../ub-components/FileUploader/Uploader'
import  GenericTextBox  from  '../../../ub-components/TextBox/GenericTextBox'

class OpticalCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showConfirmation: false,
      file: '',
      file2: '',
      imagePreviewUrl: '',
      imagePreviewUrl2: '',
      warning: '',
    }
    this._handleImageChange = this._handleImageChange.bind(this)
    this._handleImageChange2 = this._handleImageChange2.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit (e) {
    e.preventDefault()
    if (this.state.file === '' || this.state.file2 === '') {
      this.setState({ warning : 'Please complete the attached forms' })
    } else {
    this.setState({ showConfirmation : true })
    this.setState({ warning : '' })
    }
  }
  _handleImageChange (e) {
    e.preventDefault()

    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      })
    }

    reader.readAsDataURL(file)
  }

  _handleImageChange2 (e1) {
    e1.preventDefault()
    const reader2 = new FileReader()
    const file2 = e1.target.files[0]

    reader2.onloadend = () => {
      this.setState({
        file2,
        imagePreviewUrl2: reader2.result
      })
    }
    reader2.readAsDataURL(file2)
  }

  render () {
    const { proceedModal, props, fileReceived, fileReceived2 } = this.props
    const { 
      showConfirmation, 
      confirm, 
      cancel, 
      warning, 
      amount, 
      imagePreviewUrl, 
      imagePreviewUrl2, 
      acceptNumber, 
    } = this.state
    let $imagePreview = null
    let $imagePreview2 = null
      $imagePreview = (<img className = {'optical-image'} src={imagePreviewUrl} />)
      $imagePreview2 = (<img className = {'optical-image'} src={imagePreviewUrl2} />)
    return (
        <div className = { 'optical-card' } >
          {
            showConfirmation &&
            <Modal
              fileReceived = { this.state.file }
              fileReceived2 = { this.state.file2 }
              onClose = { () => this.setState({ showConfirmation : false }) }>
            </Modal>
          }
          <form onSubmit={this._handleSubmit}>
            <div className = {'optical-header'} >
              <h5 >Form Attachments</h5>
              <div className = { 'optical-amount-field' }>
              <GenericTextBox value = { amount } 
                              placeholder = { 'Enter Amount' } 
                              onChange = { (e) => this.setState({ amount: parseInt(e.target.value) || 0 }) }/>
              </div>
                <div className = {'optical-body'}>
                       <FileUploader className = { 'optical-file-left' } onChange={this._handleImageChange} />
                       <FileUploader className = { 'optical-file-right' } onChange={this._handleImageChange2} />
              </div>
              <div className = { 'optical-button-submit' }>
                <Button />
              </div>
          </div>
            <div className = {'optical-footer-left'}>
              <h2 className = { 'optical-warning-display' }>{warning}</h2>
              <div className = { 'optical-modal-review' }>
                <div className = { 'optical-image-view' }>
                    {$imagePreview}
                  <div className = { 'optical-image-layer' }>
                  </div>
                </div>
                <div className = { 'optical-image-view' }>
                    {$imagePreview2}
                  <div className = {  'optical-image-layer' }></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )
    }
  }

  OpticalCard.propTypes = {
    onClose : PropTypes.func,
    details : PropTypes.func,
    confirm : PropTypes.string,
    cancel : PropTypes.string,
  }

  OpticalCard.defaultProps = {
    confirm : 'Submit',
    cancel : 'Cancel',
  }
export default ConnectView(OpticalCard, Presenter)
