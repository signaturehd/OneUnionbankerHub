import React, { Component } from 'react'
import BannerImage from '../../../images/rewards/giftsBanner.jpg'
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
            <div>
              <GenericButton
                text={ 'Checkout' }
                className={ 'gift-button' }
                onClick={ (e)=> showGiftCart(true) }
              />
            </div>
            <h1 className={ 'gifts-text' }>Send eGifts to Luzon</h1>
          </div>
        </div>
      </div>
    )
  }
}


export default GiftsBanner
