import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/NewEmployeeHirePresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import { CircularLoader, GenericInput, Line, Card } from '../../ub-components'
import NewEmployeeHireWelcomeModal from './modals/NewEmployeeHireWelcomeModal'

import NoDataListedComponent from '../common/components/NoDataListedComponent'

import './styles/neoStyle.css'

class NewEmployeeHireFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      neoData: [],
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
    } = this.state
    console.log(neoData)
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
              <h4>wadawdawd</h4>
            </div>
            <div>
              {
                neoData ?
                <div className = { 'neo-details-grid-video' }>
                {
                  neoData.map((resp, key) =>
                    <Card
                      key = { key }>
                      <h4>resp. name</h4>
                    </Card>
                  )
                }
                </div>
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
