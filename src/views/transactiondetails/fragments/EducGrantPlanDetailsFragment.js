import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { Card } from '../../../ub-components'

import './styles/details-fragment.css'

class EducGrantPlanDetails extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details } = this.props
    console.log(details)
    return (
      <div className = {'optical-details-container'}>
        <Card>Transaction Information</Card>
        <Card>Attachments</Card>
        <Card>Form Agreements</Card>
      </div>
    )
  }
}

EducGrantPlanDetails.propTypes = {
  details : PropTypes.object
}

export default EducGrantPlanDetails
