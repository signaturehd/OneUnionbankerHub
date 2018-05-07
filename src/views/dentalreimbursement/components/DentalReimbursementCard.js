import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'
import TextBox from './DentalReimbursementTextBox'
import Button from './DentalReimbursementButton'
import Modal from '../modal/DentalReimbursementReviewModal'

class DentalReimbursementCard extends Component {
constructor (props) {
super(props)
this.state = {
  showConfirmation: false,
  file: '',
  file2: '',
  imagePreviewUrl: '',
  imagePreviewUrl2: '',
  warning: ''
}
this._handleImageChange = this._handleImageChange.bind(this)
this._handleImageChange2 = this._handleImageChange2.bind(this)
this._handleSubmit = this._handleSubmit.bind(this)
}
_handleSubmit(e) {
  e.preventDefault()
  if(this.state.file === '' || this.state.file2 === '') {
    this.setState({warning : 'Please Uploaded the needed'})
  }
  else
  {
  this.setState({showConfirmation : true})
  this.setState({warning : ''})
  }
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
const { proceedModal, props, fileReceived, fileReceived2} = this.props
const { showConfirmation, confirm, cancel, warning } = this.state
let {imagePreviewUrl, imagePreviewUrl2} = this.state;
let $imagePreview = null;
let $imagePreview2 = null;
  $imagePreview = (<img className = {'dentalreimbursement-image-view'} src={imagePreviewUrl} />);
  $imagePreview2 = (<img className = {'dentalreimbursement-image-view'} src={imagePreviewUrl2} />);
return (
<div className = { 'dentalreimbursement-card' } >
  {
    showConfirmation &&
    <Modal
      fileReceived = { this.state.file }
      fileReceived2 = { this.state.file2 }
      onClose = { () => this.setState({ showConfirmation : false }) }>
    </Modal>
  }
  <form onSubmit={this._handleSubmit}>
    <div className = {'dentalreimbursement-header'} >
      <h5 >Form Attachments</h5>
        <div className = {'dentalreimbursement-body'}>
          <div>
               <input type="file" onChange={this._handleImageChange} />
               <input type="file" onChange={this._handleImageChange2} />
        </div>
      </div>
      <div className = { 'dentalreimbursement-button-submit' }>
        <Button />
      </div>
  </div>
    <div className = {'dentalreimbursement-footer-left'}>
      <h2 className = { 'dentalreimbursement-warning-display' }>{warning}</h2>
      <div className = { 'dentalreimbursement-modal-review' }>
        <div className = { 'dentalreimbursement-image-view' }>
            {$imagePreview}
          <div className = { 'dentalreimbursement-image-layer' }>
          </div>
        </div>
        <div className = { 'dentalreimbursement-image-view' }>
            {$imagePreview2}
          <div className = {  'dentalreimbursement-image-layer' }></div>
        </div>
      </div>
    </div>
  </form>
</div>
)
}
}
DentalReimbursementCard.propTypes = {
onClose : PropTypes.func,
details : PropTypes.func,
confirm : PropTypes.string,
cancel : PropTypes.string,
}
DentalReimbursementCard.defaultProps = {
confirm : 'Submit',
cancel : 'Cancel',
}
export default DentalReimbursementCard
