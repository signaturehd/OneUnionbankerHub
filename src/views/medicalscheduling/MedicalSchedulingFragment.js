import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/MedicalSchedulingPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import {
  CircularLoader,
  SingleInputModal,
  GenericButton,
  Modal
} from '../../ub-components/'
import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'
import FormComponent from './components/MedicalSchedulingFormCardComponent'
import * as func from './controller/MedicalSchedulingFunction'
import { RequiredValidation } from '../../utils/validate'

class MedicalSchedulingFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      enabledLoader : false,
      isFormReview : false,
      showClinics : false,
      showPackages : false,
      showNoticeModal : false,
      showNoticeResponseModal : false,
      showBenefitFeedbackModal : false,
      noticeResponse : '',
      clinics : null,
      packages : null,
      procedures : null,
      clinicId : null,
      clinicLabel : '',
      packageId : null,
      packageLabel : '',
      preferredDate : '',
      index : 4,
      viewMoreText : 'View more',
    }
  }

  componentDidMount () {
    this.presenter.validateMedicalScheduling()
  }

  setClinics (clinics) {
    this.setState({ clinics })
  }

  setPackages (packages) {
    this.setState({ packages })
  }

  setProcedures (procedures) {
    this.setState({ procedures })
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
    this.props.history.push('/mybenefits/benefits/medical')
  }

  validator (input) {
    return new RequiredValidation().isValid(input)
  }

  confirmation (isFormReview) {
    const { clinicId, packageId, preferredDate } = this.state
    if (isFormReview) {
      if (this.validator(!clinicId)) {
        func.notification ('Please double check your Clinic')
      } else if (this.validator(!packageId)) {
        func.notification ('Please double check your Packages')
      } else if (this.validator(!preferredDate)) {
        func.notification ('Please double check your Preferred Date')
      } else {
        this.setState({ isFormReview })
      }
    }
    else {
      this.setState({ isFormReview })
    }
  }

  render () {
    const {
      enabledLoader,
      isFormReview,
      showClinics,
      showPackages,
      showNoticeModal,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      noticeResponse,
      clinics,
      packages,
      procedures,
      clinicId,
      clinicLabel,
      packageId,
      packageLabel,
      preferredDate,
      index,
      viewMoreText,
    } = this.state

    let procedureList = []
    try {
      procedureList = procedures.filter(proc => proc.packageId == packageId)
    }
    catch (e) {
    }
    return (
      <div>
        {
          showClinics &&
          <SingleInputModal
            inputArray = { clinics }
            selectedArray = { (clinicId, clinicLabel) =>
              this.setState({ clinicId, clinicLabel, showClinics : false, packageId : null, packageLabel : '' }) }
            onClose = { () => this.setState({showClinics : false}) }
          />
        }
        {
          showPackages &&
          <SingleInputModal
            inputArray = { packages.filter(pack => pack.clinicId === clinicId) }
            selectedArray = { (packageId, packageLabel) =>{
              this.setState({ packageId, packageLabel, showPackages : false, index : 4, viewMoreText : 'View more' }) }
            }
            onClose = { () => this.setState({showPackages : false}) }
          />
        }
        {
          showNoticeModal &&
          <NoticeModal
            onClose={ () => this.setState({ showNoticeModal : false })}
            noticeResponse={ noticeResponse }
            benefitId={ '10' }
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
            benefitId={ '10' }
            onClose={ () => {
              this.props.history.push('/mybenefits/benefits/medical'),
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
            { func.checkedTitle(isFormReview) }
          </h2>
        </div>
        {
          enabledLoader ?
            <center className = { 'circular-loader-center' }>
              <CircularLoader show = { enabledLoader }/>
            </center> :
            <FormComponent
              showFormReview = { (isFormReview) => this.confirmation(isFormReview) }
              showClinics = { () => this.setState({ showClinics : true }) }
              showPackages = { () => this.setState({ showPackages : true }) }
              isFormReview = { isFormReview }
              clinicLabel = { clinicLabel }
              packageLabel = { packageLabel }
              procedureList = { procedureList }
              preferredDate = { preferredDate }
              onChangePreferredDate = { (preferredDate) => this.setState({ preferredDate }) }
              onSubmit = { () => {
                this.setState({ isFormReview : false })
                this.presenter.addMedicalScheduling(preferredDate.format('MM/DD/YYYY'), clinicId, packageId)
                }
              }
              index = { index }
              viewMoreText = { viewMoreText }
              viewMore = { () => this.setState({ index : procedureList.length, viewMoreText : 'View less' }) }
              viewLess = { () => this.setState({ index : 4, viewMoreText : 'View more' }) }
            />
        }
      </div>
    )
  }
}

export default ConnectView(MedicalSchedulingFragment, Presenter)
