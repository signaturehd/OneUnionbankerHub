import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/NewEmployeeHirePresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import { CircularLoader, GenericInput, Line, Card } from '../../ub-components'
import NewEmployeeHireWelcomeModal from './modals/NewEmployeeHireWelcomeModal'

import NewEmployeeHireListFragment from './fragments/NewEmployeeHireListFragment'
import NewEmployeeHireMainFragment from './fragments/NewEmployeeHireMainFragment'

import './styles/neoStyle.css'

class NewEmployeeHireFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      neoData: [],
      neoCurrentUrl : '',
      selectedVideo : true
    }
  }

  componentDidMount () {
    this.presenter.getNEOStatus()
    this.presenter.getNEOData()
  }

  getNEOStatus (showNEOModal) {
    this.setState({ showNEOModal })
  }

  getNEOData (neoData) {
    this.setState({ neoData })
  }

  render () {
    const {
      neoData,
      showNEOModal,
      neoCurrentUrl,
      selectedVideo,
    } = this.state

    return (
      <div className = { 'neo-content-grid' }>
        <div></div>
        <div>
          {
           !showNEOModal &&
            <NewEmployeeHireWelcomeModal
              onStartOnboard = { () => {
                try {
                  this.presenter.setNEOStatus()
                  this.setState({ showNEOModal: false })
                } catch (e) {
                  console.log(e)
                }
              } }
            />
          }
          {
            selectedVideo ?

            <NewEmployeeHireListFragment
              selectedVideoFunc = { (value) => this.setState({ selectedVideo : false }) }
              neoData = { neoData }
              selectedVideo = { selectedVideo }
              /> :

            <NewEmployeeHireMainFragment
              selectedVideo = { selectedVideo }
              neoData = { neoData }
              />
          }
        </div>
        <div></div>
      </div>
    )
  }
}

NewEmployeeHireFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(NewEmployeeHireFragment, Presenter)
