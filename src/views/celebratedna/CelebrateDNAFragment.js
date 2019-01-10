import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/CelebrateDNAPresenter'


import { InputModal, Card, GenericButton,GenericInput,GenericTextBox } from '../../ub-components'
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
clicked(){
  alert('wewewe');
}

      render () {
        const { history, onClick } = this.props

          const { accountNumber, showAccountNumberModal, rewardDNA } = this.state
          console.log(rewardDNA)
          return (
            <div className = {'celebrate-container'}>

                  <img src={staticImage} className = {''}/>

                  <h1>Celebrating a DNA Moment</h1>


                  <h6 className={ 'celebrate-container-space' }> This award is given to individuals or teams who demonstrate behaviors aligned to the following: </h6>



                  <h3 className={ 'celebrate-container-space' }>Distinguishing beliefs/principle:</h3>
                  <p>Forwird-thinking, Agile, Open, and Innovative</p>

                  <h3>Values : </h3>
                  <p>Integrity, Magis,Ubuntu</p>

                  <GenericInput hint={'Search employees name'} imageProps={'wewewew'} onChange={this.clicked()} >

                  </GenericInput>

                  <h2 className={'celebrate-container-space'}>Who will I award this to?</h2>

                  <div className={ 'celebrate-container-space' }>

                      <GenericInput  type={ 'textarea' } resize={150}>

                      </GenericInput>

                  </div>

                    <div className={'celebrate-aligned-center'}>

                      <GenericButton text={ 'Submit' }  className={ 'celebrate-button-center ' } >

                      </GenericButton>

                    </div>

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
