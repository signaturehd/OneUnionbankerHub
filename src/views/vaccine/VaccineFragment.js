import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import BaseMVPView from  '../common/base/BaseMVPView'
import Presenter from './presenter/VaccinePresenter'
import VaccineComponent from './components/VaccineComponent'

import {
  CircularLoader,
  SingleInputModal
} from '../../ub-components/'


class VaccineFragment extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      enabledLoader : false,
      showDependents : false,
      showEditSubmitButton : false,
      dependentsData : []
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateVaccine()
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/medical')
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  showDependentFunc () {
    this.setState({ showDependents: true })
  }

  showDependentMap (dependentsData) {
    this.setState({ dependentsData })
  }

  render () {
    const {
      enabledLoader,
      showEditSubmitButton
    } = this.state

    return (
      <div>
        <div>
        <i
          className={ 'back-arrow' }
          onClick={ this.navigate.bind(this) }>
        </i>
        <h2 className={ 'header-margin-default' }>
          Vaccine Requisition
        </h2>
      </div>
      <br/>
      {
        enabledLoader ?
         <center className={ 'circular-loader-center' }>
           <CircularLoader show={ this.state.enabledLoader }/>
         </center> :
         <VaccineComponent
         showEditSubmitButton = { showEditSubmitButton }
         showEditSubmitFunc = { (resp) => this.showEditSubmitFunc(resp) }
         />
      }
      </div>
  )
}
}
export default ConnectView(VaccineFragment, Presenter)
