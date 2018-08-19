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

    this.state={
      disabledCarlease : false,
    }
  }

  componentDidMount () {
    // this.props.presenter.getCarValidate()
  }

  render () {
    const { disabledCarlease } = this.state
    const { history, callCarBack, onClose } = this.props

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

    return (
      <div>
        <Modal
          isDismisable={ true }
        >
          <h2>Under Development</h2>
            <br/>
          <center>
            <h4>Hi there! Unfortunately Car Lease applications will not be available until August 2018. Please come back then to avail of your Brand New Car!</h4>
            <br/>
            <GenericButton
              text={ 'OK' }
              onClick={ () => callCarBack() }
            />
        </center>
        </Modal>
        {
          disabledCarlease &&
          <div>
            <i
              className={ 'back-arrow' }
              onClick={ () => this.navigate() }></i>
            <h1>CAR LEASE OPTION</h1>
            <div className={ 'adjustment' }>
              <div className={ 'card-container' }>
                {
                benefitsOptions.map((value, idx) => (
                  <Card
                    className={ 'benefits-card' }
                    key={ idx }>
                    <div
                      className={ value.styleName}
                      text={ value.title }
                      onClick={ () => history.push(value.path) } >
                      <p className={ 'benefits-option-cards' }>
                        { value.title }
                      </p>
                      <h2 className = { 'font-size-14px' }> Lorem ipsum dolor </h2>
                    </div>
                  </Card>
                  ))
                }
              </div>
            </div>
          </div>
        }
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
