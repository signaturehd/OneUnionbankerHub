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
      styleName: 'loans-cards-1',
      title: 'EMERGENCY LOAN',
      path: '/mybenefits/benefits/loans/emergency',
    }, {
      id: 3,
      styleName: 'loans-cards-2',
      title: 'HOUSING ASSISTANCE LOAN',
      path: '/mybenefits/benefits/loans/housingassistance',
    }, {
      id: 1,
      styleName: 'loans-cards-3',
      title: 'SALARY LOAN',
      path: '/mybenefits/benefits/loans/salary',
    },{
      id: 5,
      styleName: 'loans-cards-1',
      title: 'Car Lease New',
      path: '/mybenefits/benefits/loans/carleasenew',
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
                key = { idx }>
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
