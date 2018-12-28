import React from 'react'
import PropTypes from 'prop-types'
import Presenter from '../../presenter/RewardsPresenter'
import BaseMVPView from '../../../common/base/BaseMVPView'
import ConnectView from '../../../../utils/ConnectView'

class StarAwardFragment extends BaseMVPView {
    constructor (props) {
    super(props)
    }
    componentDidMount () {
    this.props.setSelectedNavigation(9)
    }

    render(){
      return (
        
        <div>
        <div className={ 'header-margin-container' }>
          <i className = { 'back-arrow' } ></i>
        </div>
        <h2 className = { 'header-margin-default' }>Star Awards</h2>
        <br/>
        <br/>

        </div>
      )
    }

  }



export default ConnectView (StarAwardFragment,Presenter)
