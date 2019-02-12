import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/NewEmployeeHirePresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import { CircularLoader, GenericInput, Line, Card } from '../../ub-components'
import NewEmployeeHireWelcomeModal from './modals/NewEmployeeHireWelcomeModal'

import NoDataListedComponent from '../common/components/NoDataListedComponent'
import NewEmployeeHireVideosComponent from './components/NewEmployeeHireVideosComponent'
import NewEmployeeHireHeaderComponent from './components/NewEmployeeHireHeaderComponent'

import './styles/neoStyle.css'

class NewEmployeeHireFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      neoData: [],
      neoCurrentUrl : ''
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
    } = this.state

    return (
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
        <div className = { 'neo-content' }>
          <div></div>
          <div className = { 'neo-details-grid-content' }>
            <div>
              <NewEmployeeHireHeaderComponent />
              <br/>
              <div className = { 'padding-10px' }>
                <video 
                  height = { '80%' }
                  width= { '100%' } 
                  controls>
                  <source src={ 'http://techslides.com/demos/sample-videos/small.mp4' } type="video/mp4" />
                  <source src={ 'http://techslides.com/demos/sample-videos/small.mp4' } type="video/ogg" />
                  No Selected Video
                </video>
              </div>
            </div>
            <div>
              {
                neoData ?
                <NewEmployeeHireVideosComponent 
                  neoData = { neoData }
                />
                :
                <NoDataListedComponent
                  text = { 'No Recommended Videos' }
                  />
              }
            </div>
          </div>
          <div></div>
        </div>
      </div>
    )
  }
}

NewEmployeeHireFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(NewEmployeeHireFragment, Presenter)
