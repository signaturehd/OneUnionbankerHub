import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/boarding-styles.css'


import {
  Card,
  GenericButton,
  FileUploader,
  Checkbox,
  GenericTextBox,
  List
 } from '../../../ub-components/'


class ImgPrevUploader extends Component {
  constructor (props) {
  super(props)
  this.state = {
    file: '', // file1 array
    file2: '',// file2 array
    imagePreviewUrl: '',
    imagePreviewUrl2: '',
    procedureModal : false, // display procedure modal
    dependents: [],
    selectedDependent: null, // selected dependent
    selectedProcedures: [], // selected procedure
    procedureModal: false,
    reviewModal: false,
    submit: '',
    procedure: '',
    showReviewSubmissionModal : false,
  }
  this.handleImageChange = this.handleImageChange.bind(this)
}

/*
Official Certificate Atachments
*/

getExtension (filename) {
  const parts = filename.split('/')
  return parts[parts.length - 1]
}

/*
  Form Submission
*/

handleImageChange (e) {
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

render () {
  const {
    details,
    fileReceived,
    onClick,
    dependents
  } = this.props

  const {
    reviewModal,
    selectedDependent,
    selectedProcedures,
    procedureModal,
    procedure,
    showResults,
    showReviewSubmissionModal,
    file,
  } = this.state

  const { imagePreviewUrl } = this.state

  let $imagePreview = null

  const styleImage = {
    image1 : {
      backgroundImage: `url('${imagePreviewUrl}')`,
      width : '220px',
      height : '225px',
      backgroundSize : 'cover',
      backgroundRepeat : 'no-repeat',
    }
  }

  $imagePreview = (<div className = { 'avatar' } style = {styleImage.image1}></div>)

  return (
    <div>
      <div>
        <Card >
           <h4>Profile Photo Attachment</h4>
         <div >
          <FileUploader
            accept="image/gif,image/jpeg,image/jpg,image/png,"
            onChange = { this.handleImageChange }
            value = { this.state.file.name } />
        </div>
        </Card>
        <Card>
          <h2>
            Uploaded Files
          </h2>
          <div>
            <div >
             <div>
               <center>
                 {$imagePreview}
               </center>
             </div>

           </div>
          </div>
        </Card>
      </div>
    </div>
    )
  }
}
ImgPrevUploader.propTypes = {
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  procedure : PropTypes.string,
  dependents: PropTypes.array,
}
ImgPrevUploader.defaultProps = {
  procedure : 'PROCEDURE',
  text: 'procedure'
}

export default ImgPrevUploader
