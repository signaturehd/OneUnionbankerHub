import React, { Component } from 'react'
import BannerImage from '../../../images/rewards/giftsBanner.jpg'
class GiftsBanner extends Component {

  render () {

    return (
      <div>
        <div
          style = {{
            backgroundImage: `url(${ BannerImage })`,
          }}
          className={ 'gifts-image gifts-banner' }
          text={ 'Gifts' } >
          <div id = { 'gifts-overlay' }>
            <h1 className={ 'gifts-text' }>Send eGifts to Luzon</h1>
          </div>
        </div>
      </div>
    )
  }
}


export default GiftsBanner
