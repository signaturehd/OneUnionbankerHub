import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/Bir2316Presenter'
import ConnectView from '../../utils/ConnectView'

import Bir2316Components from './components/Bir2316Components'

import { CircularLoader } from '../../ub-components/'

import './styles/birStyle.css'
class Bir2316Fragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      pdfFile: null,
      showPayslipDetails: false,
      index : 3,
      viewMoreText : 'View more',
    }
  }

  componentDidMount () {
    this.presenter.getBir2316List()
  }

  setBIRList (dataArray) {
    this.setState({ dataArray })
  }

  /* Loader*/
  showCircularLoader () {
    this.setState({ enabledLoader: true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader: false })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/carlease')
  }

  render () {
    const {
      backToList
    } = this.props

    const {
      employeeId,
      index,
      viewMoreText,
      enabledLoader,
      dataArray
    } = this.state

    return (
      <div className={ 'bir2316list-container' }>
        { super.render() }
        {
          enabledLoader &&
          <center className = { 'circular-loader-center' }>
            <CircularLoader
              validateLoading = { true }
              show = { enabledLoader }
            />
          </center>
        }
        {
          // showPayslipDetails &&
          //   <PayslipDetailsModal
          //     pdfFile = { pdfFile }
          //     showPayslipDetails = { showPayslipDetails }
          //     onClose={ () => this.setState({ showPayslipDetails: false, pdfFile : null }) }
          //   />
        }
        <div className = { 'bir2316list-grid-column' }>
          <div>
            <i
              className = { 'back-arrow' }
              onClick = { () => backToList() }>
            </i>
          </div>
          <div>
            <h2 className={ 'header-margin-default text-align-left' }>My BIR 2316</h2>
            <h2>View your most recent BIR documents.</h2>
          </div>
        </div>
        <br/>
        {
          dataArray &&
          <Bir2316Components
            index = { index }
            viewMoreText = { viewMoreText }
            viewMore = { () => this.setState({ index : dataAray.length, viewMoreText : 'View less' }) }
            viewLess = { () => this.setState({ index : 3, viewMoreText : 'View more' }) }
            dataArrayList = { dataArray }
            onSubmit = { (date) =>
              {}
             }
          />
        }
      </div>
    )
  }
}
export default ConnectView(Bir2316Fragment, Presenter)
