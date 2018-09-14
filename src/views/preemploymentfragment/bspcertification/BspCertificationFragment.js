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

import Presenter from './presenter/BspCertificationPresenter'

import { Progress } from 'react-sweet-progress'

import "react-sweet-progress/lib/style.css"
import './styles/bspCertificateStyle.css'

class BspCertificationFragment extends BaseMVPView {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(7)
  }


  render() {
    const {
      history,
      percentage
    } = this.props

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
            <h2 className={ 'header-margin-default text-align-left' }>BSP Certificate Download</h2>
            <h2>Please download the Banko Sentral Pilipinas(BSP) Certificate by clicking the button below.</h2>
          </div>
          <Progress
            type = { 'circle' }
            height = { 100 }
            width = { 100 }
            percent={ percentage } />
        </div>
        <br/>
        <div className = { 'bsp-grid-card' }>
          {
            documentCardOptions.map((resp, key) =>
            <Card
              key = { key }
              className = { 'bsp-card' }>
              <div className = { 'bsp-grid-x2' }>
                <h2> { resp.title } </h2>
                <div className = { 'grid-global' }>
                  <GenericButton
                    className = { 'bsp-button' }
                    onClick = { () => {} }
                    text = { 'Download' }/>
                  <GenericButton
                    className = { 'bsp-button' }
                    onClick = { () => {} }
                    text = { 'Preview' }/>
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

BspCertificationFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

BspCertificationFragment.defaultProps = {
}

export default ConnectView(BspCertificationFragment, Presenter)
