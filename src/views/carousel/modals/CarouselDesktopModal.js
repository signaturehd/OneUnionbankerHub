import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton, CircularLoader } from '../../../ub-components/'

import '../styles/carouselDesktop.css'

class CarouselDesktopModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      onClose,
      selectedSlide,
      selectedSlideFunc
    } = this.props

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
          checked={ selectedSlide === 'first' }
          defaultChecked = { true }
          className={ 'slider__nav' }/>
        <input
          type={ 'radio' }
          checked={ selectedSlide === 'second' }
          name={ 'slider' }
          title={ 'slide2' }
          className={ 'slider__nav' }/>
        <input
          type={ 'radio' }
          checked={ selectedSlide === 'third' }
          name={ 'slider' }
          title={ 'slide3' }
          className={ 'slider__nav' }/>
        <input
          checked={ selectedSlide === 'fourth' }
          type={ 'radio' }
          name={ 'slider' }
          title={ 'slide4' }
          className={ 'slider__nav' }/>
        <input
          checked={ selectedSlide === 'last' }
          type={ 'radio' }
          name={ 'slider' }
          title={ 'slide5' }
          className={ 'slider__nav' }/>
          <div className={'slider__inner'}>
            <div className={'slider__contents'}>
              <img src = { require('../../../images/carousel/Slide1.PNG') } style = {{height : '450px'}}/>
              <br/>
              <div className={'carousel-function'}>
                <div></div>
                <GenericButton text = { 'Next' }
                  onClick = { () => selectedSlideFunc('second' ) }
                />
              </div>
            </div>
            <div className={'slider__contents'}>
              <img src = { require('../../../images/carousel/Slide2.PNG') } style = {{height : '450px'}}/>
              <br/>
              <div className={'carousel-function'}>
                <GenericButton text = { 'Previous' }
                  onClick = { () => selectedSlideFunc('first') }
                />
                <GenericButton text = { 'Next' }
                  onClick = {  () => selectedSlideFunc('third') }
                />
              </div>
            </div>
            <div className={'slider__contents'}>
              <img src = { require('../../../images/carousel/Slide3.PNG') } style = {{height : '450px'}}/>
              <br/>
              <div className={'carousel-function'}>
                <GenericButton text = { 'Previous' }
                  onClick = { () => selectedSlideFunc('second') }
                />
                <GenericButton text = { 'Next' }
                  onClick = { () => selectedSlideFunc('fourth') }
                />
              </div>
            </div>
            <div className={'slider__contents'}>
              <img src = { require('../../../images/carousel/Slide4.PNG') } style = {{ height : '450px' }}/>
              <br/>
              <div className={'carousel-function'}>
                <GenericButton text = { 'Previous' }
                  onClick = { () => selectedSlideFunc('third') }
                />
                <GenericButton text = { 'Next' }
                  onClick = { () => selectedSlideFunc('last') }
                />
              </div>
            </div>
            <div className={'slider__contents'}>
              <img src = { require('../../../images/carousel/Slide5.PNG') } style = {{ height : '450px' }}/>
              <br/>
              <div className={'carousel-function'}>
                <GenericButton text = { 'Previous' }
                  onClick = { () => selectedSlideFunc('fourth') }
                />
                <GenericButton text = { 'Finish' }
                  onClick = { () => onClose()}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

CarouselDesktopModal.propTypes = {
  selectedSlideFunc: PropTypes.func,
  onClose : PropTypes.func
}

export default CarouselDesktopModal
