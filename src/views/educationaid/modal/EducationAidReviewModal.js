import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/educationModalStyle.css'

class EducationAidReviewModal extends Component {
  constructor (props) {
    super (props)
    this.state = {
      disableSubmit : false,
      isDismisable : true
    }
  }

  render () {
    const {
        educationAid,
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
        imgPrevUrlOR,
        imgPrevCOG,
        imgPrevRegForm,
        submitForm,
        onClose
    } = this.props

    const {
       disableSubmit,
       isDismisable
    } = this.state

    const styles = {
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
      }
    }
    return (
      <Modal
        isDismisable = { isDismisable }
        onClose = { onClose }
      >
          {
            disableSubmit ?
            <center>
              <h3>Please wait while we&#39;re sending your application</h3>
              <br/>
              <br/>
              <CircularLoader show={true}/>
            </center>              :
            <div>
              <h2>Education Aid Description</h2>
              <br/>
              <h4>College/University : { educationAid.college }</h4>
              <h4>Course : { educationAid.course }</h4>
              <h4>Academic Year : { educationAid.academicYear }</h4>
              <h4>Semester : { educationAid.semester }</h4>
              <h4>General Weighted Average : { educationAid.gwa }</h4>
              <h4>Tuition Fee : { educationAid.tuitionFee }</h4>
              <h4>Registration Fee : { educationAid.registrationFee }</h4>
              <h4>Attachments : { file.name }</h4>
              <br/>
              <div className = { 'education-image-display' }>
                <div style = {styles.image1}></div>
                <div style = {styles.image2}></div>
                <div style = {styles.image3}></div>
              </div>
              <br/>
            <center>
              <GenericButton
                onClick = { () => {
                  this.setState({ disableSubmit : true, isDismisable: false })
                  submitForm(course, academicYear, semester, gwa, tuitionFee, registrationFee,
                  schoolId, fileOR, fileCOG, fileRegForm)
                }
              }
                text = { 'confirm' }
                disabled = {this.state.disabled}
              />
              <GenericButton
                text = { 'cancel' }
                onClick = { onClose } />
            </center>
          </div>
        }
      </Modal>
    )
  }
}

EducationAidReviewModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.func,
  confirm : PropTypes.string,
  cancel : PropTypes.string,
}
EducationAidReviewModal.defaultProps = {
  confirm : 'Agree',
  cancel : 'Disagree',
}

export default EducationAidReviewModal
