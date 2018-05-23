import React from 'react'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/OpticalPresenter'
import ConnectView from '../../utils/ConnectView'
import Card from './components/OpticalCard'
import ConfirmationModal from './modal/OpticalReviewModal'
import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import './styles/optical.css'

import { CircularLoader } from '../../ub-components'

class OpticalFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showNoticeModal : false,
      showConfirmation : false,
      noticeResponse : null,
      showNoticeResponseModal : false,
      isVisible : false
    }

    // this.noticeOfUndertaking = this.noticeOfUndertaking.bind(this)
  }

  componentDidMount () {
    this.presenter.getOptical()
  }

  isEligible (resp) {
    // check if eligible
    if (resp) {
      this.setState({ isVisible : true })
    }
  }

  noticeOfUndertaking (noticeResponse) {
    // console.log(noticeResponse)
    this.setState({ showNoticeModal : true, showConfirmation: false, noticeResponse })
  }

  navigate () {
    this.props.history.push('/benefits/medical')
  }

  submitForm (amount, finalFile1, finalFile2) {
     this.presenter.addOptical(amount, finalFile1, finalFile2)
  }

  render () {
    const {
      showConfirmation,
      showNoticeModal,
      showNoticeResponseModal,
      noticeResponse,
      file1,
      file2,
      amount,
      response,
      imagePreviewUrl,
      imagePreviewUrl2,
      isVisible,
    } = this.state

    return (
      <div  className = { 'benefits-container' }>
        { super.render() }
        {
          showConfirmation &&
          <ConfirmationModal
            fileReceived = { file1 }
            fileReceived2 = { file2 }
            imagePreviewUrl = { imagePreviewUrl }
            imagePreviewUrl2 = { imagePreviewUrl2 }
            amount = { amount }
            submitForm = { (finalFile1, finalFile2, amount) =>
              this.submitForm(amount, finalFile1, finalFile2) }
            onClose = { () => this.setState({ showConfirmation : false }) }
          />
        }

        {
          showNoticeModal &&
          <NoticeModal
            onClose = { () => this.setState({ showNotice : false })}
            noticeResponse = { noticeResponse }
            benefitId = { '8' }
            onDismiss = { (showNoticeModal, response) =>
              this.setState({ showNoticeModal, response, showNoticeResponseModal : true })  }
          />
        }

        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose = { () => {
              this.setState({ showNoticeResponseModal : false })
              this.props.history.push('/benefits/medical')
            }}
            noticeResponse = { response }
            benefitId = { '8' }
            onDismiss = { (showNoticeModal, response) =>
              this.setState({ showNoticeModal, response })  }
          />

        }

        <div className={ 'breadcrumbs-container' }>
          <i className = { 'left' } onClick = {
              this.navigate.bind(this) }></i>
          <h1>Optical Reimbursement</h1>
        </div>
        {
          isVisible ?
          <div className = { 'optical-container' }>
            <Card onClick = {
                (showConfirmation,
                  file1,
                  file2,
                  amount,
                  imagePreviewUrl,
                  imagePreviewUrl2) =>
            this.setState({
                  showConfirmation,
                  file1,
                  file2,
                  amount,
                  imagePreviewUrl,
                  imagePreviewUrl2 })  }/>
          </div>          :
          <div className = { 'optical-loader' }>
            <center><CircularLoader show = {true} /></center>
          </div>
        }
      </div>
    )
  }
}

export default ConnectView(OpticalFragment, Presenter)
