import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class CalamityOtherDetailsComponent extends Component {
    constructor (props) {
      super(props)
    }

    render () {
    const { detailsCalamity, detailsCalamityDetails } = this.props
    const property = TransactionPersonalFunction.checkedCalamityType(detailsCalamityDetails)

    return (
      <div>
        <div>
          <div>
            <h2 className = { 'font-weight-bolder' }> Details </h2>
            <br/>
          </div>
         <div className = { 'transaction-icons-details-grid' }>
           <span className = { ' transaction-card-icon-settings global-icons-calamity' }></span>
           <div>
             <h2 className = { 'font-weight-ligter' }>
               { property }
             </h2>
             <h2 className = { 'unionbank-color font-size-12px' }>
               Calamity Type
             <br/>
             <br/>
             </h2>
           </div>
         </div>
          {
           detailsCalamity &&
           detailsCalamity.CalamityDetails &&
           detailsCalamity.CalamityDetails.DamageProperty &&
           detailsCalamity.CalamityDetails.DamageProperty.map((detail, key) =>
            <div>
             <div
               key = { key }
               className = { 'transaction-icons-details-grid' }>
               <span className = { ' transaction-card-icon-settings global-icons-property' }></span>
               <div>
                 <h2 className = { 'font-weight-ligter' }>
                   { detail.PropertyName }
                 </h2>
                 <h2 className = { 'unionbank-color font-size-12px' }>
                   Property Name
                   <br/>
                   <br/>
                 </h2>
               </div>
             </div>
             <div
               key = { key }
               className = { 'transaction-icons-details-grid' }>
               <span></span>
               <div>
                 <h2 className = { 'font-weight-ligter' }>
                   { moment(detail.DateOfOccurrence).format('MMMM DD, YYYY') }
                 </h2>
                 <h2 className = { 'unionbank-color font-size-12px' }>
                   Date of Occurence
                   <br/>
                   <br/>
                 </h2>
               </div>
             </div>
             <div
               key = { key }
               className = { 'transaction-icons-details-grid' }>
               <span></span>
               <div>
                 <h2 className = { 'font-weight-ligter' }>
                   { detail.PropertyType }
                 </h2>
                 <h2 className = { 'unionbank-color font-size-12px' }>
                   Property Type
                   <br/>
                   <br/>
                 </h2>
               </div>
             </div>
             <div
               key = { key }
               className = { 'transaction-icons-details-grid' }>
               <span></span>
               <div>
                 <h2 className = { 'font-weight-ligter' }>
                   &#8369; { format(detail.AcquisitionValue) }
                 </h2>
                 <h2 className = { 'unionbank-color font-size-12px' }>
                   Estimated Value
                   <br/>
                   <br/>
                 </h2>
               </div>
             </div>
             <div
               key = { key }
               className = { 'transaction-icons-details-grid' }>
               <span></span>
               <div>
                 <h2 className = { 'font-weight-ligter' }>
                   &#8369; { format(detail.RepairCost) }
                 </h2>
                 <h2 className = { 'unionbank-color font-size-12px' }>
                   Estimated Repair Cost
                   <br/>
                   <br/>
                 </h2>
               </div>
             </div>
           </div>
           )
         }
        </div>
      </div>
    )
  }
}

CalamityOtherDetailsComponent.propTypes = {
  detailsCalamity : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
}

export default CalamityOtherDetailsComponent
