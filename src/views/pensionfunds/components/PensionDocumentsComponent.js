import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Checkbox,
  GenericButton
} from '../../../ub-components/'

import './styles/fundsComponentStyle.css'

import PensionStepperComponents from '../components/PensionStepperComponents'

class PensionDocumentsComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      title,
      id,
      content,
      documents,
      stepperStatus,
      isChecked,
      statusCodeFunc,
      statusCodeReturnFunc,
      changeCheckedFunc,
    } = this.props

    return (
      <Card
        key = { id }
        className = { 'funds-documents-card' }>
        <center>
          <h4 className = { 'font-weight-500 font-size-25px' }>{ title }</h4>
          <br/>
          <br/>
        </center>
        <div
          style = {{
            fontWeight: 'lighter !important',
            fontSize: '14px !important',
          }}
          dangerouslySetInnerHTML = {{ __html : content }} />
        <br/>
        <center>
          {
            id === 3 &&
            <Checkbox
              checked = { isChecked }
              onChange = { () => changeCheckedFunc(isChecked, id) }
              label = { 'I HAVE COMPLETELY READ AND FULLY UNDERSTOOD THIS RISK DISCLOSURE STATEMENT AND PENSION RULES, AND GRANT AUTHORITY TO THE BANK TO DEDUCT MY MONTHLY CONTRIBUTION FROM MY PAYROLL BEFORE I AFFIXED MY DIGITAL SIGNATURE THROUGH MY PIN-CODE.   I HEREBY VOLUNTARILY AND WILLINGLY AGREE TO COMPLY WITH ANY AND ALL LAWS, REGULATIONS, THE PLAN RULES, TERMS AND CONDITIONS GOVERNING MY/OUR INVESTMENT IN THE UNIONBANK RETIREMENT PENSION FUND. ' }
            />
          }
          <br/>
          <br/>
          <div className = {'grid-global-columns-x3' }>
            <div></div>
            <div>
              {
                id === 3 &&
                isChecked ?
                <div className = { 'margin-auto text-align-center' }>
                  <GenericButton
                    text = { 'PROCEED' }
                    className = { 'global-button profile-button-small cursor-pointer' }
                    onClick = { () =>  statusCodeFunc (true,id) }
                  />
                </div>
                :
                <div className = { `${ id > 1 ? 'grid-global' : 'text-align-center' }` }>
                  <div>
                    {
                      id > 1 &&
                      <i
                        className = { 'back-arrow' }
                        onClick = { () =>  statusCodeReturnFunc () }></i>
                    }
                  </div>
                  <div>
                    {
                      id !== 3 &&
                      <i
                        className = { 'forward-arrow' }
                        onClick = { () =>  statusCodeFunc (true,id) }></i>
                    }
                  </div>
                </div>
              }
            </div>
            <div></div>
          </div>

          <br/>
          <br/>
          <div>
            <PensionStepperComponents
              stepperStatus = { stepperStatus }
              list = { documents } />
          </div>
        </center>
      </Card>
    )
  }
}

PensionDocumentsComponent.propTypes = {
  pensionFundsData : PropTypes.object,
}


export default PensionDocumentsComponent
