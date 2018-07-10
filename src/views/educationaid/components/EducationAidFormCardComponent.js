import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericTextBox,  Card, GenericButton, FileUploader, Modal } from '../../../ub-components/'

import './styles/educationAidComponentStyle.css'

import EducationAidModal from '../modal/EducationAidModal'
import EducationAidReviewModal from '../modal/EducationAidReviewModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import DatePicker from 'react-datepicker'
import moment from 'moment'

import { MoneyValidation, RequiredNumberValidation } from '../../../utils/validate'
import { format } from '../../../utils/numberUtils'

class EducationAidFormCardComponent extends Component {

  constructor (props) {
    super (props)
    this.state={
      showModal: false,
      showReviewEducationModal: false,
      tuitionFeeText: '',
      registrationFeeText: '',
      totalFeeText: '',
      collegeType: '',
      schoolID: '',
      courseText: '',
      academicYearText: '',
      ayFrom: '',
      ayTo: '',
      semesterText: '',
      totalReimbursableAmount: '',
      totalReimbursableAmountText: '',
      gwaText: '',
      fileOR: '',
      fileCOG: '',
      fileRegForm: '',
      imagePrevOR: null,
      imagePrevCOG: null,
      imagePrevRegForm: null,
      computations: '',
      showEducationSemesterModal: false,
    }
    this.onGetClicked=this.onGetClicked.bind(this)
    this.onChange = this.onChange.bind(this)
    this.registrationValidation=this.registrationValidation.bind(this)
  }

  onChange (e) {
      new MoneyValidation().isValid(e.target.value) ?
        this.setState({ tuitionFeeText : e.target.value }) :
        this.setState({ tuitionFeeText : '' })
  }
  registrationValidation (e) {
     new MoneyValidation().isValid(e.target.value) ?
       this.setState({ registrationFeeText : e.target.value }) :
       this.setState({ registrationFeeText : '' })
  }

  getExtension (filename) {
    const parts=filename.split('/')
    return parts[parts.length - 1]
  }

  totalReimbursableAmount (computations, gwa, totalFee) {
    let result
    computations &&
    computations.map(
      (value, key) => {
        if (gwa >= value.minimum && gwa <= value.maximum) {
          result=parseFloat(totalFee) * parseFloat(value.percent)
        }
        else if (gwa <= value.minimum && gwa >= value.maximum) {
          result=parseFloat(totalFee) * parseFloat(value.percent)
        }
      }
    )
    return result ? parseFloat(result).toFixed(2) : 0.00

  }

  onGetClicked (
    courseText,
    academicYearText,
    semesterText,
    gwaText,
    tuitionFeeText,
    registrationFeeText,
    schoolID,
    fileOR,
    fileCOG,
    fileRegForm,
    imagePrevOR,
    imagePrevCOG,
    imagePrevRegForm,
    totalFeeText,
    totalReimbursableAmountText) {
      this.props.getFormData(
        courseText,
        academicYearText,
        semesterText,
        gwaText,
        tuitionFeeText,
        registrationFeeText,
        schoolID,
        fileOR,
        fileCOG,
        fileRegForm,
        imagePrevOR,
        imagePrevCOG,
        imagePrevRegForm,
        totalFeeText,
        totalReimbursableAmountText
      )
  }

  render () {
    const {
      educationAid,
      getFormData
    }=this.props

    const {
      showModal,
      showReviewEducationModal,
      tuitionFeeText,
      registrationFeeText,
      totalFeeText,
      collegeType,
      schoolID,
      courseText,
      academicYearText,
      ayFrom,
      ayTo,
      semesterText,
      gwaText,
      totalReimbursableAmount,
      totalReimbursableAmountText,
      fileOR,
      fileCOG,
      fileRegForm,
      imagePrevOR,
      imagePrevCOG,
      imagePrevRegForm,
      computations,
      showEducationSemesterModal,
      }=this.state

    const academicyear = ayFrom + " - " + ayTo
    const resultTotalFee=tuitionFeeText && registrationFeeText ? parseFloat(tuitionFeeText) + parseFloat(registrationFeeText) : 0.00

    const styles = {
      image1 : {
        backgroundImage: `url('${imagePrevOR}')`,
        width : 'auto',
        height : '60px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      },
      image2 : {
        backgroundImage: `url('${imagePrevCOG}')`,
        width : 'auto',
        height : '60px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      },
      image3 : {
        backgroundImage: `url('${imagePrevRegForm}')`,
        width : 'auto',
        height : '60px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      }
    }

    const semesterOptions = [{
          id: 0,
          name: 'First Semester',
      },
      {
          id: 1,
          name: 'Second Semester',
      },
      {
          id: 2,
          name: 'Third Semester',
      }]

    return (
      <div className={'educ-container'}>
        <div className={ 'educ-grid-column-2' }>
          {
            showModal &&
            <EducationAidModal
              tog={ educationAid.schools }
              onSubmit={
                (schoolID, collegeType, computations) => {
                  this.setState({
                    schoolID,
                    collegeType,
                    computations
                  })
                }
              }
              onClose={
                () => {
                  this.setState({ showModal : false })
                }
              }
              />
            }
            {
              showReviewEducationModal &&
                <EducationAidReviewModal
                  collegeType={ collegeType }
                  tuitionFeeText={ tuitionFeeText }
                  courseText={ courseText }
                  registrationFeeText={ registrationFeeText }
                  academicYearText={ academicYearText }
                  semesterText={ semesterText }
                  gwaText={ gwaText }
                  totalFeeText={ totalFeeText }
                  fileOR={ fileOR }
                  fileCOG={ fileCOG }
                  fileRegForm={ fileRegForm }
                  imagePrevOR={ imagePrevOR }
                  imagePrevCOG={ imagePrevCOG }
                  imagePrevRegForm={ imagePrevRegForm }
                  totalReimbursableAmountText={ totalReimbursableAmountText }
                  onClose={ () => this.setState({ showReviewEducationModal : false }) }
                  getFormData={ ()=> this.setState({
                    courseText,
                    academicYearText,
                    semesterText,
                    gwaText,
                    tuitionFeeText,
                    registrationFeeText,
                    schoolID,
                    fileOR,
                    fileCOG,
                    fileRegForm,
                    imagePrevOR,
                    imagePrevCOG,
                    imagePrevRegForm,
                    totalFeeText })}
                  onClick={ () => this.onGetClicked(
                    courseText,
                    academicYearText,
                    semesterText,
                    gwaText,
                    tuitionFeeText,
                    registrationFeeText,
                    schoolID,
                    fileOR,
                    fileCOG,
                    fileRegForm,
                    imagePrevOR,
                    imagePrevCOG,
                    imagePrevRegForm,
                    totalFeeText
                    )
                  }
                />
            }
            {
              showEducationSemesterModal &&
              <Modal
                isDismisable={ true }
                onClose={ ()=> this.setState({ showEducationSemesterModal: false }) }
                >
                <div>
                  {
                    semesterOptions && semesterOptions.map((semester, key) =>
                      <GenericButton
                        className = { 'mpl-poa-modal-button' }
                        key={ key }
                        text={ semester.name }
                        onClick={ () => {
                          this.setState({ semesterText: semester.name, showEducationSemesterModal: false })
                          }
                        }
                      />
                    )
                  }
                </div>
              </Modal>
            }
            <div></div>
          <Card className={ 'educ-form-card' }>
            <h4>
              Benefits Details
            </h4>
            <div className={'educ-form-card-body '}>
            <GenericTextBox
              value={ tuitionFeeText ? tuitionFeeText : '' }
              onChange={
                this.onChange
              }
              placeholder={ 'Tuition Fee' }
              type={ 'text' }/>
            <GenericTextBox
              value={ registrationFeeText ? registrationFeeText : ''}
              onChange={
                this.registrationValidation
               }
              placeholder={ 'Registration Fee' }
              type={ 'text' }/>
            <GenericTextBox
              value={ resultTotalFee && parseFloat(resultTotalFee).toFixed(2) }
              disabled={ 'disabled' }
              placeholder={ 'Total Fee' }
              type={ 'text' }/>
            <GenericTextBox
              value={ collegeType }
              onClick={
                () => this.setState({ showModal : true })
              }
              placeholder={ 'Colleges/Universities' }
              /*onChange={ (e) => this.setState({ collegeType : e.target.value }) }*/
              type={ 'text' }/>
            <GenericTextBox
              value={ courseText }
              onChange={ (e) => this.setState({ courseText: e.target.value }) }
              placeholder={ 'Course' }
              type={ 'text' }/>
            <div>
              <div className="educ-acad-year">
              <div className="educ-acad-title">
              <label className="educ-acad-label">{ 'Academic Year' }</label>
              </div>
              <GenericTextBox
                value={ ayFrom }
                onChange={
                  (e) => {
                    new RequiredNumberValidation().isValidWithoutDot(e.target.value) ?
                      this.setState({ ayFrom : e.target.value, academicYearText : e.target.value + " - " + ayTo }):
                      this.setState({ ayFrom : '', academicYearText : '' + " - " + ayTo })
                  }
                }
                maxLength = { 4 }
                placeholder={ 'From' }
                type={ 'text' }/>
              <GenericTextBox
                value={ ayTo }
                onChange={
                  (e) => {
                    new RequiredNumberValidation().isValidWithoutDot(e.target.value) ?
                      this.setState({ ayTo: e.target.value, academicYearText : ayFrom + " - " + e.target.value }):
                      this.setState({ ayTo: '', academicYearText : ayFrom + " - " + '' })
                  }
                }
                maxLength = { 4 }
                placeholder={ 'To' }
                type={ 'text' }/>

              </div>
            </div>
            <GenericTextBox
              value={ semesterText }
              onClick={ () => this.setState({ showEducationSemesterModal : true }) }
              placeholder={ 'Semester' }
              type={ 'text' }/>
            <GenericTextBox
              value={ gwaText }
              onChange={
                (e) =>{
                  new RequiredNumberValidation().isValid(e.target.value) ?
                    this.setState({ gwaText: e.target.value }):
                    this.setState({ gwaText: '' })
                  }
                }
              maxLength = { 4 }
              placeholder={ 'General Weighted Average (GWA)' }
              type={ 'text' }/>
            <GenericTextBox
              value={ format(this.totalReimbursableAmount(computations, gwaText, resultTotalFee)) }
              disabled={ 'disabled' }
              type={ 'text' }
              placeholder={ 'Total Reimbursable Amount' }/>
              <br/>
              <br/>
              <h4>
                Form Attachments
              </h4>
              {
                imagePrevOR &&
                <div>
                  <label className="educ-form-title">{ 'Official Receipt of Tuition Fee' }</label>
                  <div className="educ-attachment-form">
                    <img
                      src={ require('../../../ub-components/Notify/images/x-circle.png') }
                      className='close-button'
                      onClick={
                        () => {
                          this.setState({ fileOR : '', imagePrevOR : null })
                        }
                      }
                    />
                    <div style = {styles.image1}><h6 className="educ-file-name">{ fileOR.name }</h6></div>
                  </div>
                </div>
              }

              {
                !imagePrevOR &&
                <FileUploader
                  accept={ 'image/gif,image/jpeg,image/jpg,image/png,' }
                  value={ fileOR.name }
                  placeholder={ 'Official Receipt of Tuition Fee' }
                  onChange={
                    (e) => {
                      e.preventDefault()
                      const reader=new FileReader()
                      const file=e.target.files[0]
                      let isValid
                      switch (this.getExtension(file.type).toLowerCase()) {
                        case 'jpeg' :
                          isValid=true
                        case 'jpg' :
                          isValid=true
                        case 'png' :
                          isValid=true
                        case 'pdf' :
                          isValid=true
                      }

                      if (isValid) {
                        reader.onloadend=() => {
                          this.setState({
                            fileOR: file,
                            imagePrevOR: reader.result
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
                  }
                />
              }

              {
                imagePrevCOG &&
                <div>
                  <label className="educ-form-title">{ 'Certification of Grades' }</label>
                  <div className="educ-attachment-form">
                    <img
                      src={ require('../../../ub-components/Notify/images/x-circle.png') }
                      className='close-button'
                      onClick={
                        () => {
                          this.setState({ fileCOG : '', imagePrevCOG : null })
                        }
                      }
                    />
                    <div style = {styles.image2}><h6 className="educ-file-name">{ fileCOG.name }</h6></div>
                  </div>
                </div>
              }

              {
                !imagePrevCOG &&
                <FileUploader
                  accept={ 'image/gif,image/jpeg,image/jpg,image/png,' }
                  value={ fileCOG.name }
                  placeholder={ 'Certification of Grades' }
                  onChange={
                    (e) => {
                      e.preventDefault()
                      const reader2=new FileReader()
                      const file2=e.target.files[0]
                      let isValid
                      switch (this.getExtension(file2.type).toLowerCase()) {
                        case 'jpeg' :
                          isValid=true
                        case 'jpg' :
                          isValid=true
                        case 'png' :
                          isValid=true
                        case 'pdf' :
                          isValid=true
                      }

                      if (isValid) {
                        reader2.onloadend=() => {
                          this.setState({
                            fileCOG: file2,
                            imagePrevCOG : reader2.result
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
                  }
                />
              }

              {
                imagePrevRegForm &&
                <div>
                  <label className="educ-form-title">{ 'Registration Form/Official Breakdown of Fees' }</label>
                  <div className="educ-attachment-form">
                    <img
                      src={ require('../../../ub-components/Notify/images/x-circle.png') }
                      className='close-button'
                      onClick={
                        () => {
                          this.setState({ fileRegForm : '', imagePrevRegForm : null })
                        }
                      }
                    />
                    <div style = {styles.image3}><h6 className="educ-file-name">{ fileRegForm.name }</h6></div>
                  </div>
                </div>
              }

              {
                !imagePrevRegForm &&
                <FileUploader
                  accept={ 'image/gif,image/jpeg,image/jpg,image/png,' }
                  value={ fileRegForm.name }
                  placeholder={ 'Registration Form/Official Breakdown of Fees' }
                  onChange={
                    (e) => {
                      e.preventDefault()
                      const reader3=new FileReader()
                      const file3=e.target.files[0]
                      let isValid
                      switch (this.getExtension(file3.type).toLowerCase()) {
                        case 'jpeg' :
                          isValid=true
                        case 'jpg' :
                          isValid=true
                        case 'png' :
                          isValid=true
                        case 'pdf' :
                          isValid=true
                      }

                      if (isValid) {
                        reader3.onloadend=() => {
                          this.setState({
                            fileRegForm: file3,
                            imagePrevRegForm: reader3.result
                          })
                        }
                        reader3.readAsDataURL(file3)
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
                  }
                />
              }

              <GenericButton
                type={ 'button' }
                text={ 'submit' }
                onClick={ () => this.setState({ showReviewEducationModal : true }) }
                className={ 'educ-submit' } />
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default EducationAidFormCardComponent
