import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/BereavementPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'
import BereavementDependentsModal from './modals/BereavementDependentsModal'
import BereavementLeaveModal from  './modals/BereavementLeaveModal'

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from  './components/BereavementFormCardComponent'
import LeaveFilingComponentFragment from  '../leavefiling/LeaveFilingFragment'
import * as BereavementFunction from './controller/BereavementFunction'

class BereavementFragment extends BaseMVPView {

  constructor (props) {
    super (props)
    this.state={
      validatedBereavement: [],
      attachmentArray : [],
      attachmentData: [],
      showDepedents: [],
      showEditSubmitButton : false,
      showBereavementLeaveComponent : false,
      showBereavementLeaveModal : false,
      enabledLoader : false,
      showNoticeModal : false,
      noticeResponse : null,
      showBenefitFeedbackModal : false,
      showNoticeResponseModal : false,
      showDeceasedDependents : false,
      dependentsName: '',
      dependentsRelationship: '',
      dependentId: '',
      deceasedDate: '',
      funeralDate: '',
      intermentDate: '',
      funeralHome: '',
      funeralAddress: '',
      funeralRegion: '',
      funeralProvince: '',
      funeralCity: '',
      memorialPark: '',
      memorialAddress: '',
      memorialRegion: '',
      memorialProvince: '',
      memorialCity: '',
      addressError: false,
      errorMessage: ''
    }
    this.editForm = this.editForm.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.validateFuneralHome = this.validateFuneralHome.bind(this)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateBereavement()
  }

  formatDeceasedDate (value) {
    const validator = BereavementFunction.dateFormat(value)
    this.setState({ deceasedDate : validator,
                    funeralDate : validator })
  }

  formatFuneralDate (value) {
    const validator = BereavementFunction.dateFormat(value)
    this.setState({ funeralDate : validator,
                    intermentDate : validator })
  }

  formatIntermentDate (value) {
    const validator = BereavementFunction.dateFormat(value)
    this.setState({ intermentDate : validator })
  }

  validateFuneralHome (value) {
    const validator = BereavementFunction.checkRequiredAlphabet(value)
    this.setState({ funeralHome : validator })
  }

  validateFuneralAddress (value) {
    const validator = BereavementFunction.checkRequiredAlphabet('',value)
    this.setState({ funeralAddress : validator,
    addressError: BereavementFunction.minimumLength(validator.length) })
  }

  validateFuneralRegion (value) {
    const validator = BereavementFunction.checkRequiredAlphabet(value)
    this.setState({ funeralRegion : validator })
  }

  validateFuneralProvince (value) {
    const validator = BereavementFunction.checkRequiredAlphabet(value)
    this.setState({ funeralProvince : validator })
  }

  validateFuneralCity (value) {
    const validator = BereavementFunction.checkRequiredAlphabet(value)
    this.setState({ funeralCity : validator })
  }

  validateMemorialPark (value) {
    const validator = BereavementFunction.checkRequiredAlphabet(value)
    this.setState({ memorialPark : validator })
  }

  validateMemorialAddress (value) {
    const validator = BereavementFunction.checkRequiredAlphabet('',value)
    this.setState({ memorialAddress : validator,
    addressError: BereavementFunction.minimumLength(validator.length) })
  }

  validateMemorialRegion (value) {
    const validator = BereavementFunction.checkRequiredAlphabet(value)
    this.setState({ memorialRegion : validator })
  }

  validateMemorialProvince (value) {
    const validator = BereavementFunction.checkRequiredAlphabet(value)
    this.setState({ memorialProvince : validator })
  }

  validateMemorialCity (value) {
    const validator = BereavementFunction.checkRequiredAlphabet(value)
    this.setState({ memorialCity : validator })
  }

  showDeceasedDependents (showDepedents) {
    this.setState({ showDepedents })
  }

  isEligible (bool) {
    this.setState({ enabledLoader : !bool })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showValidatedValue (validatedBereavement) {
    this.setState({ validatedBereavement })
  }

  showDependentsValue (showDepedents) {
    this.setState({ showDepedents })
  }

  /* Display Modal Notice of Undertaking*/

  noticeOfUndertaking (noticeResponse) {
  this.setState({ showNoticeModal : true, showConfirmation: false, noticeResponse })
  }

  noticeResponse (noticeResponse) {
    this.setState({showConfirmation: false, noticeResponse })
  }

  showAttachmentsMap (attachmentArray) {
    this.setState({ attachmentArray })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits')
  }

  editForm (
    funeralDate,
    intermentDate,
    deceasedDate,
    dependentId,
    funeralHome,
    funeralAddress,
    funeralRegion,
    funeralProvince,
    funeralCity,
    memorialPark,
    memorialAddress,
    memorialRegion,
    memorialProvince,
    memorialCity,
    attachmentData
  ) {

    if (dependentId === null || dependentId === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Dependent field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else if (deceasedDate === null || deceasedDate === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Deceased Date field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else if (funeralDate === null || funeralDate === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Funeral Date field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else if (funeralHome === null || funeralHome === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Funeral Home field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else if (funeralAddress === null || funeralAddress === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Funeral Address field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else if (funeralRegion === null || funeralRegion === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Funeral Region field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else if (funeralProvince === null || funeralProvince === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Funeral Province field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else if (funeralCity === null || funeralCity === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Funeral City field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else if (intermentDate === null || intermentDate === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Interment Date field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else if (memorialPark === null || memorialPark === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Memorial Park field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else if (memorialAddress === null || memorialAddress === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Memorial Address field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else if (memorialRegion === null || memorialRegion === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Memorial Region field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else if (memorialProvince === null || memorialProvince === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Memorial Province field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else if (memorialCity === null || memorialCity === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Memorial City field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else {
      // console.log(dependentId, objectDate, objectFuneral, objectMemorial, attachmentData)
      this.setState({ showEditSubmitButton : true })
    }
  }

  submitForm (
    funeralDate,
    intermentDate,
    deceasedDate,
    dependentId,
    funeralHome,
    funeralAddress,
    funeralRegion,
    funeralProvince,
    funeralCity,
    memorialPark,
    memorialAddress,
    memorialRegion,
    memorialProvince,
    memorialCity,
    attachmentData
  ) {
    const objectDate={
      "death" : deceasedDate,
      "wake" : funeralDate,
      "interment" : intermentDate
    }
    const objectFuneral ={
      "home" : funeralHome,
      "province" : funeralProvince,
      "address": funeralAddress,
      "city": funeralCity,
      "region": funeralRegion
    }
    const objectMemorial ={
      "park" : memorialPark,
      "province" : memorialProvince,
      "address": memorialAddress,
      "city": memorialCity,
      "region": memorialRegion
    }
    this.presenter.addBereavement(dependentId, objectDate, objectFuneral, objectMemorial, attachmentData)
  }

  render () {
    const {
      showBereavementLeaveModal,
      showBereavementLeaveComponent,
      showEditSubmitButton,
      enabledLoader,
      validatedBereavement,
      attachmentArray,
      showDepedents,
      showNoticeModal,
      noticeResponse,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      funeralDate,
      intermentDate,
      deceasedDate,
      dependentId,
      dependentsName,
      dependentsRelationship,
      showDeceasedDependents,
      funeralHome,
      funeralAddress,
      funeralRegion,
      funeralProvince,
      funeralCity,
      memorialPark,
      memorialAddress,
      memorialRegion,
      memorialProvince,
      memorialCity,
      addressError,
      errorMessage,
      attachmentData
    }=this.state

    const { type }=this.props.match.params

    return (
      <div>
        { super.render() }
        {
          showBereavementLeaveModal &&
          <BereavementLeaveModal
            onLoadBereavementLeave = { (resp) =>
              this.setState({
                showBereavementLeaveModal: false,
                showBereavementLeaveComponent : resp })
              }
            onLoadNavigateBenefits = { () => this.navigate() }
            />
        }
        {
          showBereavementLeaveComponent ?
          <LeaveFilingComponentFragment
            benefitsCodeType = { 'FL' }
            navigateBenefits = { () => this.navigate() }
            />
          :
          <div>
            {
              showNoticeModal &&
              <NoticeModal
                onClose={ () => this.setState({ showNoticeModal : false })}
                noticeResponse={ noticeResponse }
                benefitId={ '21' }
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
                benefitId={ '21' }
                onClose={ () => {
                  this.setState({ showBereavementLeaveModal : true  }),
                  this.setState({ showBenefitFeedbackModal : false })
                }}
              />
            }
            {
              showDeceasedDependents &&
              <BereavementDependentsModal
                showDepedents={ showDepedents }
                chosenDependent={ (dependentId, dependentsName, dependentsRelationship) =>
                  this.setState({
                    dependentId,
                    dependentsName,
                    dependentsRelationship
                 })
               }
                onClose={ () => this.setState({ showDeceasedDependents: false }) }
              />
            }
            <div>
              <i
                className={ 'back-arrow' }
                onClick={ this.navigate.bind(this) }>
              </i>
            </div>
            {
              enabledLoader ?
              <center className={ 'circular-loader-center' }>
                <CircularLoader show={ enabledLoader }/>
              </center>
              :
              <FormComponent
                withDeathCert={ type === "certified" ? true : false  }
                attachmentArray = { attachmentArray }
                attachmentData = { attachmentData }
                validatedBereavement={ validatedBereavement }
                showDepedents={ showDepedents }
                funeralHome = { funeralHome }
                funeralAddress = { funeralAddress }
                funeralRegion = { funeralRegion }
                funeralProvince = { funeralProvince }
                funeralCity = { funeralCity }
                memorialPark = { memorialPark }
                memorialAddress = { memorialAddress }
                memorialRegion = { memorialRegion }
                memorialProvince = { memorialProvince }
                memorialCity = { memorialCity }
                deceasedDate = { deceasedDate }
                funeralDate = { funeralDate }
                intermentDate = { intermentDate }
                addressError = { addressError }
                dependentId = { dependentId }
                dependentsName = { dependentsName }
                showEditSubmitButton = { showEditSubmitButton }
                checkFuneralHome = { (resp) => this.validateFuneralHome(resp) }
                checkFuneralAddress = { (resp) => this.validateFuneralAddress(resp) }
                checkFuneralRegion = { (resp) => this.validateFuneralRegion(resp) }
                checkFuneralProvince = { (resp) => this.validateFuneralProvince(resp) }
                checkFuneralCity = { (resp) => this.validateFuneralCity(resp) }
                checkMemorialPark = { (resp) => this.validateMemorialPark(resp) }
                checkMemorialAddress = { (resp) => this.validateMemorialAddress(resp) }
                checkMemorialRegion = { (resp) => this.validateMemorialRegion(resp) }
                checkMemorialProvince = { (resp) => this.validateMemorialProvince(resp) }
                checkMemorialCity = { (resp) => this.validateMemorialCity(resp) }
                checkFuneralDate = { (resp) => this.formatFuneralDate(resp) }
                checkDeceasedDate = { (resp) => this.formatDeceasedDate(resp) }
                checkIntermentDate = { (resp) => this.formatIntermentDate(resp) }
                dependentsRelationship = { dependentsRelationship }
                showDeceasedDependents = { () => this.setState({ showDeceasedDependents : true }) }
                setAttachmentArrayFunc = { (attachmentData) => this.setState({ attachmentData }) }
                changeStateEditToFalse = { () => this.setState({ showEditSubmitButton : false }) }
                editFormData={ (
                  funeralDate,
                  intermentDate,
                  deceasedDate,
                  dependentId,
                  funeralHome,
                  funeralAddress,
                  funeralRegion,
                  funeralProvince,
                  funeralCity,
                  memorialPark,
                  memorialAddress,
                  memorialRegion,
                  memorialProvince,
                  memorialCity,
                  attachmentData
                ) =>
                  this.editForm(
                    funeralDate,
                    intermentDate,
                    deceasedDate,
                    dependentId,
                    funeralHome,
                    funeralAddress,
                    funeralRegion,
                    funeralProvince,
                    funeralCity,
                    memorialPark,
                    memorialAddress,
                    memorialRegion,
                    memorialProvince,
                    memorialCity,
                    attachmentData
                  )
                }
                submitFormData={ (
                  funeralDate,
                  intermentDate,
                  deceasedDate,
                  dependentId,
                  funeralHome,
                  funeralAddress,
                  funeralRegion,
                  funeralProvince,
                  funeralCity,
                  memorialPark,
                  memorialAddress,
                  memorialRegion,
                  memorialProvince,
                  memorialCity,
                  attachmentData
                ) =>
                  this.submitForm(
                    funeralDate,
                    intermentDate,
                    deceasedDate,
                    dependentId,
                    funeralHome,
                    funeralAddress,
                    funeralRegion,
                    funeralProvince,
                    funeralCity,
                    memorialPark,
                    memorialAddress,
                    memorialRegion,
                    memorialProvince,
                    memorialCity,
                    attachmentData
                  )
                }
              />
            }
          </div>
        }
      </div>
    )
  }
}

export default ConnectView(BereavementFragment, Presenter)
