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
      isChecked,
      statusCodeFunc,
      statusCodeReturnFunc,
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
            checked = { isChecked && isChecked }
            onChange = { () => changeCheckedFunc(isChecked, id) }
            label = { 'I Agree in terms and conditions' }
          />
          <br/>
          <br/>
          <div className = {'grid-global-columns-x3' }>
            <div></div>
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
                <i
                  className = { 'forward-arrow' }
                  onClick = { () =>  statusCodeFunc () }></i>
              </div>
            </div>
            <div></div>
          </div>

          <br/>
          <br/>
          <div>
            <PensionStepperComponents
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
