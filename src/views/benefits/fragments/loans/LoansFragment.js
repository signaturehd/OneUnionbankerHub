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
      styleName: 'loans-cards-1',
      title: 'Emergency Loan',
      path: '/mybenefits/benefits/loans/emergency',
    }, {
      styleName: 'loans-cards-2',
      title: 'Housing Assistance Loan',
      path: '/mybenefits/benefits/loans/housingassistance',
    }, {
      styleName: 'loans-cards-3',
      title: 'Salary Loan',
      path: '/mybenefits/benefits/loans/salary',
    }]

    const LoansHome = () => (
        <div>
            <i
              className = { 'back-arrow' }
              onClick = { () => this.navigate() }></i>
            <h1>LOANS</h1>
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
                  <p className = { 'benefits-option-cards' }>
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
