import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/StarAwardPresenter'


import { InputModal, Card, GenericButton } from '../../ub-components'
// import './styles/myrewards.css'


class StarAwardFragment extends BaseMVPView {
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
                  <h1>My Star Award</h1>
            </div>
          )
      }
    }

StarAwardFragment.propTypes = {
	setSelectedNavigation: PropTypes.func,
	profileHasCOC: PropTypes.boolean,
  }

export default ConnectView (StarAwardFragment, Presenter)
