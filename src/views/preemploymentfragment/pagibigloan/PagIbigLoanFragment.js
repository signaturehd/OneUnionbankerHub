import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card
} from '../../../ub-components/'

import Presenter from './presenter/PagIbigLoanPresenter'

import { Progress } from 'react-sweet-progress'

import "react-sweet-progress/lib/style.css"
import './styles/loanStyle.css'

class PagIbigLoanFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      showPdfViewModal : false,
      pdfFile : ''
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(15)
  }

  onCheckedPdf (link) {
    this.presenter.getOnBoardingDocument(link)
  }

  showPdfFileView (pdfFile) {
    this.setState({ pdfFile })
  }

  render() {
    const {
      history,
      percentage
    } = this.props

    const {
      showPdfViewModal,
      pdfFile
    } = this.state

    const documentCardOptions = [
      {
        id: 0,
        title: 'Download Banko Sentral ng Pilipinas(BSP) Certificate',
        link: '/2018-09-11/12345-Pre-employment Undertaking-1536641036614.pdf',
      }
    ]
    return(
    <div>
      { super.render() }
      <div>
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'header-margin-default text-align-left' }>Pag-IBIG Loan</h2>
            <h2>Setup your Pa-IBIG.</h2>
          </div>
          <Progress
            type = { 'circle' }
            height = { 100 }
            width = { 100 }
            percent={ percentage } />
        </div>
        <br/>
        <br/>
        <h2>Where do you want to deduct your loan?</h2>
        <div className = { 'bsp-grid-card' }>
          {
            documentCardOptions.map((resp, key) =>
            <Card
              key = { key }
              className = { 'bsp-card' }>
              <div className = { 'bsp-grid-x2' }>
                <h2> { resp.title } </h2>
                <div>
                  <span
                    onClick = { () => {
                      this.onCheckedPdf('/2018-09-11/12345-Pre-employment Undertaking-1536641036614.pdf')
                      this.setState({ showPdfViewModal : true  })
                    }
                  }
                    className = { 'bsp-icon bsp-seemore-button' }/>
                </div>
              </div>
            </Card>
            )
          }
        </div>
      </div>
    </div>
    )
  }
}

PagIbigLoanFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

PagIbigLoanFragment.defaultProps = {
}

export default ConnectView(PagIbigLoanFragment, Presenter)
