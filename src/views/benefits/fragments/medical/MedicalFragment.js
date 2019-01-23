import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, GenericButton, Modal } from '../../../../ub-components'
import './styles/medical.css'
import DentalReimbursementFragment from '../../../dentalreimbursement/DentalReimbursementFragment'
import MaternityOptionModal from '../../modal/MaternityOptionModal'

class MedicalFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showConfirmationModal : false,
      checkedpath : '',
      showMoreText: 'View requirements',
      showMoreCheck: false,
    }
    this.onCheckedProceed = this.onCheckedProceed.bind(this)
  }

  navigate () {
      this.props.history.push('/mybenefits/benefits')
  }

  onCheckedProceed (path) {
    this.setState({ showConfirmationModal : true, checkedpath : path })
  }

  render () {
    const { history, gender } = this.props
    const {
      showConfirmationModal,
      checkedpath,
      showMoreCheck,
      showMoreText
    } =this.state
    const benefitsOptions = [{
      id: 1,
      styleName: 'medical-cards-2 medical-option-default',
      title: 'Dental Loa Issuance',
      path: '/mybenefits/benefits/medical/loa/dental',
    }, {
      id: 2,
      styleName: 'medical-cards-3 medical-option-default',
      title: 'Dental Reimbursement',
      path: '/mybenefits/benefits/medical/reimbursement/dental',
    }, {
      id: 6,
      styleName: 'medical-cards-4 medical-option-default',
      title: 'Maternity Assistance',
      path: '/mybenefits/benefits/medical/assistance/maternity',
    }, {
      id: 4,
      styleName: 'medical-cards-5 medical-option-default',
      title: 'Medical Scheduling',
      path: '/mybenefits/benefits/medical/scheduling',
    }, {
      id: 3,
      styleName: 'medical-cards-6 medical-option-default',
      title: 'Optical Reimbursement',
      path: '/mybenefits/benefits/medical/optical',
    }, {
      id: 5,
      styleName: 'medical-cards-7 medical-option-default',
      title: 'Outpatient Reimbursement',
      path: '/mybenefits/benefits/medical/reimbursement/outpatient',
    },
    {
      id: 7,
      styleName: 'medical-cards-8 medical-option-default',
      title: 'Vaccine Requisition',
      path: '/mybenefits/benefits/medical/vaccine',
    }
  ]

    const MedicalHome = () => (
      <div>
        <i className = { 'back-arrow' } onClick = { () => this.navigate() }></i>
        <h1>Medical</h1>
        <div className = { 'adjustment' }>
          {
            showConfirmationModal &&

            <MaternityOptionModal
              gender = { gender }
              showMoreText = { showMoreText }
              showMoreCheck = { showMoreCheck }
              showMoreTextFunc = { (showMoreText) => this.setState({ showMoreText }) }
              showMoreCheckFunc = { (showMoreCheck) => this.setState({ showMoreCheck }) }
              navigateMedical = { () => history.push('/mybenefits/benefits/medical/assistance/maternity') }
              showConfirmationModalFunc = { (showConfirmationModal) => this.setState({ showConfirmationModal }) }
            />
          }
        <div className = { 'medical-card-container' }>
          {
          benefitsOptions.map((value, idx) => (
            <Card
              onClick = { () => {
                  if(value.id == 6) {
                    this.onCheckedProceed(value.path)
                  } else {
                    history.push(value.path)
                    }
                }
              }
              className={ 'medical-card' }
              key={ idx }>
              <div className = { 'medical-column-grid' }>
                <div
                  className={ value.styleName }
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
