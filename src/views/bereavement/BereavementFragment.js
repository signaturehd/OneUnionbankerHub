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
      funeralHome: ''
    }
    this.submitForm = this.submitForm.bind(this)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateBereavement()
  }

  validateFuneralHome (value) {
    const validator = BereavementFunction.checkRequiredAlphabet(value)
    this.setState({ funeralHome : validator })
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
      funeralHome
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
            dependentId={ dependentId }
            dependentsName={ dependentsName }
            checkFuneralHome={ (resp) => validateFuneralHome(resp) }
            dependentsRelationship={ dependentsRelationship }
            showDeceasedDependents={ () => this.setState({ showDeceasedDependents : true }) }
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
