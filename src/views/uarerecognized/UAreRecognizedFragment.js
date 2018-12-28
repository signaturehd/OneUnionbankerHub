import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/UAreRecognizedPresenter'


import { InputModal, Card, GenericButton } from '../../ub-components'
// import './styles/myrewards.css'


class UAreRecognizedFragment extends BaseMVPView {
      constructor (props) {
        super(props)
      }
      componentDidMount () {
        this.props.setSelectedNavigation(9)
      }


      render () {
        const { history } = this.props
          const { accountNumber, showAccountNumberModal } = this.state

          return(
            <div>
                  <h1>U Are Recognized</h1>
            </div>
          )
      }
    }

UAreRecognizedFragment.propTypes = {
	setSelectedNavigation: PropTypes.func,
	profileHasCOC: PropTypes.boolean,
  }

export default ConnectView (UAreRecognizedFragment, Presenter)
