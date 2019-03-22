import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/NeoStreamingPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'
import { Route, Switch } from 'react-router-dom'

import { CircularLoader, GenericInput, Line, Card } from '../../ub-components'
import NewEmployeeHireSelectedComponent from './components/NewEmployeeHireSelectedComponent'
import NewEmployeeHireVideoAssessmentFragment from '../neoassessment/NewEmployeeHireVideoAssessmentFragment'
import NewEmployeeHireNextVideosComponent from './components/NewEmployeeHireNextVideosComponent'

import './styles/neoStyle.css'

class NeoStreamingFragment extends BaseMVPView {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
  }

  circularLoader (loader) {
    this.setState({ loader })
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

NeoStreamingFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(NeoStreamingFragment, Presenter)
