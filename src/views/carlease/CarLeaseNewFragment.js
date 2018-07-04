import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/CarLeasePresenter'
import ConnectView from '../../utils/ConnectView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'

import FormComponent from './components/CarLeaseNewFormComponent'

import store from '../../store'
import { NotifyActions } from '../../actions'

class CarLeaseNewFragment extends BaseMVPView {

  constructor (props) {
    super(props)
    this.state = {
      enabledLoader : false,
      noticeResponse : null, /* notice response*/
      showNoticeResponseModal : false,
      showNoticeModal : false,
      showConfirmation : false,
      loanType: 15,
      leaseMode: 1,
      carBrand: '',
      carModel: '',
      makeYear: 0,
      primaryColor: '',
      secondaryColor: '',
      file: '',
    }
    this.sendFormData = this.sendFormData.bind(this)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
  }

  sendFormData (
    carBrand,
    carModel,
    makeYear,
    leaseMode,
    primaryColor,
    secondaryColor,
    file) {
      if (carBrand === null) {
          store.dispatch(NotifyActions.addNotify({
              title : 'Car Lease (New)',
              message : 'Car Brand fields are required',
              type: 'warning'
          })
        )
      }
      else if (carModel === null) {
          store.dispatch(NotifyActions.addNotify({
            title : 'Car Lease (New)',
            message : 'Car Model fields are required',
            type: 'warning'
          })
        )
      }
      else if (makeYear === null) {
          store.dispatch(NotifyActions.addNotify({
            title : 'Car Lease (New)',
            message : 'Year fields are required',
            type: 'warning'
          })
        )
      }
      else if (primaryColor === null) {
        store.dispatch(NotifyActions.addNotify({
            title : 'Car Lease (New)',
            message : 'Primary Color fields are required',
            type: 'warning'
          })
        )
      }
      else if (secondaryColor === null) {
        store.dispatch(NotifyActions.addNotify({
            title : 'Car Lease (New)',
            message : 'Secondary Color fields are required',
            type: 'warning'
          })
        )
      }
      else {
        this.presenter.addCarRequest(
          carBrand,
          carModel,
          makeYear,
          leaseMode,
          primaryColor,
          secondaryColor,
          file ? file : null)
      }
  }

  /* Notice Response*/
  noticeOfUndertaking (noticeResponse) {
    this.setState({ showNoticeModal : true, noticeResponse })
  }

  /* Implementation*/

  showMPLFormAttachments (formAttachments) {
    this.setState({ formAttachments })
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
      enabledLoader,
      formAttachments,
      showConfirmation,
      showNoticeModal,
      showNoticeResponseModal,
      noticeResponse,
      response,
      carBrand,
      carModel,
      makeYear,
      primaryColor,
      secondaryColor,
      file,
      leaseMode
    } = this.state
    const { onSubmit }=this.props

    return (
      <div>
        {
          showNoticeModal &&
          <NoticeModal
            onClose={ () => this.setState({ showNotice : false })}
            noticeResponse={ noticeResponse }
            benefitId={ loanType }
            onDismiss={ (showNoticeModal, response) =>
              this.setState({ showNoticeModal, response, showNoticeResponseModal : true })  }
          />
        }
        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false })
              this.props.history.push('/mybenefits/benefits/carlease')
            }}
            benefitId={ loanType }
            noticeResponse={ response }
            onDismiss={ (showNoticeModal, response) =>
              this.setState({ showNoticeModal, response })  }
          />
        }
        <div>
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>
          <h2 className={ 'header-margin-default' }>
            Car Lease Brand New
          </h2>
        </div>
          {
            enabledLoader ?
             <center className={ 'circular-loader-center' }>
               <CircularLoader show={ this.state.enabledLoader }/>
             </center> :
            <FormComponent
              onSubmit={ (
                carBrand,
                carModel,
                makeYear,
                primaryColor,
                secondaryColor,
                file) =>
                this.sendFormData(
                  carBrand,
                  carModel,
                  makeYear,
                  leaseMode,
                  primaryColor,
                  secondaryColor,
                  file
                  )
                }
            />
          }
      </div>
    )
  }
}
export default ConnectView(CarLeaseNewFragment, Presenter)
