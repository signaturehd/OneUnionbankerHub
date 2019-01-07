import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/CelebrateDNAPresenter'


import { InputModal, Card, GenericButton } from '../../ub-components'
// import './styles/myrewards.css'


class CelebrateDNAFragment extends BaseMVPView {
      constructor (props) {
        super(props)
      }

      componentDidMount () {
        this.props.setSelectedNavigation(9)
        this.presenter.getRewardDNA(5)

      }

      setRewardDNA(rewardDNA){
        this.setState({ rewardDNA })
      }



      render () {
        const { history } = this.props
          const { accountNumber, showAccountNumberModal } = this.state

          return(

            <div>
                  <h1>Celebrate DNA</h1>

            </div>
          )
      }
    }

CelebrateDNAFragment.propTypes = {
	setSelectedNavigation: PropTypes.func,
	profileHasCOC: PropTypes.boolean,
  }

export default ConnectView (CelebrateDNAFragment, Presenter)
