import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, GenericButton } from '../../../../ub-components'
import OpticalFragment from '../../../optical/OpticalFragment'
import './styles/medical.css'

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
      title: 'DENTAL LOA',
      path: '/mybenefits/benefits/medical/dentalloa',
    }, {
      styleName: 'medical-cards-2',
      title: 'DENTAL REIMBURSEMENT',
      path: '/mybenefits/benefits/medical/dentalreimbursement',
    }, {
      styleName: 'medical-cards-3',
      title: 'OPTICAL',
      path: '/mybenefits/benefits/medical/optical',
    }]

    const MedicalHome = () => (
        <div className = { 'benefits-container' }  >
          <div className={ 'breadcrumbs-container' }>
            <i className = { 'left' } onClick = { this.navigate.bind(this) }></i>
            <h1>Medical</h1>
          </div>
            <div className = { 'adjustment' }>
            <div className = { 'card-container' }>
              {
              benefitsOptions.map((value, idx) => (
                <Card key={ idx }>
                  <div
                    className = { value.styleName}
                    text = { value.title }
                    onClick = { () => history.push(value.path) } >
                    <p className = { 'benefits-option-cards' }> { value.title } </p></div>
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
          <Route path = '/mybenefits/benefits/medical/optical' render = { props => <OpticalFragment { ...props } />}/>
          <Route path = '/mybenefits/benefits/medical/dentalloa' render = { props => <DentalLoaView { ...props } />}/>
          <Route path = '/mybenefits/benefits/medical/dentalreimbursement' render = { props => <OpticalFragment { ...props } />}/>
        </Switch>
      </div>
    )
  }
}

export default MedicalFragment
