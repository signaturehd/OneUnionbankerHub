import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../ub-components/'

import './styles.css'

class CompanyInformationCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { profile, onClick, rank , linemanager } = this.props
    return (
         <div className = 'card-container'>
            <h5 className = "title">{ rank.rank}</h5>
           <h4 className = { 'text-title-profile' }> RANK </h4>

            <h5 className = "title">{ profile.status}</h5>
           <h4 className = { 'text-title-profile' }> STATUS </h4>

           <h5 className = "title"> { profile.dateHired } </h5> 
            <h4 className = { 'text-title-profile' }> DATE HIRED </h4>

           <h5 className = "title">{ profile.regularizationDate }</h5>
            <h4 className = { 'text-title-profile' }> REGULARIZATION DATE </h4> 

            <h5 className = "title"> { profile.unitAssessement }</h5>
            <h4 className = { 'text-title-profile' }> UNIT ASSESSMENT </h4>

            <h5 className = "title">{ profile.designation }</h5>
            <h4 className = { 'text-title-profile' }> DESIGNATION </h4>

            <h5 className = "title">{ profile.performanceRating }</h5>
            <h4 className = { 'text-title-profile' }> PERFORMANCE RATING </h4>
            <h5 className = "title">{ linemanager.fullName }</h5>
            <h4 className = { 'text-title-profile' }> LINE MANAGER </h4>
          </div>
    )
  }
}

CompanyInformationCardComponent.propTypes = {
  onClick : PropTypes.func,
}

export default CompanyInformationCardComponent
