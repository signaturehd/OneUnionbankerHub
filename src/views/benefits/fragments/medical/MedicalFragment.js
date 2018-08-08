import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, GenericButton } from '../../../../ub-components'
import './styles/medical.css'
import DentalReimbursementFragment from '../../../dentalreimbursement/DentalReimbursementFragment'

class MedicalFragment extends Component {
  constructor (props) {
    super(props)
  }

  navigate () {
      this.props.history.push('/mybenefits/benefits')
  }

  render () {
    const { history } = this.props

    const benefitsOptions = [{
      styleName: 'medical-cards-1 medical-option-default',
      title: 'Dental Loan Issuance',
      path: '/mybenefits/benefits/medical/loa/dental',
    }, {
      styleName: 'medical-cards-1 medical-option-default',
      title: 'Dental Reimbursement',
      path: '/mybenefits/benefits/medical/reimbursement/dental',
    }, {
      styleName: 'medical-cards-1 medical-option-default',
      title: 'Optical Reimbursement',
      path: '/mybenefits/benefits/medical/optical',
    }, {
      styleName: 'medical-cards-1 medical-option-default',
      title: 'Medical Scheduling',
      path: '/mybenefits/benefits/medical/scheduling',
    }, {
      styleName: 'medical-cards-1 medical-option-default',
      title: 'Outpatient Reimbursement',
      path: '/mybenefits/benefits/medical/reimbursement/outpatient',
    }, {
      styleName: 'medical-cards-1 medical-option-default',
      title: 'Maternity Assistance',
      path: '/mybenefits/benefits/medical/assistance/maternity',
    }]

    const MedicalHome = () => (
      <div>
          <i className = { 'back-arrow' } onClick = { () => this.navigate() }></i>
          <h1>Medical</h1>
        <div className = { 'adjustment' }>
        <div className = { 'medical-card-container' }>
          {
          benefitsOptions.map((value, idx) => (
            <Card
              onClick = { () => history.push(value.path) }
              className={ 'medical-card' }
              key={ idx }>
              <div className = { 'medical-column-grid' }>
                <div
                  className={ value.styleName }
                  text={ value.title }
                  />
                <p className={ 'medical-option-cards font-weight-bold font-size-14px' }>
                  { value.title }
                </p>
              </div>
            </Card>
          ))
        }
        </div>
      </div>
    </div>
    )

    return (
      <div>
        <Switch>
          <Route exact path = '/mybenefits/benefits/medical'  render = { MedicalHome } />
        </Switch>
      </div>
    )
  }
}

MedicalFragment.propTypes = {
  history : PropTypes.object,
}

export default MedicalFragment
