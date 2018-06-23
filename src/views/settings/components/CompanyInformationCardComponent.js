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
     <div className={ "profile-container" }>
       <div className={ "profile-settings-grid" }>
         <div>
           <div></div>
             <span className={ 'icon-settings employeeDesignation' }/>
           <div></div>
         </div>
         <div>
           <h5 className={ "title" }> { profile.position ? profile.position  : "(Not Yet Provided)"} </h5>
           <h4 className={ 'text-title-profile' }> POSITION </h4>
         </div>
       </div>
       <div className={ "profile-settings-grid" }>
         <div>
           <div></div>
             <span className={ 'icon-settings employeeWorkClass' }/>
           <div></div>
         </div>
         <div>
           <h5 className={ "title" }>{ profile.workClass ? profile.workClass : "(Not Yet Provided)" }</h5>
           <h4 className={ 'text-title-profile' }> WORK CLASS </h4>
         </div>
       </div>
       <div className={ "profile-settings-grid" }>
         <div>
           <div></div>
             <span className={ 'icon-settings employeeRank' }/>
           <div></div>
         </div>
         <div>
           <h5 className={ "title" }>{ rank.rank ? rank.rank : "(Not Yet Provided)" }</h5>
           <h4 className={ 'text-title-profile' }> RANK </h4>
         </div>
       </div>
       <div className={ "profile-settings-grid" }>
         <div>
           <div></div>
             <span className={ 'icon-settings employeeLineManager' }/>
           <div></div>
         </div>
         <div>
           <h5 className={ "title" }>{ linemanager.fullName ? linemanager.fullName : "(Not Yet Provided)" }</h5>
           <h4 className={ 'text-title-profile' }> LINE MANAGER </h4>
         </div>
       </div>
       <div className={ "profile-settings-grid" }>
         <div>
           <div></div>
             <span className={ 'icon-settings employeePremiumBadge' }/>
           <div></div>
         </div>
         <div>
           <h5 className={ "title" }>{ profile.performanceRating ? profile.performanceRating : "(Not Yet Provided)" }</h5>
           <h4 className={ 'text-title-profile' }> PERFORMANCE RATING </h4>
         </div>
       </div>
       <div className={ "profile-settings-grid" }>
         <div>
           <div></div>
             <span className={ 'icon-settings employeeUnitAssignment' }/>
           <div></div>
         </div>
         <div>
           <h5 className={ "title" }> { profile.unitAssessment ? profile.unitAssessment : "(Not Yet Provided)" }</h5>
           <h4 className={ 'text-title-profile' }> UNIT ASSIGNMENT </h4>
         </div>
       </div>
       <div className={ "profile-settings-grid" }>
         <div>
           <div></div>
             <span className={ 'icon-settings employeeLocation' }/>
           <div></div>
         </div>
         <div>
           <h5 className={ "title" }> { profile.location ? profile.location : "(Not Yet Provided)" }</h5>
           <h4 className={ 'text-title-profile' }> LOCATION </h4>
         </div>
       </div>
       <div className={ "profile-settings-grid" }>
         <div>
           <div></div>
             <span className={ 'icon-settings employeeDateHired' }/>
           <div></div>
         </div>
         <div>
           <h5 className={ "title" }> { profile.dateHired ? profile.dateHired : "(Not Yet Provided)" } </h5>
           <h4 className={ 'text-title-profile' }> DATE HIRED </h4>
         </div>
       </div>
       <div className={ "profile-settings-grid" }>
         <div>
           <div></div>
             <span className={ 'icon-settings employeeRegularizationDate' }/>
           <div></div>
         </div>
         <div>
           <h5 className={ "title" }>{ profile.regularizationDate ? profile.regularizationDate : "(Not Yet Provided)" }</h5>
           <h4 className={ 'text-title-profile' }> REGULARIZATION DATE </h4>
         </div>
       </div>
    </div>
    )
  }
}

BasicInformationCardComponent.propTypes = {
  onClick : PropTypes.func,
}

export default BasicInformationCardComponent
