import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/educationAidModalStyle.css'

import imageDefault from '../../../images/profile-picture.png'
import { format } from '../../../utils/numberUtils'

class EducationAidReviewModal extends Component {

  constructor (props) {
    super (props)

    this.state={
      disableSubmit : false,
      isDismisable : true
    }
  }

  render () {
    const {
      data,
      onClose,
      submitForm
    }=this.props

    const {
       disableSubmit,
       isDismisable
    }=this.state

    const fileORName = {
       "name" : data.fileOR.name,
       "attachments" : data.imagePrevOR
     }
     const fileCOGName  = {
       "name" : data.fileCOG.name,
       "attachments" : data.imagePrevCOG
     }
     const fileRegFormName  = {
       "name" : data.fileCOG.name,
       "attachments" : data.imagePrevRegForm
     }

     const fileAttachments = [fileORName, fileCOGName, fileRegFormName]

    const styles={
      image1 : {
        backgroundImage: `url('${ data.imagePrevOR }')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      },
      image2 : {
        backgroundImage: `url('${ data.imagePrevCOG }')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      },
      image3 : {
        backgroundImage: `url('${ data.imagePrevRegForm }')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      }
    }

    return (
      <Modal
        isDismisable={ isDismisable }
        onClose={ onClose }
      >
        <div>
          <h2>Education Aid Description</h2>
          <br/>
          <h4>College/University : { data.collegeType ? data.collegeType : '(Not Yet Provided)' }</h4>
          <h4>Course : { data.courseText ? data.courseText  : '(Not Yet Provided)'  }</h4>
          <h4>Academic Year : { data.academicYearText ? data.academicYearText  : '(Not Yet Provided)'  }</h4>
          <h4>Semester : { data.semesterText ? data.semesterText  : '(Not Yet Provided)'  }</h4>
          <h4>General Weighted Average : { data.gwaText ? data.gwaText : '(Not Yet Provided)'  }</h4>
          <h4>Tuition Fee : { data.tuitionFeeText ? format(data.tuitionFeeText)  : '(Not Yet Provided)'  }</h4>
          <h4>Registration Fee : { data.registrationFeeText ? format(data.registrationFeeText)  : '(Not Yet Provided)'  }</h4>
          <h4>Total Fee : { data.resultTotalFee ? format(data.resultTotalFee)  : '(Not Yet Provided)'  }</h4>
          <h4>Total Reimbursment : { data.totalReimbursment ? format(data.totalReimbursment)  : '(Not Yet Provided)'  }</h4>
          <h4>File OR : { data.fileOR.name ? data.fileOR.name  : '(Not Yet Provided)'  }</h4>
          <h4>File COG : { data.fileCOG.name ? data.fileCOG.name  : '(Not Yet Provided)'  }</h4>
          <h4>File Registration Form : { data.fileRegForm.name ? data.fileRegForm.name  : '(Not Yet Provided)'  }</h4>
          <br/>
          <div className={ 'educationAid-image-display' }>
            <div style={ styles.image1 ? styles.image1 : '' }></div>
            <div style={ styles.image2 ? styles.image2 : '' }></div>
            <div style={ styles.image3 ? styles.image3 : '' }></div>
          </div>
          <br/>
          <center>
            <GenericButton

              onClick = { () => {
                this.setState({ disableSubmit : true, isDismisable: false })
                submitForm(
                  data.courseText,
                  data.academicYearText,
                  data.semesterText,
                  data.gwaText,
                  data.tuitionFeeText,
                  data.registrationFeeText,
                  data.schoolID,
                  fileAttachments
                )
              }
            }
              text={ 'confirm' }
              disabled = {this.state.disabled}
            />
            <GenericButton
              text={ 'cancel' }
              onClick={ onClose } />
          </center>
        </div>
      </Modal>
    )
  }
}

EducationAidReviewModal.propTypes={
  onClose : PropTypes.func,
  details : PropTypes.func,
  confirm : PropTypes.string,
  cancel : PropTypes.string
}
EducationAidReviewModal.defaultProps={
  confirm : 'Agree',
  cancel : 'Disagree',
}

export default EducationAidReviewModal
