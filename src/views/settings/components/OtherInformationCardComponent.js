import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../ub-components/'

import './styles/settings.css'

class CompanyInformationCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { profile, onClick, profileDependent } = this.props
    return (
       <div className={ 'profile-container' }>
         <div className={ 'profile-settings-grid' }>
           <div>
             <div></div>
               <span className={ 'icon-settings employeeTax' }/>
             <div></div>
           </div>
           <div>
             <h4 className={ 'text-title-profile' }> TIN NUMBER </h4>
             <h5 className={ 'title' }>{ profile.TIN ? profile.PAGIBIG : '(Not Yet Provided)' }</h5>
           </div>
         </div>
         <div className={ 'profile-settings-grid' }>
           <div>
             <div></div>
               <span className={ 'icon-settings employeeSSS' }/>
             <div></div>
           </div>
           <div>
            <h4 className={ 'text-title-profile' }> SSS NUMBER</h4>
            <h5 className={ 'title' }>{ profile.SSS ? profile.SSS : '(Not Yet Provided)' }</h5>
           </div>
         </div>
         <div className={ 'profile-settings-grid' }>
           <div>
             <div></div>
               <span className={ 'icon-settings employeePagibig' }/>
             <div></div>
           </div>
           <div>
             <h4 className={ 'text-title-profile' }> PAGIBIG NUMBER</h4>
             <h5 className={ 'title' }>{ profile.PAGIBIG ? profile.PAGIBIG : '(Not Yet Provided)' }</h5>
           </div>
         </div>
         <div className={ 'profile-settings-grid' }>
           <div>
             <div></div>
               <span className={ 'icon-settings employeePHIC' }/>
             <div></div>
           </div>
           <div>
            <h4 className={ 'text-title-profile' }> PHILHEALTH NUMBER</h4>
            <h5 className={ 'title' }>{ profile.PhilHealth ? profile.PhilHealth : '(Not Yet Provided)' }</h5>
           </div>
         </div>
         <div className={ 'profile-settings-grid' }>
           <div>
             <div></div>
               <span className={ 'icon-settings employeeDependent' }/>
             <div></div>
           </div>
           <div>
            <h4 className={ 'text-title-profile' }> PHILHEALTH NUMBER</h4>
            {
              profileDependent && profileDependent.map((dependent, i) =>
              <h5
                key={ i }
                className={ 'title' }
                > { dependent.firstName ? dependent.firstName : '(Not Yet Provided)' } { dependent.lastName ? dependent.lastName : '(Not Yet Provided)' }</h5>
              )
            }
           </div>
         </div>
      </div>
    )
  }
}

CompanyInformationCardComponent.propTypes = {
  onClick : PropTypes.func,
}

export default CompanyInformationCardComponent
