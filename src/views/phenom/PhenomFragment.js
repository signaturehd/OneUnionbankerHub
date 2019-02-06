import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PhenomPresenter'

/*Phenom Component*/
import { PhenomCardComponent } from '../../components/'
import PhenomCardDetailsComponent from './components/PhenomCardDetailsComponent'
import NoDataListedComponent from '../common/components/NoDataListedComponent'

import {
  CircularLoader
} from '../../ub-components/'

import * as PhenomFunction from './functions/PhenomFunction'

import './styles/phenomStyle.css'

class PhenomFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      phenomDataList : [],
      phenomDetails : [],
      selectedDetails : [],
      activeSelect : '',
      loader : false,
      showPhenomCardDetails : false
    }
  }

  componentDidMount () {
    if(!this.props.homePreview) {
      this.props.setSelectedNavigation(10)
    }
    this.presenter.getPhenomDiscounts()
  }

  showCircularLoader () {
    this.setState({ loader : true })
  }

  hideCircularLoader () {
    this.setState({ loader : false })
  }

  getPhenomDetails (test) {
  }

  showPhenomDiscountList (phenomDataList) {
    this.setState({ phenomDataList })
  }


  showPhenomDetails (phenomDetails, showPhenomCardDetails) {
    this.setState({ phenomDetails, showPhenomCardDetails })
  }

  showDataUponClickingLike () {

  }

  showPhenomListLength (phenomLength) {
    this.setState({ phenomLength })
  }

  navigate () {
    this.props.history.push('/phenom')
  }

  render () {

    const {
      phenomDataList,
      index,
      activeSelect,
      phenomDetails,
      loader,
      selectedDetails,
      showPhenomCardDetails,
      phenomLength
    } = this.state

    const {
      setSelectedNavigation,
      selected,
      homePreview,
      history,
      homePreviewFunc
    } = this.props

    return (
      <div className = { 'phenom-fragment' }>
        {
          loader ?
         <center className = { 'circular-loader-center' }>
           <CircularLoader show = { loader }/>
         </center>
         :
         <div>
         {
           showPhenomCardDetails ?
            <PhenomCardDetailsComponent
              selectedDetails = { selectedDetails }
              rewardImage = { phenomDetails.rewardImage }
              rewardLogo = { phenomDetails.rewardLogo }
              contactInfo = { phenomDetails.contactInfo }
              highlights = { phenomDetails.highLights }
              rewardName = { phenomDetails.rewardName }
              rewardSubHeader = { phenomDetails.rewardSubHeader }
              terms = { phenomDetails.termsAndConditions }
              onNavigate = { () =>
                this.setState({ showPhenomCardDetails : false })
              }
            />
            :
            <div className = { 'phenom-container-component' }>
              <div className =  { 'phenom-grid-header' }>
                <div>
                  <h2 className={ 'phenoms-header header-margin-default text-align-left unionbank-color' }> Phenom Prime </h2>
                  <h2>We &#39;ve got these special deals, Just for U!</h2>
                  {
                    phenomDataList.length === 0 &&
                    <NoDataListedComponent
                      text={ 'No Phenom Listed' }
                    />
                  }
                </div>
                <div></div>
                <div></div>
              </div>
              {
                homePreview ?
                <div className = { 'phenom-container-grid' }>
                  {
                    phenomDataList && phenomDataList.slice(0, 3).map((resp, key) =>
                    <PhenomCardComponent
                      key = { key }
                      selectedDetails = { resp }
                      vendor = { resp.vendor }
                      id = { resp.id }
                      rewardImage = { resp.rewardImageBlob }
                      startDate = { resp.startDate }
                      endDate = { resp.endDate }
                      isHeart = { resp.isHeart }
                      onClick = { (selectedDetails) => {
                          this.presenter.getPhenomSelectedDiscounts(resp.id)
                          this.setState({ showPhenomCardDetails : true })
                        }
                      }
                      onChangeHeart = { (id, isHeart) => this.presenter.addPhenomIsHeart(id, isHeart) }
                      />
                    )
                  }
                  <br/>
                  <button
                    type = { 'button' }
                    className = { `viewmore tooltip` }
                    onClick = { () => {
                          history.push('/phenom')
                          setSelectedNavigation(10)
                          homePreviewFunc(false)
                        }
                      }>
                    <img src={ require('../../images/icons/horizontal.png') } />
                    <span className={ 'tooltiptext' }>View More</span>
                  </button>
                </div>
                :
                <div className = { 'phenom-container-grid' }>
                {
                  phenomDataList.length !== 0 &&
                  <div>
                    {
                      phenomDataList.map((resp, key) =>
                      <PhenomCardComponent
                        key = { key }
                        selectedDetails = { resp }
                        vendor = { resp.vendor }
                        id = { resp.id }
                        rewardImage = { resp.rewardImageBlob }
                        startDate = { resp.startDate }
                        endDate = { resp.endDate }
                        isHeart = { resp.isHeart }
                        onClick = { (selectedDetails) => {
                            this.presenter.getPhenomSelectedDiscounts(resp.id)
                            this.setState({ showPhenomCardDetails : true })
                          }
                        }
                        onChangeHeart = { (id, isHeart) => this.presenter.addPhenomIsHeart(id, isHeart) }
                        />
                      )
                    }
                  </div>
                }
                </div>
              }
            </div>
          }
         </div>
        }
      </div>
    )
  }
}

PhenomFragment.propTypes = {
  setSelectedNavigation : PropTypes.func,
  selected : PropTypes.number,
}

PhenomFragment.defaultProps = {
  selected : -1
}

export default ConnectView (PhenomFragment, Presenter)
