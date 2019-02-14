import { Progress } from 'react-sweet-progress'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
}  from '../../../ub-components/'

import NewEmployeeHireHeaderComponent from '../components/NewEmployeeHireHeaderComponent'
import NewEmployeeHireVideosComponent from '../components/NewEmployeeHireVideosComponent'

class NewEmployeeHireListFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      neoData,
      selectedVideoFunc,
      selectedVideo
    } = this.props

    return (
      <div>
        <NewEmployeeHireHeaderComponent/>
        <br/>
        <NewEmployeeHireVideosComponent
          neoData = { neoData }
          selectedVideo = { selectedVideo }
          selectedVideoFunc = { (value) => selectedVideoFunc(value) }
          />
      </div>
    )
  }
}

export default NewEmployeeHireListFragment
