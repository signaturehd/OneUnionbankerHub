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
      styleName: 'medical-cards-1',
      title: 'Dental Loan Issuance',
      path: '/mybenefits/benefits/medical/loa/dental',
    }, {
      styleName: 'medical-cards-2',
      title: 'Dental Reimbursement',
      path: '/mybenefits/benefits/medical/reimbursement/dental',
    }, {
      styleName: 'medical-cards-3',
      title: 'Optical Reimbursement',
      path: '/mybenefits/benefits/medical/optical',
    }, {
      styleName: 'medical-cards-4',
      title: 'Medical Scheduling',
      path: '/mybenefits/benefits/medical/scheduling',
    }, {
      styleName: 'medical-cards-5',
      title: 'Outpatient Reimbursement',
      path: '/mybenefits/benefits/medical/reimbursement/outpatient',
    }, {
      styleName: 'medical-cards-6',
      title: 'Maternity Assistance',
      path: '/mybenefits/benefits/medical/assistance/maternity',
    }]

    const MedicalHome = () => (
        <div>
            <i className = { 'back-arrow' } onClick = { () => this.navigate() }></i>
            <h1>MEDICAL</h1>
          <div className = { 'adjustment' }>
          <div className = { 'card-container' }>
            {
            benefitsOptions.map((value, idx) => (
              <Card
                className = { 'benefits-card' }
                key={ idx }>
                <div
                  className = { value.styleName}
                  text = { value.title }
                  onClick = { () => history.push(value.path) } >
                  <p className = { 'benefits-option-cards font-weight-bold' }> { value.title } </p></div>
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
