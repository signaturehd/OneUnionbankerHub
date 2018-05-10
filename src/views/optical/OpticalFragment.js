import React from 'react'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/OpticalPresenter'
import ConnectView from '../../utils/ConnectView'
import Card from './components/OpticalCard'
import ConfirmationModal from './modal/OpticalReviewModal'
import NoticeModal from '../notice/Notice'
import './styles/optical.css'

class OpticalFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      showNoticeModal : false,
      showConfirmation : false,
      noticeResponse : null,
    }

    // this.noticeOfUndertaking = this.noticeOfUndertaking.bind(this)
  }

  componentWillMount () {
    this.presenter.getOptical()
  }

  isEligible (resp) {
    // check if eligible
    if (!respo.isvalid) {
      this.props.history.push('/benefits/medical')
    }
  }

  noticeOfUndertaking (noticeResponse) {
    // console.log(noticeResponse)
    this.setState({ showNoticeModal : true, showConfirmation: false, noticeResponse })
  }

  navigate () {
    this.props.history.push('/benefits/medical')
  }

  render () {
    const { showConfirmation, showNoticeModal, noticeResponse, file1, file2, amount } = this.state
    return (
      <div  className = { 'benefits-container' }>
        { super.render() }

        {
          showConfirmation &&
          <ConfirmationModal
            fileReceived = { file1 }
            fileReceived2 = { file2 }
            amount = { amount }
            presenter = { this.presenter }
            submitForm = { (finalFile1, finalFile2, amount) => this.presenter.addOptical(amount, finalFile1, finalFile2) }
            onClose = { () => this.setState({ showConfirmation : false }) }
          />
        }

        {
          showNoticeModal &&
          <NoticeModal
            onClose = { () => this.setState({showNotice : false})}
            noticeResponse = { noticeResponse }
          />
        }

        <div className={ 'breadcrumbs-container' }>
          <i className = { 'left' } onClick = { this.navigate.bind(this) }></i>
          <h1>Optical Reimbursement</h1>
        </div>
          <div className = { 'optical-container' }>
            <Card onClick = { (showConfirmation, file1, file2, amount) => this.setState({ showConfirmation, file1, file2, amount })  }/>
          </div>
      </div>
    )
  }
}

export default ConnectView(OpticalFragment, Presenter)
