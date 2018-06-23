import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../ub-components/'

import './styles/settings.css'

class CompanyInformationCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { profile, onClick } = this.props
    return (
         <div className='card-container'>

           <h4 className={ 'text-title-profile' }> TIN </h4>
           <h5 className="title">{ profile.TIN ? profile.PAGIBIG : "(Not Yet Provided)" }</h5>

           <h4 className={ 'text-title-profile' }> SSS </h4>
           <h5 className="title">{ profile.SSS ? profile.SSS : "(Not Yet Provided)" }</h5>

           <h4 className={ 'text-title-profile' }> PAGIBIG </h4>
           <h5 className="title">{ profile.PAGIBIG ? profile.PAGIBIG : "(Not Yet Provided)" }</h5>

            <h4 className={ 'text-title-profile' }> PhilHealth </h4>
           <h5 className="title">{ profile.PhilHealth ? profile.PhilHealth : "(Not Yet Provided)" }</h5>

          </div>
    )
  }
}

CompanyInformationCardComponent.propTypes = {
  onClick : PropTypes.func,
}

export default CompanyInformationCardComponent
