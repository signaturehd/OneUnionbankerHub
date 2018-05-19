import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../ub-components/'

import './styles.css'

class BasicInformationCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { profile, onClick } = this.props
    let genderPartial 
    if (profile.gender === 'M') {
 genderPartial = 'Male'
} else {
 genderPartial = 'Female' 
}
    return (
         <div className = 'card-container'>

           <h5 className = "title"> { profile.address } </h5> 
            <h4 className = { 'text-title-profile' }> COMPANY ADDRESS </h4>

           <h5 className = "title">{ profile.birthDate }</h5>
            <h4 className = { 'text-title-profile' }> BIRTH DATE </h4> 

            <h5 className = "title"> +{ profile.contactNumber }</h5>
            <h4 className = { 'text-title-profile' }> CIVIL STATUS </h4>

            <h5 className = "title">{ genderPartial }</h5>
            <h4 className = { 'text-title-profile' }> GENDER </h4>
            <h5 className = "title">{ profile.SSS }</h5>
            <h4 className = { 'text-title-profile' }> SSS </h4>
            <h5 className = "title">{ profile.PAGIBIG }</h5>
            <h4 className = { 'text-title-profile' }> PAGIBIG </h4>
            <h5 className = "title">{ profile.PhilHealth }</h5>
            <h4 className = { 'text-title-profile' }> PhilHealth </h4>
            <h5 className = "title">{ profile.TIN }</h5>
            <h4 className = { 'text-title-profile' }> TIN </h4>
          </div>
    )
  }
}

BasicInformationCardComponent.propTypes = {
  onClick : PropTypes.func,
}

export default BasicInformationCardComponent
