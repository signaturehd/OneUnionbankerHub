import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Card,
  GenericButton,
  CircularLoader,
  Modal
} from '../../../../ub-components'
import './styles/carlease.css'

class CarLeaseFragment extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    // this.props.presenter.getCarValidate()
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/')
  }

  render () {
    const { history, callCarBack, onClose } = this.props

    const benefitsOptions = [{
      id: 0,
      styleName: 'car-cards-1 car-option-default',
      title: 'BRAND NEW CAR',
      path: '/mybenefits/benefits/carlease/new',
    }, {
      id: 1,
      styleName: 'car-cards-1 car-option-default',
      title: 'SECOND HAND CAR',
      path: '/mybenefits/benefits/carlease/old',
    }]

    return (
      <div>
        <div>
          <i
            className={ 'back-arrow' }
            onClick={ () => this.navigate() }></i>
          <h1>Car Lease Options</h1>
          <div className={ 'adjustment' }>
            <div className = { 'car-card-container' }>
              {
              benefitsOptions.map((value, idx) => (
                <Card
                  className={ 'car-card' }
                  key={ idx }
                  onClick = { () => history.push(value.path) }
                  >
                    <div className = { 'car-column-grid' }>
                      <div
                        className={ value.styleName}
                        text={ value.title }
                        onClick={ () => history.push(value.path) }/>
                        <p className={ 'car-option-cards font-weight-bold font-size-15px' }>
                          { value.title }
                        </p>
                        <h2 className = { 'font-size-12px' }> Lorem ipsum dolor </h2>
                      </div>
                  </Card>
                  )
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CarLeaseFragment.propTypes = {
  history : PropTypes.object,
  onClose : PropTypes.func,
  callCarBack : PropTypes.func
}

export default CarLeaseFragment
