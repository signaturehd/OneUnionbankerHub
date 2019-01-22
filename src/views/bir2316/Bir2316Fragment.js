import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/Bir2316Presenter'
import ConnectView from '../../utils/ConnectView'

import { CircularLoader } from '../../ub-components/'

class Bir2316Fragment extends BaseMVPView {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    
  }

  /* Loader*/
  showCircularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/carlease')
  }

  render () {

    return (
      <div>
      </div>
    )
  }
}
export default ConnectView(Bir2316Fragment, Presenter)
