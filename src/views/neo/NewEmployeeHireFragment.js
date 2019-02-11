import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/NewEmployeeHirePresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import { CircularLoader, GenericInput, Line, Card } from '../../ub-components'
import NewEmployeeHireWelcomeModal from './modals/NewEmployeeHireWelcomeModal'

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
  }

  getNEOStatus (showNEOModal) {
    this.setState({ showNEOModal })
  }

  render () {
    const {
      neoData,
      showNEOModal,
    } = this.state

    return (
      <div>
        {
          showNEOModal &&
          <NewEmployeeHireWelcomeModal
            onStartOnboard = { () => {
              try {
                this.presenter.setNEOStatus(false)
                this.setState({ showNEOModal: false })
              } catch (e) {
                console.log(e)
              }
            } }
            />
        }
      </div>
    )
  }
}

NewEmployeeHireFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(NewEmployeeHireFragment, Presenter)
