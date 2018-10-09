import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import BaseMVPView from  '../common/base/BaseMVPView'
import Presenter from './presenter/VaccinePresenter'
import VaccineComponent from './components/VaccineComponent'
import NoticeModal from '../notice/Notice'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import {
  CircularLoader,
  SingleInputModal
} from '../../ub-components/'

import VaccinesModal from './modal/VaccinesModal'

import * as VaccineFunction from './function/VaccineFunction'

class VaccineFragment extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      titleChange : true,
      showNoticeModal : false,
      noticeResponse : null,
      showNoticeResponseModal : false,
      showBenefitFeedbackModal : false,
      enabledLoader : false,
      showEditSubmitButton : false,
      showDependentsModal : false,
      showVaccinesModal : false,
      showAppModesModal : false,
      showVaccineList: true,
      dependentId : '',
      dependentName : '',
      dependentErrorMessage : '',
      vaccineId : '',
      vaccineName : '',
      vaccineErrorMessage : '',
      orderingStart : '',
      orderingEnd : '',
      cost : '',
      appModeId : '',
      appModeName : '',
      appModeErrorMessage : '',
      vaccinesData : [],
      dependentsData : [],
      appModesData : [],
      vaccineCardHolder : [],
      vaccineListSubmit: [],
      vaccineList: []
    }

    this.addVaccine = this.addVaccine.bind(this)
    this.addToList = this.addToList.bind(this)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateVaccine()
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/medical')
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }


  setDependentList (dependentList) {
    this.setState({ dependentList })
  }

  setRelationship (relationship) {
    this.setState({ relationship })
  }

  showVaccineMap (vaccinesData) {
    this.setState({ vaccinesData })
  }

  showDependentMap (dependentsData) {
    this.setState({ dependentsData })
  }

  showAppModeMap (appModesData) {
    this.setState({ appModesData })
  }

  showDependentFunc () {
    this.setState({ showDependentsModal: true })
  }

  showVaccineFunc () {
    this.setState({ showVaccinesModal: true })
  }

  showAppModesFunc () {
    this.setState({ showAppModesModal: true })
  }

  validateRequired (e) {
    return VaccineFunction.checkedValidateInput(e)
  }

  addToList () {
    const {
      vaccineCardHolder,
      appModeId,
      appModeName,
      dependentId,
      dependentName,
      vaccineList,
      vaccineListSubmit,
      claimingName,
      claimingId,
      relationshipName,
      genderName,
      birthDate,
    } = this.state

    const updatedVaccineListArray = vaccineList.map(item => item.dependentId)
    const updatedVaccineList = [...vaccineList]
    const updatedVaccineListSubmit = [...vaccineListSubmit]
    if ( !updatedVaccineListArray.includes(dependentId) ) {

      updatedVaccineList.push({
        vaccineCardHolder,
        appModeId,
        appModeName,
        dependentId,
        dependentName,
        claimingId,
        claimingName,
        relationshipName,
        genderName,
        birthDate,
      })
      let vaccine = []


      vaccineCardHolder.map((vaccines, key) => {
        vaccine.push(vaccines.id)
      })

      updatedVaccineListSubmit.push({
        vaccine,
        modeId: appModeId,
        dependentId,
        others: {
          name: dependentName,
          relationship: relationshipName,
          gender: genderName,
          birthDate,
        },
        isClaiming: claimingId,
      })

      this.presenter.setVaccineListSubmit(updatedVaccineListSubmit)
    }



    this.setState({
      vaccineList: updatedVaccineList,
      vaccineListSubmit: updatedVaccineListSubmit,
      appModeName: '',
      appModeId: '',
      claimingId: '',
      claimingName: '',
      dependentId: '',
      dependentName: '',
      relationshipName: '',
      genderName: '',
      birthDate: '',
      vaccineCardHolder: [],
      showVaccineList: true
    })
  }

  showFormReviewFieldDisabled (e) {
    const {
      dependentId,
      vaccineCardHolder,
      appModeId
    } = this.state

    if(!this.validateRequired(dependentId)) {
      this.setState({ dependentErrorMessage : 'Please select a Dependent' })
    } else if(vaccineCardHolder.length == 0) {
      this.setState({ vaccineErrorMessage : 'Please select a Vaccine' })
    } else if(!this.validateRequired(appModeId)) {
      this.setState({ appModeErrorMessage : 'Please select an Application Mode' })
    } else {
      this.setState({
        showEditSubmitButton: true,
        titleChange: false,
      })
    }
  }

  editFormReview (e) {
    this.setState({ showEditSubmitButton : false, titleChange : true })
  }

  noticeOfUndertaking (noticeResponse) {
    this.setState({ showNoticeModal : true, noticeResponse })
  }

  noticeResponse (noticeResponse) {
    this.setState({showConfirmation: false, noticeResponse })
  }

  addVaccine () {
    this.presenter.addVaccine()
  }

  render () {
    const {
      titleChange,
      showNoticeModal,
      noticeResponse,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      enabledLoader,
      showEditSubmitButton,
      showDependentsModal,
      showVaccinesModal,
      showAppModesModal,
      dependentId,
      dependentName,
      dependentErrorMessage,
      vaccineId,
      vaccineName,
      vaccineErrorMessage,
      orderingStart,
      orderingEnd,
      cost,
      appModeId,
      appModeName,
      appModeErrorMessage,
      vaccineCardHolder,
      vaccinesData,
      dependentsData,
      appModesData,
      vaccineList,
      dependentList,
      showVaccineList,
      showClaimingType,
      showRelationship,
      relationshipName,
      relationship,
      claimingName,
      showGender,
      genderName,
      birthDate,
      setBirthDate,
    } = this.state

    console.log(this.state)

    return (
      <div>
        { super.render() }
        {
          showNoticeModal &&
          <NoticeModal
            onClose={ () => this.setState({ showNoticeModal : false })}
            noticeResponse={ noticeResponse }
            benefitId={ '18' }
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
            benefitId={ '18' }
            onClose={ () => {
              this.props.history.push('/mybenefits/benefits/medical'),
              this.setState({ showBenefitFeedbackModal : false })
            }}
          />
        }
        {
          showDependentsModal &&
          <SingleInputModal
            label = { 'Dependents' }
            inputArray = { dependentsData }
            selectedArray = { (dependentId, dependentName) => {
              this.setState({
                dependentId,
                dependentName,
                showDependentsModal : false,
                dependentErrorMessage : ''
                })
              }
            }
            onClose = { () => this.setState({ showDependentsModal : false }) }
          />
        }

        {
          showClaimingType &&
          <SingleInputModal
            label = { 'Claiming Type' }
            inputArray = { [{
              id: 0,
              name: 'Administered'
            }, {
              id: 1,
              name: 'Claiming'
            }] }
            selectedArray = { (claimingId, claimingName) => {
              this.setState({
                showClaimingType: false,
                claimingId,
                claimingName,
              })
            } }
            onClose = { () => {
              this.setState({ showClaimingType : true })
            }}
          />
        }


        {
          showVaccinesModal &&
          <VaccinesModal
            label = { 'Vaccines' }
            inputArray = { vaccinesData }
            selectedArray = {
              (vaccineId, vaccineName, orderingStart, orderingEnd, cost) => {
                const updatedVaccineArray = vaccineCardHolder.map(item => item.id)
                const updatedVaccine = [...vaccineCardHolder]
                if ( !updatedVaccineArray.includes(vaccineId) ) {
                  updatedVaccine.push(
                    {
                      id : vaccineId,
                      name : vaccineName,
                      orderingStart : orderingStart,
                      orderingEnd : orderingEnd,
                      cost : cost
                    }
                  )
                }
                this.setState({
                  vaccineCardHolder : updatedVaccine,
                  showVaccinesModal : false,
                  vaccineErrorMessage : ''
                })
              }
            }
            onClose = { () => this.setState({ showVaccinesModal : false }) }
          />
        }
        {
          showAppModesModal &&
          <SingleInputModal
            label = { 'Application Modes' }
            inputArray = { appModesData }
            selectedArray = { (appModeId, appModeName) => {
              this.setState({
                appModeId,
                appModeName,
                showAppModesModal : false,
                appModeErrorMessage : ''
                })
              }
            }
            onClose = { () => this.setState({ showAppModesModal : false }) }
          />
        }

        {
          showRelationship &&
          <SingleInputModal
            label = { 'Relationship' }
            inputArray = { relationship }
            selectedArray = { (relationshipId, relationshipName) => {
              this.setState({
                relationshipId,
                relationshipName,
                showRelationship : false,
                })
              }
            }
            onClose = { () => this.setState({ showRelationship : false }) }
          />
        }

        {
          showGender &&
          <SingleInputModal
            label = { 'Relationship' }
            inputArray = { [{
              id: 0,
              name: 'Female'
            }, {
              id: 1,
              name: 'Male'
            }] }
            selectedArray = { (genderId, genderName) => {
              this.setState({
                  genderId,
                  genderName,
                  showGender : false,
                })
              }
            }
            onClose = { () => this.setState({ showGender : false }) }
          />
        }

        <div>
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>

          {
            titleChange ?
            <h2 className={ 'header-margin-default' }>
              Vaccine Requisition
            </h2>
            :
            <h2 className = { 'header-margin-default' }>
              Form Summary
            </h2>
          }

        </div>
        <br/>
        {
          enabledLoader ?
           <center className={ 'circular-loader-center' }>
             <CircularLoader show={ this.state.enabledLoader }/>
           </center> :
           <VaccineComponent
             showEditSubmitButton = { showEditSubmitButton }
             dependentName = { dependentName }
             vaccineName = { vaccineName }
             orderingStart = { orderingStart }
             orderingEnd = { orderingEnd }
             cost = { cost }
             appModeName = { appModeName }
             vaccineList = { vaccineList }
             showClaimingType = { () => { this.setState({ showClaimingType: true }) } }
             onSubmitFunc = { () => this.addVaccine() }
             vaccineCardHolder = { vaccineCardHolder }
             dependentErrorMessage = { dependentErrorMessage }
             vaccineErrorMessage = { vaccineErrorMessage }
             appModeErrorMessage = { appModeErrorMessage }
             showDependentFunc = { () => this.showDependentFunc() }
             showVaccineFunc = { () => this.showVaccineFunc() }
             showAppModesFunc = { () => this.showAppModesFunc() }
             editFormDataFunc = { () => this.editFormReview() }
             showVaccineList = { showVaccineList }
             relationshipName = { relationshipName }
             claimingName = { claimingName }
             showRelationship = { () => this.setState({ showRelationship: true }) }
             cancelToList = { () => this.setState({ showVaccineList: true }) }
             addToList = { () => this.addToList() }
             addVaccineList = { () => this.setState({ showVaccineList: false }) }
             showEditSubmitFunc = { (resp) => this.showEditSubmitFunc(resp) }
             showFormReview = { (resp) => this.showFormReviewFieldDisabled(resp) }
             showGender = { () => this.setState({ showGender: true }) }
             genderName = { genderName }
             birthDate = { birthDate }
             setBirthDate = { (birthDate) => this.setState({ birthDate }) }
             setCardHolderDefaultyFunc = { (vaccineCardHolder) => this.setState({ vaccineCardHolder }) }
           />
        }
      </div>
    )
  }
}
export default ConnectView(VaccineFragment, Presenter)
