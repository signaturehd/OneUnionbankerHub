import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/EducationAidPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import ConfirmationModal from './modal/EducationAidReviewModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from './components/EducationAidFormCardComponent'

class EducationAidFragment extends BaseMVPView{
  constructor(props) {
    super(props)
    this.state = {
      showNoticeModal : false,
      showConfirmation : false,
      noticeResponse : null,
      showNoticeResponseModal : false,
      enabledLoader : false,
      tuitionFeeText: '',
      registrationFeeText: '',
      totalFeeText: '',
      collegeType: '',
      schoolID: '',
      courseText: '',
      academicYearText: '',
      semesterText: '',
      totalReimbursableAmount: '',
      gwaText: '',
      fileOR: '',
      fileCOG: '',
      fileRegForm: '',
      imgPrevOR : null,
      imgPrevCOG : null,
      imgPrevRegForm : null,
      showBenefitFeedbackModal : false,
      educationAid: [] //education aid details
    }
  }
  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.getEducationAid()
  }

  confirmation (
  tuitionFee,
  registrationFee,
  totalFee,
  collegeType,
  schoolID,
  course,
  academicYear,
  semester,
  totalReimbursableAmount,
  gwa,
  fileOR,
  fileCOG,
  fileRegForm,
  imgPrevOR,
  imgPrevCOG,
  imgPrevRegForm)
  {
    if (( tuitionFee === 0 || tuitionFee === "") || ( registrationFee === 0 || registrationFee === "") ||
        collegeType === "" || course === "" || academicYear === "" || semester === "" ||
        ( gwa === 0 || gwa === "")) {
      store.dispatch(NotifyActions.addNotify({
          title : 'Education Aid',
          message : 'Please provide a valid information',
          type : 'warning',
          duration : 2000
        })
      )
    }
    else if (!fileOR && !fileCOG && !fileRegForm) {
      store.dispatch(NotifyActions.addNotify({
          title : 'Education Aid',
          message : 'Please check your attachments',
          type : 'warning',
          duration : 2000
        })
      )
    }
    else {
      this.setState({
        showConfirmation,
        tuitionFee,
        registrationFee,
        totalFee,
        collegeType,
        schoolID,
        course,
        academicYear,
        semester,
        totalReimbursableAmount,
        gwa,
        fileOR,
        fileCOG,
        fileRegForm,
        imgPrevOR,
        imgPrevCOG,
        imgPrevRegForm
      })
    }
  }

  setEducationAid(educationAid) {
    this.setState({ educationAid })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  noticeOfUndertaking (noticeResponse) {
  this.setState({ showNoticeModal : true, showConfirmation: false, noticeResponse })
  }

  noticeResponse (noticeResponse) {
    this.setState({showConfirmation: false, noticeResponse })
  }

  submitForm (course, academicYear, semester, gwa, tuitionFee, registrationFee,
  schoolId, attachments) {
    console.log(attachments)
    // this.presenter.addGrantAid(course, academicYear, semester, gwa, tuitionFee, registrationFee,
    // schoolId, attachments)
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/education')
  }

  render () {
    const {
      tuitionFee,
      registrationFee,
      totalFee,
      collegeType,
      schoolID,
      course,
      academicYear,
      semester,
      totalReimbursableAmount,
      gwa,
      fileOR,
      fileCOG,
      fileRegForm,
      imgPrevOR,
      imgPrevCOG,
      imgPrevRegForm,
      educationAid,
      enabledLoader,
      showNoticeModal,
      showConfirmation,
      noticeResponse,
      showNoticeResponseModal,
      showBenefitFeedbackModal
    } = this.state

    return (
      <div>
        {
          showConfirmation &&
          <ConfirmationModal
            educationAid = { educationAid }
            tuitionFee = { tuitionFee }
            registrationFee = { registrationFee }
            totalFee = { totalFee }
            collegeType = { collegeType }
            schoolID = { schoolID }
            course = { course }
            academicYear = { academicYear }
            semester = { semester }
            totalReimbursableAmount = { totalReimbursableAmount }
            gwa = { gwa }
            fileOR = { fileOR }
            fileCOG = { fileCOG }
            fileRegForm = { fileRegForm }
            imgPrevOR = { imgPrevOR }
            imgPrevCOG = { imgPrevCOG }
            imgPrevRegForm = { imgPrevRegForm }
            submitForm = { (course, academicYear, semester, gwa, tuitionFee, registrationFee,
            schoolId, attachments) =>
              this.submitForm(course, academicYear, semester, gwa, tuitionFee, registrationFee,
              schoolId, attachments) }
            onClose = { () => this.setState({ showConfirmation : false }) }
          />
        }

        {
          showNoticeModal &&
          <NoticeModal
            onClose = { () => this.setState({ showNoticeModal : false })}
            noticeResponse = { noticeResponse }
            benefitId = { '13' }
            onDismiss = { (showNoticeModal, noticeResponse) =>
              this.setState({ showNoticeModal, noticeResponse, showNoticeResponseModal : true })  }
          />
        }

        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose = { () => {
              this.setState({ showNoticeResponseModal : false, showBenefitFeedbackModal : true })
            }}
            noticeResponse = { noticeResponse }
          />

        }

        {
          showBenefitFeedbackModal &&
          <BenefitFeedbackModal
            benefitId = { '13' }
            onClose = { () => {
              this.props.history.push('/mybenefits/benefits/education'),
              this.setState({ showBenefitFeedbackModal : false })
            }}
          />
        }

        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>
            Education Aid
          </h2>
        </div>
        {
          enabledLoader ?
           <center className = { 'circular-loader-center' }>
             <CircularLoader show = { this.state.enabledLoader }/>
           </center> :
          <FormComponent
            educationAid = { educationAid }
            presenter = { this.presenter }
            onClick =
            {
              (showConfirmation,
              tuitionFeeText,
              registrationFeeText,
              totalFeeText,
              collegeType,
              schoolID,
              courseText,
              academicYearText,
              semesterText,
              totalReimbursableAmount,
              gwaText,
              fileOR,
              fileCOG,
              fileRegForm,
              imgPrevOR,
              imgPrevCOG,
              imgPrevRegForm) =>
              {
                this.confirmation(showConfirmation,
                tuitionFeeText,
                registrationFeeText,
                totalFeeText,
                collegeType,
                schoolID,
                courseText,
                academicYearText,
                semesterText,
                totalReimbursableAmount,
                gwaText,
                fileOR,
                fileCOG,
                fileRegForm,
                imgPrevOR,
                imgPrevCOG,
                imgPrevRegForm)
              }
            }
          />
        }
      </div>
    )
  }
}


export default ConnectView(EducationAidFragment, Presenter)
