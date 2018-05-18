import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/optical-card-component.css'
import Button from './OpticalButton'

import ConnectView from '../../../utils/ConnectView'
import Presenter from '../presenter/OpticalPresenter'
import { GenericTextBox, FileUploader } from  '../../../ub-components/'

import staticImage from '../../../images/uploadicon-grey.jpg'

class OpticalCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: '',
      file2: '',
      imagePreviewUrl: ``,
      imagePreviewUrl2: ``,
      warning: '',
      amount : 0
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
    const { proceedModal, props, fileReceived, fileReceived2, onClick } = this.props
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

    const styles = {
      image1 : {
        backgroundImage: `url('${imagePreviewUrl}')`,
        width : '225px',
        height : '240px',
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat',
      },
      image2 : {
        backgroundImage: `url('${imagePreviewUrl2}')`,
        width : '225px',
        height : '240px',
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat',
      }
    }

    let $imagePreview = null
    let $imagePreview2 = null
      $imagePreview = (<div style = {styles.image1}></div>)
      $imagePreview2 = (<div style = {styles.image2}></div>)
    return (
        <div className = { 'optical-card' } >
          <form onSubmit={this._handleSubmit}>
            <div className = {'optical-header'} >
              <h5 >Form Attachments</h5>
              <div className = { 'optical-amount-field' }>
                <GenericTextBox
                  value = { amount }
                  placeholder = { 'Enter Amount' }
                  onChange = { (e) => this.setState({ amount: parseInt(e.target.value) || 0 }) }
                />
              </div>
              <div className = {'optical-body'}>
                <br/>
                <FileUploader
                  onChange = { this._handleImageChange }
                  placeholder = 'Optical Certificate'
                  value = { this.state.file.name }
                />
                <FileUploader
                  onChange = { this._handleImageChange2 }
                  placeholder = 'Medical Certificate'
                  value = { this.state.file2.name }
                />
              </div>
              <div className = { 'optical-button-submit' }>
                <Button onClick = { () => onClick(
                  true, file, file2, amount, imagePreviewUrl, imagePreviewUrl2)}/>
              </div>
            </div>
            <div className = {'optical-footer-left'}>
              <h2 className = { 'optical-warning-display' }>{warning}</h2>
              <div className = { 'optical-grid' }>
                <div className = { 'optical-image-view' }>
                  {$imagePreview}
                  <div className = { 'optical-image-layer' }></div>
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
export default OpticalCard
