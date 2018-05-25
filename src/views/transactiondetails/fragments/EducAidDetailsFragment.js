import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { Card } from '../../../ub-components'

import './styles/details-fragment.css'

class EducAidDentalsFragment extends Component {
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

EducAidDentalsFragment.propTypes = {
  details : PropTypes.object
}

export default EducAidDentalsFragment
