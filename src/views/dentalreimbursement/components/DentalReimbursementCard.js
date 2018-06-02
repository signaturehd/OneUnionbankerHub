import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './dentalreimbursement-component-style.css'
import { Modal } from '../modal/DentalReimbursementReviewModal'
import DentalReimbursementProcedureModal from '../modal/DentalReimbursementProcedureModal'
import DentalReimbursementReviewModal from '../modal/DentalReimbursementReviewModal'
import {
  Card,
  GenericButton,
  FileUploader,
  Checkbox,
  GenericTextBox,
  List
 } from '../../../ub-components/'

 import store from '../../../store'
 import { NotifyActions } from '../../../actions'

class DentalReimbursementCard extends Component {
  constructor (props) {
  super(props)
  this.state = {
    file: '', // file1 array
    file2: '',// file2 array
    imagePreviewUrl: '',
    imagePreviewUrl2: '',
    procedureModal : false, // display procedure modal
    dependents: [],
    selectedDependent: null, //selected dependent
    selectedProcedures: [], //selected procedure
    procedureModal: false,
    reviewModal: false,
    submit: '',
    warning: '',
    procedure: '',
  }
  this.handleImageChange = this.handleImageChange.bind(this)
  this.handleImageChange2 = this.handleImageChange2.bind(this)
  this.submission = this.submission.bind(this)
}
/*
Form Submission
*/

submission() {
  this.props.presenter.addDentalReimbursement(
    this.state.file1,
    this.state.file2,
    this.state.selectedDependent,
    this.state.selectedProcedures
  )
}
/*
Optical Certificate Atachments
*/

getExtension(filename) {
  const parts = filename.split('/');
  return parts[parts.length - 1];
}


handleImageChange(e) {
  e.preventDefault()
  let reader = new FileReader()
  let file = e.target.files[0]
  let isValid
  switch (this.getExtension(file.type).toLowerCase()) {
    case 'jpeg' :
    case 'jpg' :
    case 'png' :
    case 'pdf' :
        isValid = true
  }

  if (isValid) {
     reader.onloadend = () => {
       this.setState({
         file: file,
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
/*
Medical Certificate Atachments
*/
handleImageChange2(e1) {
  e1.preventDefault()
  let reader2 = new FileReader()
  let file2 = e1.target.files[0]
  let isValid = false
  switch (this.getExtension(file2.type).toLowerCase()) {
    case 'jpeg' :
    case 'jpg' :
    case 'png' :
    case 'pdf' :
        isValid = true
  }
  if (isValid) {
     reader2.onloadend = () => {
       this.setState({
         file2: file2,
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
      details,
      fileReceived,
      fileReceived2,
      onClick,
      dependents
    } = this.props

    const {
      reviewModal,
      selectedDependent,
      selectedProcedures,
      procedureModal,
      warning,
      procedure,
      showResults
    } = this.state

    let {imagePreviewUrl, imagePreviewUrl2} = this.state

    let $imagePreview = null
    let $imagePreview2 = null

    const styleImage = {
        image1 : {
          backgroundImage: `url('${imagePreviewUrl}')`,
          width : '225px',
          height : '250px',
          backgroundSize : 'cover',
          backgroundRepeat : 'no-repeat',
        },
        image2 : {
          backgroundImage: `url('${imagePreviewUrl2}')`,
          width : '225px',
          height : '250px',
          backgroundSize : 'cover',
          backgroundRepeat : 'no-repeat',
        }
      }

  $imagePreview = (<div style = {styleImage.image1}></div>)
  $imagePreview2 = (<div style = {styleImage.image2}></div>)

  return (
    <div className = { 'dentalreimbursement-container' }>
      <div onSubmit = { this.handleSubmit }>
        <Card className = { 'dentalreimbursement-card' }>
           <h4>Form Attachments</h4>
         <div className = 'dentalreimbursement-main'>
             <FileUploader
                accept="image/gif,image/jpeg,image/jpg,image/png,"
                onChange = { this.handleImageChange }
                placeholder = 'Official Certificate'
                value = { this.state.file.name } />
            <FileUploader
                accept="image/gif,image/jpeg,image/jpg,image/png,"
                onChange = { this.handleImageChange2 }
                placeholder = 'Medical Certificate'
                value = { this.state.file2.name } />
        </div>

          <div className = {'dentalreimbursement-footer-left'}>
            {
              procedureModal &&
              <DentalReimbursementProcedureModal
                onSubmit = { procedure => {
                  const updatedProcedures = [...selectedProcedures]

                  updatedProcedures.push(procedure)

                  this.setState({ selectedProcedures: updatedProcedures })
                }}
                procedures = { selectedDependent ? selectedDependent.procedures : [] }
                onClose = { () => this.setState({ procedureModal : false }) } />
            }

             <h2 className = { 'dentalreimbursement-header-chooseDependents' }>
               Choose Dependent
             </h2>
             {
               dependents && dependents.map((dependent, key) => {
                 const selectedDependentId = selectedDependent && selectedDependent.id
                 return (
                   <Checkbox
                    label={ dependent.name }
                    key={ key }
                    value={ dependent.id }
                    checked={ dependent.id == selectedDependentId }
                    onChange={ e => this.setState({ selectedDependent: dependent }) } />
                 )
               })
             }
             <GenericButton
               onClick={ () => this.setState({ procedureModal: true }) }
               className = {'dentalreimbursement-procedure' }
               text = { 'Open Procedures' } />
         </div>
         <br/>
         <br/>
         {
           selectedProcedures && selectedProcedures.map((procedure, key) => {
              return (
                <div key={ key } className = { 'dentalreimbursement-selected-procedure' }>
                  <div className = {'input-grid'}>
                    <GenericTextBox
                      value={ procedure.amount }
                      onChange={ e => {
                        const updatedProcedures = [...selectedProcedures]
                        updatedProcedures[key].amount = parseInt(e.target.value) || 0

                        this.setState({ selectedProcedures: updatedProcedures })
                      }}
                      placeholder={ `${procedure.name} (${procedure.limit})` } />
                      <div className = { 'dentalreimbursement-button-close' }>
                        <img
                          src = { require('../../../images/x-circle-global.png') }
                          onClick = { () => {
                            const { selectedProcedures } = this.state
                            selectedProcedures.splice(key, 1)
                            this.setState({selectedProcedures})
                          }}
                        />
                      </div>
                  </div>
                  <br/>
                </div>
              )
            })
         }
        </Card>

        <Card className = { 'dentalreimbursement-secondary' }>
          <h2 className = { 'dentalreimbursement-upload-header' }>Uploaded Files</h2>
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
                 onClick = { this.submission }
                 type = { 'button' }
                 text = { 'Submit' }/>
          </Card>
        </div>
      </div>
    )
  }
}
DentalReimbursementCard.propTypes = {
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  procedure : PropTypes.string,
  warning : PropTypes.string,
  dependents: PropTypes.array,
}
DentalReimbursementCard.defaultProps = {
  procedure : 'PROCEDURE',
  warning : '',
  text: 'procedure'
}

export default DentalReimbursementCard
