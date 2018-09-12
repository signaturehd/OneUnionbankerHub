import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import BaseMVPView from  '../common/base/BaseMVPView'
import Presenter from './presenter/VaccinePresenter'
import VaccineComponent from './components/VaccineComponent'

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
      vaccineCardHolder : []
    }
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
  this.setState({ showNoticeModal : true, showConfirmation: false, noticeResponse })
  }

  noticeResponse (noticeResponse) {
    this.setState({showConfirmation: false, noticeResponse })
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
      appModesData
    } = this.state

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
          showVaccinesModal &&
          <VaccinesModal
            label = { 'Vaccines' }
            inputArray = { vaccinesData }
            selectedArray = {
              (vaccineId, vaccineName, orderingStart, orderingEnd, cost) => {
                const updatedVaccine = [...vaccineCardHolder]
                updatedVaccine.push(
                  {
                    id : vaccineId,
                    name : vaccineName,
                    orderingStart : orderingStart,
                    orderingEnd : orderingEnd,
                    cost : cost
                  }
                )
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
           vaccineCardHolder = { vaccineCardHolder }
           dependentErrorMessage = { dependentErrorMessage }
           vaccineErrorMessage = { vaccineErrorMessage }
           appModeErrorMessage = { appModeErrorMessage }
           showDependentFunc = { () => this.showDependentFunc() }
           showVaccineFunc = { () => this.showVaccineFunc() }
           showAppModesFunc = { () => this.showAppModesFunc() }
           editFormDataFunc = { () => this.editFormReview() }
           showEditSubmitFunc = { (resp) => this.showEditSubmitFunc(resp) }
           showFormReview = { (resp) => this.showFormReviewFieldDisabled(resp) }
           setCardHolderDefaultyFunc = { (vaccineCardHolder) => this.setState({ vaccineCardHolder }) }
           />
        }
      </div>
    )
  }
}
export default ConnectView(VaccineFragment, Presenter)
