import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  Modal,
  GenericButton,
  CircularLoader,
  GenericInput,
  SingleInputModal,
  Card
} from '../../../ub-components/'

import { RequiredValidation } from '../../../utils/validate/'

import ChildrenFormModal from './modals/ChildrenModal'
import ChildrenMultipleCardComponent from './components/ChildrenMultipleCardComponent'
import Presenter from './presenter/ChildrenPresenter'

import { Progress } from 'react-sweet-progress'

import "react-sweet-progress/lib/style.css"
import './styles/childrenStyle.css'

class ChildrenFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      financeStatus : [],
      childrenData : [],
      showFinanceStatusModal : false,
      enabledLoader : false,
      showFinanceStatusErrorMessage : '',
      statusId: '',
      financeId: '',
      statusName: '',
      bankNameInstitution : '',
      natureObligation: '',
      amount: '',
      bankNameInstitutionErrorMessage : '',
      natureObligationErrorMessage: '',
      amountErrorMessage: '',
      statusNameErrorMessage: '',
      noticeResponse: '',
      showFinanceModal : false,
      showFinancialFormModal : false,
      editMode : false,
      financeDetailsHolder : [],
      index : 4,
      viewMoreText : 'View more',
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(18)
    this.presenter.getFinancialStatus()
    this.presenter.getFinancialDetails()
    this.presenter.getChildren()
  }

  circularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  validator (input) {
   return new RequiredValidation().isValid(input)
  }

  showChildrenDetails (childrenData) {
    this.setState({ childrenData })
  }

  showFinanceStatus (financeStatus) {
    this.setState({ financeStatus })
  }

  showFinanceDetails (financeDetailsHolder) {
    this.setState({ financeDetailsHolder })
  }

  noticeResponseFunc (noticeResponse) {
    this.setState({ showFinanceModal : true })
    this.setState({ noticeResponse })
  }

  submitForm () {
    const {
      bankNameInstitution,
      natureObligation,
      amount,
      statusName,
      statusId,
      bankNameInstitutionErrorMessage,
      natureObligationErrorMessage,
      amountErrorMessage,
      statusNameErrorMessage,
      financeId,
      editMode
    } = this.state

    if (!this.validator(bankNameInstitution)) {
      this.setState({ bankNameInstitutionErrorMessage: 'Name of the Bank/ Financial Institution field is required' })
    } else if (!this.validator(natureObligation)) {
      this.setState({ natureObligationErrorMessage : 'Nature of Obligation field is required'  })
    } else if (!this.validator(amount)) {
      this.setState({ amountErrorMessage : 'Amount field is required'  })
    } else if (!this.validator(statusName)) {
      this.setState({ statusNameErrorMessage : 'Status field is required' })
    } else {
      if(editMode) {
        this.presenter.putFinancialStatus(
          bankNameInstitution,
          natureObligation,
          amount,
          statusId,
          financeId
        )
        this.setState({ showFinancialFormModal : false })
        this.setState({
          bankNameInstitution : '',
          natureObligation : '',
          amount : '',
          statusId : '',
          fiananceId : '',
          editMode: false,
        })
      } else {
      this.presenter.addFinancialStatus(
        bankNameInstitution,
        natureObligation,
        amount,
        statusId,
        financeId)

        this.setState({ showFinancialFormModal : false })
        this.setState({
          bankNameInstitution : '',
          natureObligation : '',
          amount : '',
          statusId : '',
          fiananceId : '',
          editMode: false,
        })
      }
    }
  }


  render() {
    const {
      history,
      checkPEUndertaking,
      percentage
    } = this.props

    const {
      enabledLoader,
      childrenData,
      financeStatus,
      financeDetailsHolder,
      statusId,
      statusName,
      bankNameInstitution,
      natureObligation,
      amount,
      showFinanceStatusModal,
      bankNameInstitutionErrorMessage,
      natureObligationErrorMessage,
      amountErrorMessage,
      statusNameErrorMessage,
      showFinanceStatusErrorMessage,
      noticeResponse,
      showFinanceModal,
      showFinancialFormModal,
      index,
      viewMoreText,
      financeId,
      editMode
    } = this.state


    const isVisible = (childrenData && childrenData.length > 4) ? '' : 'hide'

    return(
    <div>
    { super.render() }
      {
        showFinanceModal &&
        <Modal>
          <center>
            <h2>{ noticeResponse }</h2>
            <br/>
            <GenericButton
              onClick = { () => this.setState({ showFinanceModal : false }) }
              text = { 'Ok' }
              />
          </center>
        </Modal>
      }
      {
        showFinancialFormModal &&
        <ChildrenFormModal
          natureObligationFunc = { (natureObligation) =>  this.setState({ natureObligation }) }
          statusName = { statusName }
          bankNameInstitution = { bankNameInstitution }
          natureObligation = { natureObligation }
          amount = { amount }
          bankNameInstitutionFunc = { (bankNameInstitution) => this.setState({ bankNameInstitution }) }
          amountFunc = { (amount) => this.setState({ amount }) }
          submitForm = { () => this.submitForm() }
          onClose = { () => this.setState({ showFinancialFormModal : false }) }
          bankNameInstitutionErrorMessage = { bankNameInstitutionErrorMessage }
          natureObligationErrorMessage = { natureObligationErrorMessage }
          amountErrorMessage = { amountErrorMessage }
          statusNameErrorMessage = { statusNameErrorMessage }
          showFinanceStatusModal = { showFinanceStatusModal }
          showFinanceStatusErrorMessage = { showFinanceStatusErrorMessage }
          financeStatus = { financeStatus }
          showFinanceStatusModalFunc = { (showFinanceStatusModal) => this.setState({ showFinanceStatusModal : false })}
          statusNameFunc = { () => this.setState({ showFinanceStatusModal : true })}
          editMode = { editMode }
          financeStatusFunc = { (
            statusId,
            statusName,
            showFinanceStatusModal,
            showFinanceStatusErrorMessage
          ) =>
            this.setState({
              statusId,
              statusName,
              showFinanceStatusModal,
              showFinanceStatusErrorMessage,
            }) }
          />
      }
      <div>
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
          <h2 className = { 'header-margin-default text-align-left' }>Children Form</h2>
          <h2>Fill up children form.</h2>
          </div>
          <Progress
            type = { 'circle' }
            height = { 100 }
            width = { 100 }
            percent={ percentage } />
        </div>
        <br/>
        <div className = { 'grid-global' }>
          <div></div>
          <div className = { 'text-align-right' }>
            <GenericButton
              text = { 'Add Financial Obligation' }
              onClick = { () => this.setState({ showFinancialFormModal : true }) }
              />
          </div>
        </div>
        <br/>
        {
          enabledLoader ?
          <center>
            <CircularLoader show = { enabledLoader }/>
          </center>
          :
          <div>
            <ChildrenMultipleCardComponent
              index = { index }
              childrenData = { childrenData }
              financeDetailsHolder = { financeDetailsHolder }
              onEditModeProperty = { () => {} }
              />
            <br/>
            <button
              type = { 'button' }
              className = { `viewmore tooltip ${ isVisible }` }
              onClick = {
                () => {
                  if(index === childrenData.length)
                    this.setState({ index : 4, viewMoreText : 'View more' })
                  else
                    this.setState({ index : childrenData.length, viewMoreText : 'View less' })
                }
              }>
              <img src={ require('../../../images/icons/horizontal.png') } />
              <span className={ 'tooltiptext' }>{ viewMoreText }</span>
            </button>
          </div>
        }
      </div>
    </div>
    )
  }
}

ChildrenFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

ChildrenFragment.defaultProps = {
}

export default ConnectView(ChildrenFragment, Presenter )
