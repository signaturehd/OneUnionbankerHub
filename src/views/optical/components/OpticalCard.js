import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'
import TextBox from './OpticalTextBox'
import Button from './OpticalButton'
import Modal from '../modal/OpticalReviewModal'

 class OpticalCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showConfirmation: false,
      file: '',
      file2: '',
      imagePreviewUrl: '',
      imagePreviewUrl2: ''
    }
    this._handleImageChange = this._handleImageChange.bind(this)
    this._handleImageChange2 = this._handleImageChange2.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }
  _handleSubmit(e) {
      e.preventDefault()
      // TODO: do something with -> this.state.file
    }

    _handleImageChange(e) {
      e.preventDefault()

      let reader = new FileReader()
      let file = e.target.files[0]

      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        })
      }

      reader.readAsDataURL(file)
    }
    _handleImageChange2(e1) {
      e1.preventDefault()
      let reader2 = new FileReader()
      let file2 = e1.target.files[0]

      reader2.onloadend = () => {
        this.setState({
          file2: file2,
          imagePreviewUrl2: reader2.result
        })
      }
      reader2.readAsDataURL(file2)
    }

  render () {
    const { proceedModal } = this.props
    const { showConfirmation, showModal, confirm, cancel } = this.state
    let {imagePreviewUrl, imagePreviewUrl2} = this.state;
    let $imagePreview = null;
    let $imagePreview2 = null;
      $imagePreview = (<img className = {'optical-image-view'} src={imagePreviewUrl} />);
      $imagePreview2 = (<img className = {'optical-image-view'} src={imagePreviewUrl2} />);
    return (

      <div className = { 'optical-card' } >
        <form onSubmit={this._handleSubmit}>
          <div className = {'optical-header'} >
            <h5 >Form Attachments</h5>
              <div className = {'optical-body'}>
                <div>
                     <input type="file" onChange={this._handleImageChange} />
                     <input type="file" onChange={this._handleImageChange2} />
                     <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
              </div>
            </div>
        </div>
          <div className = {'optical-footer-left'}>
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
            <div className = { 'optical-button-submit' }>
              <Button onClick={this._handleSubmit} />
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
