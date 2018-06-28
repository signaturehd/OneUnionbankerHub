import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/educationModalStyle.css'

import imageDefault from '../../../images/profile-picture.png'

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
      collegeID,
      tuitionFee,
      registrationFee,
      collegeType,
      course,
      academicYear,
      semester,
      gwa,
      fileOR,
      fileCOG,
      fileRegForm,
      imgPrevOR,
      imgPrevUrlOR,
      imgPrevCOG,
      imgPrevRegForm,
      submitForm,
      onClose,
      tuitionFeeText,
      registrationFeeText,
      totalFeeText,
      courseText,
      academicYearText,
      semesterText,
      gwaText,
    }=this.props

    const {
       disableSubmit,
       isDismisable
    }=this.state

    const styles={
      image1 : {
        backgroundImage: `url('${imgPrevOR}')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat',
      },
      image2 : {
        backgroundImage: `url('${imgPrevCOG}')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat',
      },
      image3 : {
        backgroundImage: `url('${imgPrevRegForm}')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat',
      },
      image4 : {
        backgroundImage: `url('${imageDefault}')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'cover',
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
          <h4>College/University : { collegeType ? collegeType : '(Not Yet Provided)' }</h4>
          <h4>Course : { courseText ? courseText  : '(Not Yet Provided)'  }</h4>
          <h4>Academic Year : { academicYearText ? academicYearText  : '(Not Yet Provided)'  }</h4>
          <h4>Semester : { semesterText ? semesterText  : '(Not Yet Provided)'  }</h4>
          <h4>General Weighted Average : { gwaText ? gwaText : '(Not Yet Provided)'  }</h4>
          <h4>Tuition Fee : { tuitionFeeText ? tuitionFeeText  : '(Not Yet Provided)'  }</h4>
          <h4>Registration Fee : { registrationFeeText ? registrationFeeText  : '(Not Yet Provided)'  }</h4>
          <h4>File OR : { fileOR.name ? fileOR.name  : '(Not Yet Provided)'  }</h4>
          <h4>File COG : { fileCOG.name ? fileCOG.name  : '(Not Yet Provided)'  }</h4>
          <h4>File Registration Form : { fileRegForm.name ? fileRegForm.name  : '(Not Yet Provided)'  }</h4>
          <br/>
          <div className={ 'education-image-display' }>
            <div style={ styles.image1 ? styles.image1 : styles.image4 }></div>
            <div style={ styles.image2 ? styles.image2 : styles.image4 }></div>
            <div style={ styles.image3 ? styles.image3 : styles.image4 }></div>
          </div>
          <br/>
          <center>
            <GenericButton
              onClick={ () =>
                submitForm(course, academicYear, semester, gwa, tuitionFee, registrationFee,
                schoolId, fileOR, fileCOG, fileRegForm)
            }
              text={ 'confirm' }
              disabled={ this.state.disabled }
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
  cancel : PropTypes.string,
}
EducationAidReviewModal.defaultProps={
  confirm : 'Agree',
  cancel : 'Disagree',
}

export default EducationAidReviewModal
