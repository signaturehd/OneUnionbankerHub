import React, { Component } from 'react'
import BannerImage from '../../../images/rewards/giftaway-banner.png'
import { GenericButton } from '../../../ub-components/'

class GiftsBanner extends Component {

  render () {
    const {
      showGiftCart,
    } = this.props

    return (
      <div>
        <div
          style = {{
            backgroundImage: `url(${ BannerImage })`,
          }}
          className={ 'gifts-image gifts-banner' }
          text={ 'Gifts' } >
          <div id = { 'gifts-overlay' }>
            <h1 className={ 'gifts-text' }>Get discounts from our retail partners</h1>
          </div>
        </div>
      </div>
    )
  }
}


export default GiftsBanner
