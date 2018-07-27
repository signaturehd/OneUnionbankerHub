import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/MyTrainingPresenter'

import MyTrainingCardComponent from './components/MyTrainingCardComponent'

import { Card } from '../../ub-components/'

class MyTrainingFragment extends BaseMVPView {

  constructor (props) {
    super(props)
  }

  render () {

    return (
      <div className={ 'profile-container' }>
        { super.render() }
        <MyTrainingCardComponent />
      </div>
    )
  }
}

MyTrainingFragment.propTypes={
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(MyTrainingFragment, Presenter)
