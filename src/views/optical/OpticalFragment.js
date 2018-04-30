import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/OpticalPresenter'
import ConnectView from '../../utils/ConnectView'

class OpticalFragment extends BaseMVPView {

  render () {
    return (
      <div>
        Optical Fragment
      </div>
    )
  }
}

export default ConnectView(OpticalFragment, Presenter)
