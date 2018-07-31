import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Accordion from '../components/AccordionComponent'
import {
  Card,
  GenericButton,
  CircularLoader,
  Modal,
  FileUploader
} from '../../../ub-components'
import './styles/detailsFragment.css'
import MedicalSchedulingDetailCardComponent from
'../../transaction/components/TransactionMedicalSchedulingComponent/MedicalSchedulingDetailCardComponent'
import * as MedicalSchedulingDetailsFunction from '../controller/MedicalSchedulingDetailsFunction'
import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class MedicalSchedulingDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details, transactionsPerson, agreementsMethod } = this.props

    const detailStatus = MedicalSchedulingDetailsFunction.checkedBenefitStatus(details.status)
    const benefitType = MedicalSchedulingDetailsFunction.checkedBenefitType(details.benefitType)
    const dateFiled = MedicalSchedulingDetailsFunction.checkedDateFilled(details)
    const benefitLabel = MedicalSchedulingDetailsFunction.getBenefitLabelStatus(details.status)

    return (
      <div className={ 'transaction-details-global-x3' }>
        <div></div>
          <Card>
            <div className={ 'transaction-details-container' }>
              <div className = { 'transaction-banner transaction-medical-scheduling' }>
                <div className={ 'transaction-banner-card' }>
                  <div>
                    <h1 className = { 'transaction-details-name font-weight-normal'}>
                      { benefitType }
                    </h1>
                    <div></div>
                  </div>
                  <div className={ 'transaction-details-grid-row' }>
                    <div></div>
                    <div className = { 'transaction-details-status-grid' }>
                      <div className =
                        { `font-weight-bolder grid-global-row-x3 transaction-details-status-${ detailStatus }` }
                      >
                        <div></div>
                          { benefitLabel }
                        <div></div>
                      </div>
                      <div className = { 'font-size-14px' }>Transaction Status</div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <div>
              <MedicalSchedulingDetailCardComponent
                details={ details }
                transactionsPerson={ transactionsPerson }
                onClickAgreements = { (resp) => agreementsMethod(resp) }
              />
            </div>
          </Card>
          <div></div>
        </div>
    )
  }
}
MedicalSchedulingDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array
}

export default MedicalSchedulingDetailsFragment
