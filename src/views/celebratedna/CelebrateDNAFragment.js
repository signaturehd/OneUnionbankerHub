import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/CelebrateDNAPresenter'


import { InputModal, Card, GenericButton,GenericInput } from '../../ub-components'
import './style/RewardStyle.css'
import staticImage   from '../../images/DNA.png'

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
            <div className = {'celebrate-container'}>

                  <img src={staticImage} className = {''}/>
                  <h1>Celebrating a DNA Moment</h1>
                  <h6> This award is given to individuals or teams who demonstrate behaviors aligned to the following: </h6>

                  <h6>Distinguishing beliefs/principle:</h6>

                  <GenericInput hint={'Search employees name'} maxLength={150} >

                  </GenericInput>
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
