import { Progress } from 'react-sweet-progress'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NoDataListedComponent from '../../common/components/NoDataListedComponent'
import NewEmployeeHireSelectedComponent from '../components/NewEmployeeHireSelectedComponent'
import NewEmployeeHireHeaderComponent from '../components/NewEmployeeHireHeaderComponent'
import NewEmployeeHireNextVideosComponent  from '../components/NewEmployeeHireNextVideosComponent'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
}  from '../../../ub-components/'

class NewEmployeeHireMainFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      neoData,
      selectedVideo
    } = this.props

    return (
      <div className = { 'neo-content' }>
        <div></div>
        <div className = { 'neo-details-grid-content' }>
          <div className = { 'padding-10px' }>
            <NewEmployeeHireSelectedComponent/>
          </div>
          {
            neoData ?
            <div>
              <NewEmployeeHireNextVideosComponent
                selectedVideo = { selectedVideo }
                neoData = { neoData }
              />
            </div>
            :
            <NoDataListedComponent
              text = { 'No Recommended Videos' }
              />
          }
        </div>
        <div></div>
      </div>
    )
  }
}

export default NewEmployeeHireMainFragment
