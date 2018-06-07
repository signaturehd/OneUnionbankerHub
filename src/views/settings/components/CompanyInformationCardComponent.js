import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../ub-components/'

import './styles.css'

class CompanyInformationCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { profile, onClick } = this.props
    return (
         <div className = 'card-container'>

           <h4 className = { 'text-title-profile' }> TIN </h4>
           <h5 className = "title">{ profile.TIN }</h5>

           <h4 className = { 'text-title-profile' }> SSS </h4>
           <h5 className = "title">{ profile.SSS }</h5>

           <h4 className = { 'text-title-profile' }> PAGIBIG </h4>
           <h5 className = "title">{ profile.PAGIBIG }</h5>

            <h4 className = { 'text-title-profile' }> PhilHealth </h4>
           <h5 className = "title">{ profile.PhilHealth }</h5>

          </div>
    )
  }
}

CompanyInformationCardComponent.propTypes = {
  onClick : PropTypes.func,
}

export default CompanyInformationCardComponent
