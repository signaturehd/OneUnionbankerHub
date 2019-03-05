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
      selectedVideo : true,
      loader: false,
    }
  }

  componentDidMount () {
    this.presenter.getNEOStatus()
    this.presenter.getNEOData()
  }

  circularLoader (loader) {
    this.setState({ loader })
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
      loader,
      selectedVideo,
    } = this.state

    document.onkeydown = function(e) {
      if(event.keyCode == 123) {
        return false;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
        return false;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
        return false;
      }
      if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
        return false;
      }
    }

    return (
      <div oncontextmenu={ 'return false;' }>
        {
          loader ?
          <CircularLoader
            show = { loader }
            validateLoading = { true }
          />
        :
        <div className = { 'neo-content-grid' }>
          <div></div>
          <div>
            {
             !showNEOModal ?
              <NewEmployeeHireWelcomeModal
                onStartOnboard = { () => {
                  this.presenter.setNEOStatus()
                  this.setState({ showNEOModal: false })
                } }
              />
            :
            <div>
            {
              selectedVideo ?

              <NewEmployeeHireListFragment
                selectedVideoFunc = { (value) => this.setState({ selectedVideo : false }) }
                neoData = { neoData }
                selectedVideo = { selectedVideo }
                />
              :
              <NewEmployeeHireMainFragment
                selectedVideo = { selectedVideo }
                neoData = { neoData }
                />
            }
            </div>
            }
          </div>
          <div></div>
        </div>
        }
      </div>
    )
  }
}

NewEmployeeHireFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(NewEmployeeHireFragment, Presenter)
