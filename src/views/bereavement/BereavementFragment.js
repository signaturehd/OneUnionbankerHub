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

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from  './components/BereavementFormCardComponent'
import * as BereavementFunction from './controller/BereavementFunction'

class BereavementFragment extends BaseMVPView {

  constructor (props) {
    super (props)
    this.state={
      enabledLoader : false,
      validatedBereavement: [],
      showDepedents: [],
      showNoticeModal : false,
      noticeResponse : null,
      showBenefitFeedbackModal : false,
      showNoticeResponseModal : false,
      dependentsName: '',
      dependentsRelationship: '',
      dependentId: '',
      showDeceasedDependents : false,
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
    const validator = BereavementFunction.checkRequiredAlphabet(value)
    this.setState({ memorialAddress : validator })
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

  navigate () {
    this.props.history.push('/mybenefits/benefits')
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
    file
  ) {
    if (funeralHome === null || funeralHome === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Funeral Home field is required',
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
    else if (funeralCity === null || funeralCity === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Funeral City field is required',
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
    else if (funeralProvince === null || funeralProvince === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Funeral Province field is required',
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
    else if (memorialCity === null || memorialCity === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Memorial City field is required',
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
    else if (dependentId === null || dependentId === 0) {
      store.dispatch(NotifyActions.addNotify({
          title: 'Warning',
          message: 'Dependent field is required',
          type: 'warning',
          duration: 2000
        })
      )
    }
    else {
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
      this.presenter.addBereavement(dependentId, objectDate, objectFuneral, objectMemorial, file)
    }
  }

  render () {
    const {
      enabledLoader,
      validatedBereavement,
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
      errorMessage
    }=this.state

    const { type }=this.props.match.params

    return (
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
              this.props.history.push('/mybenefits/benefits'),
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
          <h2 className={ 'header-margin-default' }>
            Bereavement
          </h2>
        </div>
        {
          enabledLoader ?
          <center className={ 'circular-loader-center' }>
            <CircularLoader show={ enabledLoader }/>
          </center>
          :
          <FormComponent
            withDeathCert={ type === "certified" ? true : false  }
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
            sendFormData={ (
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
              file
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
                file
              )
            }
          />
        }
      </div>
    )
  }
}

export default ConnectView(BereavementFragment, Presenter)
