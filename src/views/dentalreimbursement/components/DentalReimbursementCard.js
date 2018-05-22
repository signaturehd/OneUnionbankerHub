import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './dentalreimbursement-component-style.css'
import TextBox from './DentalReimbursementTextBox'
import { Modal } from '../modal/DentalReimbursementReviewModal'
import DentalReimbursementProcedureModal from '../modal/DentalReimbursementProcedureModal'
import DentalReimbursementReviewModal from '../modal/DentalReimbursementReviewModal'
import { Card, GenericButton, FileUploader } from '../../../ub-components/'

class DentalReimbursementCard extends Component {
  constructor (props) {
  super(props)
this.state = {
  showConfirmation: false,
  file: '',
  file2: '',
  imagePreviewUrl: '',
  imagePreviewUrl2: '',
  proceedModal : false,
  submit: '',
  warning: '',
  procedure: 'PROCEDURE',
  attachmentsSubmission : [],
}
  this.handleImageChange = this.handleImageChange.bind(this)
  this.handleImageChange2 = this.handleImageChange2.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.showModal = this.showModal.bind(this)
}
showModal () {
  this.setState({ proceedModal : true })
}
handleSubmit(e) {
  e.preventDefault()
  if(this.state.file === '' || this.state.file2 === '') {
    this.setState({warning : 'Upload the needed file the needed'})
  }
  else
  {
  this.setState({showConfirmation : true})
  this.setState({warning : ''})
  }
}

handleImageChange(e) {
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
console.log("file 1:  " + reader)
}
handleImageChange2(e1) {
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
  console.log("file 1:  " + reader)
}

render () {
    const { details, fileReceived, fileReceived2, onClick} = this.props
    const { attachmentsSubmission, showConfirmation, warning, proceedModal, procedure } = this.state
    let {imagePreviewUrl, imagePreviewUrl2} = this.state
    let $imagePreview = null
    let $imagePreview2 = null

    const styleImage = {
        image1 : {
          backgroundImage: `url('${imagePreviewUrl}')`,
          width : '225px',
          height : '200px',
          backgroundSize : 'cover',
          backgroundRepeat : 'no-repeat',
        },
        image2 : {
          backgroundImage: `url('${imagePreviewUrl2}')`,
          width : '225px',
          height : '200px',
          backgroundSize : 'cover',
          backgroundRepeat : 'no-repeat',
        }
      }


    $imagePreview = (<div style = {styleImage.image1}></div>)
    $imagePreview2 = (<div style = {styleImage.image2}></div>)

return (
  <div className = { 'dentalreimbursement-container' }>
    {
      proceedModal &&
      <DentalReimbursementProcedureModal
        show = { this.state.proceedModal }
        presenter = { this.presenter }
        details = { details && details.procedures }
        onClose = { () => this.setState({ proceedModal : false }) } />
    }
    {
      proceedModal &&
      <DentalReimbursementProcedureModal
        show = { this.state.proceedModal }
        presenter = { this.presenter }
        details = { details && details.procedures }
        onClose = { () => this.setState({ proceedModal : false }) } />
    }
    <form onSubmit = { this.handleSubmit }>
      <Card className = { 'dentalreimbursement-card' }>
         <h4>Form Attachments</h4>
       <div className = 'dentalreimbursement-main'>
           <FileUploader
              onChange = { this.handleImageChange }
              placeholder = 'Optical Certificate'
              value = { this.state.file.name } />
          <FileUploader
              onChange = { this.handleImageChange2 }
              placeholder = 'Medical Certificate'
              value = { this.state.file2.name } />
      </div>
        <div className = {'dentalreimbursement-footer-left'}>
         <GenericButton onClick = { () => this.showModal() }
           type = { 'button' }
           text = { this.state.procedure }
           className = {'dentalreimbursement-procedure' } />
       </div>
      </Card>
      <Card className = { 'dentalreimbursement-secondary' }>
        <h2>Uploaded Files</h2>
          <div className = 'dentalreimbursement-main'>
            <h2 className = { 'dentalreimbursement-warning-display' }>{warning}</h2>
           <div className = { 'dentalreimbursement-review' }>
               <div className = { 'dentalreimbursement-image-view' }>
                   {$imagePreview}
               </div>
               <div className = { 'dentalreimbursement-image-view' }>
                   {$imagePreview2}
            </div>
         </div>
        </div>
            <GenericButton
               className = { 'dentalreimbursement-submit' }
               onClick = { this.handleSubmit }
               type = { 'button' }
               text = { 'Submit' }/>
        </Card>
      </form>
    </div>
    )
  }
}
DentalReimbursementCard.propTypes = {
onClose : PropTypes.func,
onClick : PropTypes.func,
procedure : PropTypes.string,
warning : PropTypes.string,
attachmentsSubmission : PropTypes.array,
}
DentalReimbursementCard.defaultProps = {
procedure : 'PROCEDURE',
warning : '',
}
export default DentalReimbursementCard
