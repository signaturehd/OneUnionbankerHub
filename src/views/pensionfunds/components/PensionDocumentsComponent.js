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
      name,
      id,
      content,
      documents,
      stepperStatus,
      statusCodeFunc,
      isChecked,
      changeCheckedFunc,
    } = this.props

    return (
      <Card
        key = { id }
        className = { 'funds-documents-card' }>
        <div
          dangerouslySetInnerHTML = {{ __html : content }}></div>
        <br/>
        <center>
          <Checkbox
            checked = { isChecked }
            onChange = { () => changeCheckedFunc(isChecked, id) }
            label = { 'I Agree in terms and conditions' }
          />
          <br/>
          <br/>
          <div>
            <PensionStepperComponents
              statusCodeFunc = { () => statusCodeFunc() }
              stepperStatus = { stepperStatus }
              list = { documents }/>
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
