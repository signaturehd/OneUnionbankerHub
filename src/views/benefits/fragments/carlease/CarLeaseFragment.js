import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, GenericButton } from '../../../../ub-components'
import './styles/carlease.css'

class CarLeaseFragment extends Component {
  constructor (props) {
    super(props)
  }

  navigate () {
      this.props.history.push('/mybenefits/benefits')
  }

  render () {
    const { history } = this.props

    const benefitsOptions = [{
      id: 0,
      styleName: 'cars-cards-1',
      title: 'BRAND NEW CAR',
      path: '/mybenefits/benefits/carlease/new',
    }, {
      id: 1,
      styleName: 'cars-cards-2',
      title: 'SECOND HAND CAR',
      path: '/mybenefits/benefits/carlease/old',
    }]

    const CarHome = () => (
        <div>
            <i
              className = { 'back-arrow' }
              onClick = { () => this.navigate() }></i>
            <h1>CAR LEASE</h1>
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
          <Route exact path = '/mybenefits/benefits/carlease'  render = { CarHome } />
        </Switch>
      </div>
    )
  }
}

CarLeaseFragment.propTypes = {
  history : PropTypes.object,
}

export default CarLeaseFragment
