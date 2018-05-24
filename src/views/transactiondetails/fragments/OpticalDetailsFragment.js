import React, { Component } from 'react'

import { Card } from '../../../ub-components'

import './styles/details-fragment.css'

class OpticalDetailFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className = {'optical-details-container'}>
        <Card>Transaction Information</Card>
        <Card>Attachments</Card>
        <Card>Form Agreements</Card>
      </div>
    )
  }
}
