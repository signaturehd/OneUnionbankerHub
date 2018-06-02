import React from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/DentalReimbursementPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'
import DentalReimbursementReviewModal from './modal/DentalReimbursementReviewModal'
import DentalReimbursementProcedureModal from './modal/DentalReimbursementProcedureModal'
import DentalReimbursementCard from './components/DentalReimbursementCard'
import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import './styles/dental-reimbursement.css'

import { CircularLoader, Checkbox } from '../../ub-components/'

class DentalReimbursementFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      procedureModal: false,
      reviewModal: false,
      disabled: false, // this is for circular loader
      noticeResponse : null, /*notice response*/
      showNoticeResponseModal : false,
      showNoticeModal : false,
      showConfirmation : false,

    }
  }

  componentDidMount () {
    this.presenter.getDentalReimbursement()
    this.props.setSelectedNavigation(1)
  }

  hideCircularLoader ( disabled ) {
    this.setState({ disabled : false })
  }


  showCircularLoader ( disabled ) {
    this.setState({ disabled : true })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/medical')
  }

  /*Notice Response*/
  noticeOfUndertaking (noticeResponse) {
    // console.log(noticeResponse)
    this.setState({ showNoticeModal : true, noticeResponse })
  }

  showDentalReimbursementValidate ( validateDentalReimbursementResp ) {
    this.setState({
      dependents: validateDentalReimbursementResp.dependents,
    })
  }

  render () {
    const {
      procedureModal,
      reviewModal,
      disabled,
      dependents,
      selectedDependent,
      selectedProcedures,
      showConfirmation,
      showNoticeModal,
      showNoticeResponseModal,
      noticeResponse,
      response,
    } = this.state

    return (
      <div  className = { 'benefits-container' }>
        { super.render() }
        <div className={ 'breadcrumbs-container' }>
          <i className = { 'left' } onClick = { () => this.navigate() }></i>
          <h4 className = { 'header-margin-default' } >DENTAL REIMBURSEMENT</h4>
        </div>
          <div className = { 'dentalreimbursement-container' }>
            {
              showNoticeModal &&
              <NoticeModal
                onClose = { () => this.setState({ showNotice : false })}
                noticeResponse = { noticeResponse }
                benefitId = { '6' }
                onDismiss = { (showNoticeModal, response) =>
                  this.setState({ showNoticeModal, response, showNoticeResponseModal : true })  }
              />
            }

            {
              showNoticeResponseModal &&
              <ResponseModal
                onClose = { () => {
                  this.setState({ showNoticeResponseModal : false })
                  this.props.history.push('/mybenefits/benefits/medical')
                }}
                noticeResponse = { response }
                benefitId = { '6' }
                onDismiss = { (showNoticeModal, response) =>
                  this.setState({ showNoticeModal, response })  }
              />

            }
            {
              disabled ?
               <center className = { 'dentalloa-loader' }>
                <CircularLoader show = {this.state.disabled}/>
               </center>
               :
              <DentalReimbursementCard
                presenter = { this.presenter }
                dependents = { dependents }/>
            }
          </div>
      </div>
    )
  }
}

export default ConnectView(DentalReimbursementFragment, Presenter)
