import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/CarLeasePresenter'
import ConnectView from '../../utils/ConnectView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'

import FormComponent from './components/CarLeaseOldForm'

class CarLeaseOldFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      carBrand: '',
      carModel: '',
      makeYear: '',
      primaryColor: '',
      secondaryColor : '',
      enabledLoader : false,
      noticeResponse : null, /* notice response*/
      showNoticeResponseModal : false,
      showNoticeModal : false,
      showConfirmation : false,
      loanType: 1,
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.getCarValidate(this.state.loanType)
  }

  /* Notice Response*/
  noticeOfUndertaking (noticeResponse) {
    this.setState({ showNoticeModal : true, noticeResponse })
  }

  /* Implementation*/

  showMPLFormAttachments (formAttachments) {
    this.setState({ formAttachments })
  }

  showValidate (validateLoanType) {
    this.setState({ validateLoanType })
  }


  /* Loader*/

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }
  /* Navigage back to loans Option*/
  navigate () {
    this.props.history.push('/mybenefits/benefits/carlease')
  }

  render () {
    const {
      carBrand,
      carModel,
      makeYear,
      primaryColor,
      secondaryColor,
      enabledLoader,
      formAttachments,
      showConfirmation,
      showNoticeModal,
      showNoticeResponseModal,
      noticeResponse,
      response } = this.state
    return (
      <div>
        {
          showNoticeModal &&
          <NoticeModal
            onClose = { () => this.setState({ showNotice : false })}
            noticeResponse = { noticeResponse }
            benefitId = { loanType }
            onDismiss = { (showNoticeModal, response) =>
              this.setState({ showNoticeModal, response, showNoticeResponseModal : true })  }
          />
        }

        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose = { () => {
              this.setState({ showNoticeResponseModal : false })
              this.props.history.push('/mybenefits/benefits/carlease')
            }}
            benefitId = { loanType }
            noticeResponse = { response }
            onDismiss = { (showNoticeModal, response) =>
              this.setState({ showNoticeModal, response })  }
          />

        }
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>
            Car Lease Second Hand
          </h2>
        </div>
          {
            enabledLoader ?
             <center className = { 'circular-loader-center' }>
               <CircularLoader show = { this.state.enabledLoader }/>
             </center> :
            <FormComponent
              carBrand = { carBrand }
              carModel = { carModel }
              makeYear = { makeYear }
              primaryColor = { primaryColor }
              secondaryColor = { secondaryColor }
              presenter = { this.presenter }
            />
          }
      </div>
    )
  }
}
export default ConnectView(CarLeaseOldFragment, Presenter)
