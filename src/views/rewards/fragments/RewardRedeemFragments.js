import React, { Component } from 'react'
import { Card } from '../../../ub-components'

import staticImage from '../../../images/ubp-bg.png'


class Redeem extends Component {

  render () {
    const {
      redeemData,
    } = this.props

    return (
      <div>
        <h2 className={'header-margin-default text-align-left'}>Redeem</h2>
        {
          redeemData.map((value, idx) => (
            <Card
               className="myrewards-container-component">
              <img className={'myrewards-card-image '} src={staticImage} />
              <div className={'myrewards-grid myrewards-card-image-text'}>
                  <span class="align-left" >{value.leftText}</span>
                  <span class="align-right" >{value.rightText}</span>
              </div>
            </Card>
          ))
        }
      </div>
    )
  }
}


export default Redeem
