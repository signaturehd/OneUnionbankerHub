import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/CommunityTaxPresenter'

import {
  GenericButton,
  CircularLoader,
  GenericInput,
  Card,
  Line,
} from '../../../ub-components/'

import { Progress } from 'react-sweet-progress'

import './styles/communityTaxStyle.css'

class CommunityTaxFragment extends BaseMVPView {

  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(7)
  }

  render () {
    const { percentage } = this.props

    const documentCardOptions = [
      {
        id: 0,
        title: 'Downloadn Acknowledgement',
        link: '/2018-09-11/12345-Pre-employment Undertaking-1536641036614.pdf',
      }
    ]

    return (
      <div>
        { super.render() }
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'header-margin-default text-align-left' }>Community Tax Form</h2>
            <h2></h2>
          <br/>
          </div>
          <Progress
            type = { 'circle' }
            height = { 65 }
            width = { 65 }
            percent = { percentage } />
        </div>
        <br/>
        <GenericInput
          text = { 'CTC or SSS/TIN' } />
        <br/>
        <Line />
        <br/>
        <h2>Downloads</h2>
        <br/>
          <div className = { 'tax-grid-card' }>
            {
              documentCardOptions.map((resp, key) =>
              <Card
                key = { key }
                className = { 'tax-card' }>
                <div className = { 'tax-grid-x2' }>
                  <h2> { resp.title } </h2>
                  <div className = { 'grid-global' }>
                    <GenericButton
                      className = { 'tax-button' }
                      onClick = { () => {} }
                      text = { 'Download' }/>
                    <GenericButton
                      className = { 'tax-button' }
                      onClick = { () => {} }
                      text = { 'Preview' }/>
                  </div>
                </div>
              </Card>
              )
            }
          </div>
      </div>
    )
  }
}

CommunityTaxFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(CommunityTaxFragment, Presenter )
