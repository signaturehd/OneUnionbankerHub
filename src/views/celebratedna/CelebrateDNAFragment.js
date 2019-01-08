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
        this.state = {
          rewardDNA: []
        }
      }

      componentDidMount () {
        this.props.setSelectedNavigation(9)
        this.presenter.getRewardDNA(2)
      }

       setRewardDNA (rewardDNA) {
        this.setState({ rewardDNA })
      }


      // getRewardsDNAMoment (rewardDNA) {
      //   this.setState({ rewardDNA })
      //   this.presenter.getRewardsDNA()
      // }


      render () {
        const { history, onClick } = this.props
          const { accountNumber, showAccountNumberModal, rewardDNA } = this.state
          console.log(rewardDNA)
          return (
            <div>
                  <h1>Celebrate DNA</h1>
                  <p>{ rewardDNA.award }</p>
                  <p>{ rewardDNA.points }</p>
                  <GenericButton text={'Button'} onclick={''}>
                  </GenericButton>
            </div>
          )
        }
    }

CelebrateDNAFragment.propTypes = {
	setSelectedNavigation: PropTypes.func,
  onClick: PropTypes.func,
  history: PropTypes.object,
	profileHasCOC: PropTypes.bool,
}

export default ConnectView (CelebrateDNAFragment, Presenter)
