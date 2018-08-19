import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  Card,
  GenericButton,
  DatePicker,
  Line
} from '../../../ub-components/'

import './styles/bereavementComponentStyle.css'

class BereavementLeaveCardComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    const { navigateBenefits } = this.props
    return (
      <div className={ 'brv-container' }>
        <div className={ 'brv-grid-column-2' }>
          <div></div>
          <Card className = { 'bereavement-leave-card' }>
            <h2 className = { 'tex-align-center' }> Bereavement Leave</h2>
            <br/>
            <div className = { 'grid-global' }>
              <div>
                <DatePicker
                  readOnly
                  text = { 'From Date' }/>
              </div>
              <div>
                <div></div>
                <DatePicker
                  readOnly
                  text = { 'To Date' }/>
              </div>
            </div>
            <div className = { 'grid-global' }>
              <div>
                <GenericInput
                  text = { 'From Time' }/>
              </div>
              <div>
                <div></div>
                <GenericInput
                  text = { 'To Time' }/>
              </div>
            </div>
            <div className = { 'text-align-right' }>
              <GenericButton
                className = { 'bereavement-leave-submit' }
                text = { 'Submit' }
                onClick = { () => navigateBenefits() }
                />
            </div>
          </Card>
          <div></div>
        </div>
      </div>
    )
  }
}

BereavementLeaveCardComponent.propTypes = {
  BereavementLeaveCardComponent: PropTypes.func
}

export default BereavementLeaveCardComponent
