import React, { Component } from 'react'

class GiftDetailsAboutComponent extends Component {

  render () {
    const {
      writeup,
      name
    } = this.props

    return (
      <div id = { 'giftdetails-about-cover' }>
        <div id={ 'giftdetails-about' }>
          <div className={ 'giftdetails-about-container' }>
            <h2 className = { 'giftdetails-about-title' }>About { name }</h2>
            <div className = {  'giftdetails-about-write-up'}>
              <p>{ writeup }</p>
            </div>
            <div className={ 'giftdetails-other-info' }>
              <h3>{ name } Stores</h3>
              <ul>
                <li>Puregold Price Club</li>
                <li>Puregold Jr.</li>
                <li>Puregold Extra</li>
              </ul>
            </div>
          </div>
          <div className={ 'giftdetails-about-background' }></div>
        </div>
      </div>
    )
  }
}

export default GiftDetailsAboutComponent
