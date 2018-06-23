import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../ub-components/'

import './styles/settings.css'

class BasicInformationCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { profile, onClick, rank, linemanager } = this.props

    return (
     <div className='card-container'>
       <h4 className={ 'text-title-profile' }> POSITION </h4>
        <h5 className="title"> { profile.position ? profile.position  : "(Not Yet Provided)"} </h5>

        <h4 className={ 'text-title-profile' }> DESIGNATION </h4>
        <h5 className="title">{ profile.designation ? profile.designation : "(Not Yet Provided)" }</h5>

        <h4 className={ 'text-title-profile' }> CLASS </h4>
        <h5 className="title">{ profile.workClass ? profile.workClass : "(Not Yet Provided)" }</h5>

        <h4 className={ 'text-title-profile' }> RANK </h4>
        <h5 className="title">{ rank.rank ? rank.rank : "(Not Yet Provided)" }</h5>

        <h4 className={ 'text-title-profile' }> UNIT ASSESSMENT </h4>
        <h5 className="title"> { profile.unitAssessment ? profile.unitAssessment : "(Not Yet Provided)" }</h5>

        <h4 className={ 'text-title-profile' }> LOCATION </h4>
        <h5 className="title"> { profile.location ? profile.location : "(Not Yet Provided)" }</h5>

        <h4 className={ 'text-title-profile' }> DATE HIRED </h4>
        <h5 className="title"> { profile.dateHired ? profile.dateHired : "(Not Yet Provided)" } </h5>

        <h4 className={ 'text-title-profile' }> REGULARIZATION DATE </h4>
        <h5 className="title">{ profile.regularizationDate ? profile.regularizationDate : "(Not Yet Provided)" }</h5>

        <h4 className={ 'text-title-profile' }> LINE MANAGER </h4>
        <h5 className="title">{ linemanager.fullName ? linemanager.fullName : "(Not Yet Provided)" }</h5>

        <h4 className={ 'text-title-profile' }> PERFORMANCE RATING </h4>
        <h5 className="title">{ profile.performanceRating ? profile.performanceRating : "(Not Yet Provided)" }</h5>
      </div>
    )
  }
}

BasicInformationCardComponent.propTypes = {
  onClick : PropTypes.func,
}

export default BasicInformationCardComponent
