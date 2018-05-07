import React, { Component } from 'react'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/DentalLoaPresenter'
import ConnectView from '../../utils/ConnectView'
import Card from './components/DentalLoaCard'
import './styles/dentalloa.css'

class DentalLoaFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
        dentalloa: [],
    }
  }
  componentDidMount () {
    this.presenter.addDentalLoa()
  }
  dentalloa ( dentalloa ) {
    this.setState({ dentalloa })
  }
  navigate () {
      this.props.history.push('/benefits/medical')
  }
  render () {
    const { dentalloa } = this.state
    return (
      <div  className = { 'benefits-container' }>
        <div className={ 'breadcrumbs-container' }>
          <i className = { 'left' } onClick = { this.navigate.bind(this) }></i>
          <h1>Dental Loa Issuance</h1>
        </div>
          <div className = { 'dentalloa-container' }>
            <Card/>
          </div>
          <div className = {'card-container'}>
          {
          dentalloa.map((dentalloa, i) =>
              {console.log(dentalloa)}
            )
          }
          </div>
      </div>
    )
  }
}

export default ConnectView(DentalLoaFragment, Presenter)
