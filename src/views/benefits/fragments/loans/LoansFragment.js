import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, GenericButton } from '../../../../ub-components'
import './styles/loans.css'

class LoansFragment extends Component {
  constructor (props) {
    super(props)
  }

  navigate () {
      this.props.history.push('/mybenefits/benefits')
  }

  render () {
    const { history } = this.props

    const benefitsOptions = [{
      id: 2,
      styleName: 'loans-cards-1 loans-option-default',
      title: 'Emergency Loan',
      path: '/mybenefits/benefits/loans/emergency',
    }, {
      id: 3,
      styleName: 'loans-cards-3 loans-option-default',
      title: 'Housing Assistance Loan',
      path: '/mybenefits/benefits/loans/housingassistance',
    }, {
      id: 1,
      styleName: 'loans-cards-6 loans-option-default',
      title: 'Salary Loan',
      path: '/mybenefits/benefits/loans/salary',
    }, {
      id: 4,
      styleName: 'loans-cards-2 loans-option-default',
      title: 'Computer Loan',
      path: '/mybenefits/benefits/loans/computer',
    }, {
      id: 5,
      styleName: 'loans-cards-5 loans-option-default',
      title: 'Motorcycle Loan',
      path: '/mybenefits/benefits/loans/motorcycle',
    }]

    const LoansHome = () => (
      <div>
        <i
          className = { 'back-arrow' }
          onClick = { () => this.navigate() }></i>
        <h1>Multi Purpose Loan</h1>
        <div className = { 'adjustment' }>
        <div className = { 'loans-card-container' }>
        {
          benefitsOptions.map((value, idx) => (
            <Card
              className = { 'loans-card' }
              onClick = { () => history.push(value.path) }
              key = { idx }>
              <div className = { 'loans-column-grid' }>
                <div
                  className = { value.styleName }
                  text = { value.title } />
                <p className = { 'loans-option-cards font-weight-bold font-size-15px' }>
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
          <Route exact path = '/mybenefits/benefits/loans'  render = { LoansHome } />
        </Switch>
      </div>
    )
  }
}

LoansFragment.propTypes = {
  history : PropTypes.object,
}

export default LoansFragment
