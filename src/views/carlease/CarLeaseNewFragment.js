import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/CarLeasePresenter'
import ConnectView from '../../utils/ConnectView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'

import FormComponent from './components/CarLeaseNewFormComponent'

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
      carBrand: '',
      carModel: '',
      makeYear: 0,
      primaryColor: '',
      secondaryColor: '',
      file: ''
    }
    this.sendFormData = this.sendFormData.bind(this)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.getCarValidate()
  }

  sendFormData (
    carBrand,
    carModel,
    makeYear,
    primaryColor,
    secondaryColor,
    file) {
      if (
        carBrand === null ||
        carModel === null ||
        makeYear === null ||
        primaryColor === null ||
        secondaryColor === null ||
        file === null) {
          store.dispatch(NotifyActions.addNotify({
              title : 'Warning',
              message : 'Please complete all fields'
          })
        )
      } else {
        this.presenter.addCarRequest(
          carBrand,
          carModel,
          makeYear,
          primaryColor,
          secondaryColor,
          file)
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
      file } = this.state
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
              onClick={
                this.sendFormData(
                  carBrand,
                  carModel,
                  makeYear,
                  primaryColor,
                  secondaryColor,
                  file
                  )
                }
              onSubmit={ (
                getCarBrandData,
                getCarModelData,
                getMakeYearData,
                getPrimaryColorData,
                getSecondaryColorData,
                getFileData) => this.setState({
                  carBrand : getCarBrandData,
                  carModel : getCarModelData,
                  makeYear : getMakeYearData,
                  primaryColor : getPrimaryColorData,
                  secondaryColor : getSecondaryColorData,
                  file : getFileData
                })
              }
            />
          }
      </div>
    )
  }
}
export default ConnectView(CarLeaseNewFragment, Presenter)
