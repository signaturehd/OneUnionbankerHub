import React, { Component } from 'react'

class GiftsBanner extends Component {

  render () {

    return (
      <div>
        <div
          className={ 'gifts-image gifts-banner' }
          text={ 'Gifts' } >
          <h1 className={ 'gifts-text' }>Send eGifts to Luzon</h1>
        </div>
      </div>
    )
  }
}


export default GiftsBanner
