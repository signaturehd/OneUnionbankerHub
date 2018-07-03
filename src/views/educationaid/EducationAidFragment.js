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

    this.state={
      showNoticeModal : false,
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
      imagePrevOR : null,
      imagePrevCOG : null,
      imagePrevRegForm : null,
      showBenefitFeedbackModal : false,
      educationAid: [] //education aid details
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateAid()
  }

  confirmation (
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
    totalFeeText)
  {
    if (( tuitionFeeText === 0 || tuitionFeeText === "") || ( registrationFeeText === 0 || registrationFeeText === "") ||
        schoolID === "" || courseText === "" || academicYearText === "" || semesterText === "" ||
        ( gwaText === 0 || gwaText === "")) {
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
      const fileORName = {
        "name" : fileOR.name,
        "attachments" : imagePrevOR
      }
      const fileCOGName  = {
        "name" : fileCOG.name,
        "attachments" : imagePrevCOG
      }
      const fileRegFormName  = {
        "name" : fileCOG.name,
        "attachments" : imagePrevRegForm
      }

      const fileAttachments = [fileORName, fileCOGName, fileRegFormName]
        this.presenter.addEducationAid(
          courseText,
          academicYearText,
          semesterText,
          gwaText,
          tuitionFeeText,
          registrationFeeText,
          schoolID,
          fileAttachments
      )
    }
  }

  setEducationAid(educationAid) {
    this.setState({ educationAid })
  }

  setValidateAid(validateAid) {
    this.setState({ validateAid })
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

  navigate () {
    this.props.history.push('/mybenefits/benefits/education')
  }

  render () {
    const {
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
      educationAid,
      enabledLoader,
      showNoticeModal,
      noticeResponse,
      showNoticeResponseModal,
      showBenefitFeedbackModal
    }=this.state

    return (
      <div>
        {
          showNoticeModal &&
          <NoticeModal
            onClose={ () => this.setState({ showNoticeModal : false })}
            noticeResponse={ noticeResponse }
            benefitId={ '11' }
            onDismiss={ (showNoticeModal, noticeResponse) =>
              this.setState({ showNoticeModal, noticeResponse, showNoticeResponseModal : true })  }
          />
        }

        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false, showBenefitFeedbackModal : true })
            }}
            noticeResponse={ noticeResponse }
          />
        }

        {
          showBenefitFeedbackModal &&
          <BenefitFeedbackModal
            benefitId={ '11' }
            onClose={ () => {
              this.props.history.push('/mybenefits/benefits/education'),
              this.setState({ showBenefitFeedbackModal : false })
            }}
          />
        }

        <div>
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>
          <h2 className={ 'header-margin-default' }>
            Education Aid
          </h2>
        </div>
        {
          enabledLoader ?
           <center className={ 'circular-loader-center' }>
             <CircularLoader show={ this.state.enabledLoader }/>
           </center> :
          <FormComponent
            educationAid={ educationAid }
            getFormData={ (
              getCourseText,
              getAcademicYearText,
              getSemesterText,
              getGwaText,
              getTuitionFeeText,
              getRegistrationFeeText,
              getSchoolID,
              getFileOR,
              getFileCOG,
              getFileRegForm,
              getImagePrevOR,
              getImagePrevCOG,
              getImagePrevRegForm,
              getTotalFee
            ) => this.confirmation(
              getCourseText,
              getAcademicYearText,
              getSemesterText,
              getGwaText,
              getTuitionFeeText,
              getRegistrationFeeText,
              getSchoolID,
              getFileOR,
              getFileCOG,
              getFileRegForm,
              getImagePrevOR,
              getImagePrevCOG,
              getImagePrevRegForm,
              getTotalFee
              )
            }
          />
        }
      </div>
    )
  }
}


export default ConnectView(EducationAidFragment, Presenter)
