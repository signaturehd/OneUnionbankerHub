import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, GenericButton, Modal } from '../../../../ub-components'
import './styles/medical.css'
import DentalReimbursementFragment from '../../../dentalreimbursement/DentalReimbursementFragment'

class MedicalFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showConfirmationModal : false,
      checkedpath : '',
      showOutpatientModalUnAvailable: false
    }
    this.onCheckedProceed = this.onCheckedProceed.bind(this)
    this.onCheckedOutpatient = this.onCheckedOutpatient.bind(this)
  }

  navigate () {
      this.props.history.push('/mybenefits/benefits')
  }

  onCheckedOutpatient () {
    this.setState({ showOutpatientModalUnAvailable : true })
  }

  onCheckedProceed (path) {
    this.setState({ showConfirmationModal : true, checkedpath : path })
  }

  render () {
    const { history } = this.props
    const {
      showConfirmationModal,
      checkedpath,
      showOutpatientModalUnAvailable
    } =this.state

    const benefitsOptions = [{
      id: 1,
      styleName: 'medical-cards-1 medical-option-default',
      title: 'Dental Loa Issuance',
      path: '/mybenefits/benefits/medical/loa/dental',
    }, {
      id: 2,
      styleName: 'medical-cards-1 medical-option-default',
      title: 'Dental Reimbursement',
      path: '/mybenefits/benefits/medical/reimbursement/dental',
    }, {
      id: 6,
      styleName: 'medical-cards-1 medical-option-default',
      title: 'Maternity Assistance',
      path: '/mybenefits/benefits/medical/assistance/maternity',
    }, {
      id: 4,
      styleName: 'medical-cards-1 medical-option-default',
      title: 'Medical Scheduling',
      path: '/mybenefits/benefits/medical/scheduling',
    }, {
      id: 3,
      styleName: 'medical-cards-1 medical-option-default',
      title: 'Optical Reimbursement',
      path: '/mybenefits/benefits/medical/optical',
    }, {
      id: 5,
      styleName: 'medical-cards-1 medical-option-default',
      title: 'Outpatient Reimbursement',
      path: '/mybenefits/benefits/medical/reimbursement/outpatient',
    },
    // {
    //   id: 7,
    //   styleName: 'medical-cards-1 medical-option-default',
    //   title: 'Vaccine Requisition',
    //   path: '/mybenefits/benefits/medical/vaccine',
    // }
  ]

    const MedicalHome = () => (
      <div>
        <i className = { 'back-arrow' } onClick = { () => this.navigate() }></i>
        <h1>Medical</h1>
        <div className = { 'adjustment' }>
          {
            showConfirmationModal &&
            <Modal>
              <center>
                <h2>We&#39;d like to help you in your labor expenses but this benefit requires post-submission of multiple documents. Would you like to proceed?</h2>
                <br/>
                <div className = { 'grid-global' }>
                  <GenericButton
                    text = { 'No' }
                    onClick = { () => {
                      this.setState({ showConfirmationModal : false})
                    } }
                    />
                  <GenericButton
                    onClick = { () => {
                      this.setState({ showConfirmationModal : false})
                      this.props.history.push(checkedpath)
                      }
                    }
                    text = { 'Yes' }/>
                </div>
              </center>
            </Modal>
          }
        <div className = { 'medical-card-container' }>
          {
          benefitsOptions.map((value, idx) => (
            <Card
              onClick = { () => {
                if(value.id == 6) {
                  this.onCheckedProceed(value.path)
                } else if (value.id === 5) {
                  this.onCheckedOutpatient()
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
        {
          showOutpatientModalUnAvailable &&
          <Modal>
            <center>
              <h2>Outpatient Reimbursement is still under development. Please come back in the next few days to avail of this benefit. Thank you!</h2>
              <br/>
              <GenericButton
                text = { 'Ok' }
                onClick = { () => this.setState({ showOutpatientModalUnAvailable : false }) }
                />
          </center>
          </Modal>
        }
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
