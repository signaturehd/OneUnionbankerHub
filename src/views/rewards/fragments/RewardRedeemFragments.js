import React, { Component } from 'react'
import { Card, GenericButton } from '../../../ub-components'
import { Route } from 'react-router-dom'
import staticImage from '../../../images/ubp-bg.png'

class Redeem extends Component {

  render () {
    const {
      redeemData,
      history
    } = this.props

    return (
      <div>
        <h2 className={'header-margin-default text-align-left'}>Redeem</h2>
        {
          redeemData&&redeemData.map((value, idx) => (
            <Card
              onClick = { () => history.push(`/gifts/${value.id}`) }
               className="myrewards-container-component">
              <img className={'myrewards-card-image '} src={staticImage} />
              <div className={'myrewards-grid myrewards-card-image-text'}>
                  <span class="align-left" >{value.leftText}</span>
                  <span class="align-right" >{value.rightText}</span>
              </div>
            </Card>
          ))
        }
        <center>
        <GenericButton
          text={ 'View Page' }
          className={ 'profile-button-medium cursor-pointer global-button' }
          onClick={() => history.push('/gifts')}/>
        </center>
      </div>
    )
  }
}


export default Redeem
