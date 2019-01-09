import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/fundsComponentStyle.css'

class PensionStepperComponents extends Component {
  constructor (props) {
    super(props)
  }

  checkIfSelected (stepper, id) {
    if(id === stepper) {
      return 'active'
    } else {
      return ''
    }
  }

  render () {
    const {
      list,
      stepperStatus
    } = this.props

    return (
      <div
        style = {{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
        className = { 'funds-component-stepper-grid' }>
        <div></div>
        <div
          style = {{
             display: 'flex',
           }}
          className = { ' funds-border-stepper' }>
          {
            list && list.forms.map((resp) => (
              <div>
                <h4 className = { 'font-size-11px' }>{ resp.name }</h4>
                <div className = { `funds-circle${ this.checkIfSelected(stepperStatus, resp.id) }` }></div>
              </div>
            ))
          }
        </div>
        <div></div>
      </div>
    )
  }
}

export default PensionStepperComponents
