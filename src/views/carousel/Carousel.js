import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Modal } from '../../ub-components'

import './styles/carousel.css'

class Carousel extends Component {
  constructor (props) {
      super(props)
  }

  render () {
    const { onClose } = this.props

    return (
      <Modal
        onClose={ onClose }
        isDismisable={ true }
        className={ 'modal-height' }
        width={ 75 }
        boxShadow={ 'none' }
        backgroundColor={ 'transparent' }
        overflowY={ 'visible' }
        borderRadius ={ 'none' }
      >
      <div className={'slider'}>
        <input
          type={ 'radio' }
          name={ 'slider' }
          title={ 'slide1' }
          defaultChecked = { true }
          className={ 'slider__nav' }/>
        <input
          type={ 'radio' }
          name={ 'slider' }
          title={ 'slide2' }
          className={ 'slider__nav' }/>
        <input
          type={ 'radio' }
          name={ 'slider' }
          title={ 'slide3' }
          className={ 'slider__nav' }/>
        <input
          type={ 'radio' }
          name={ 'slider' }
          title={ 'slide4' }
          className={ 'slider__nav' }/>
        <input
          type={ 'radio' }
          name={ 'slider' }
          title={ 'slide5' }
          className={ 'slider__nav' }/>
        <div className={'slider__inner'}>
          <div className={'slider__contents'}>
            <img src = { require('../../images/carousel/1.jpg') }/>
          </div>
          <div className={'slider__contents'}>
            <img src = { require('../../images/carousel/2.jpg') }/>
          </div>
          <div className={'slider__contents'}>
            <img src = { require('../../images/carousel/3.jpg') }/>
          </div>
          <div className={'slider__contents'}>
            <img src = { require('../../images/carousel/4.jpg') }/>
          </div>
          <div className={'slider__contents'}>
            <img src = { require('../../images/carousel/5.jpg') }/>
          </div>
        </div>
      </div>
      </Modal>
    )
  }
}

Carousel.propTypes = {
  onClose : PropTypes.func
}

export default Carousel
