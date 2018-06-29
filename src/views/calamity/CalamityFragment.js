import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/CalamityPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components/'

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from './components/CalamityFormCardComponent'

class CalamityFragment extends BaseMVPView{

  constructor(props) {
    super(props)

    this.state={
      enabledLoader:false,
      calamityAssistance: []
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateCalamityAssistance()
  }

  setValidateCalamityAssistance(calamityAssistance) {
    this.setState({ calamityAssistance })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits')
  }

  render () {
    const {
      calamityAssistance,
      enabledLoader
    }=this.state

    return (
      <div>
        <div>
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>
          <h2 className={ 'header-margin-default' }>
            Calamity Assistance Form
          </h2>
        </div>
        {
          enabledLoader ?
           <center className={ 'circular-loader-center' }>
             <CircularLoader show={ this.state.enabledLoader }/>
           </center> :
          <FormComponent
            calamityAssistance={ calamityAssistance }
          />
        }
      </div>
    )
  }
}


export default ConnectView(CalamityFragment, Presenter)
