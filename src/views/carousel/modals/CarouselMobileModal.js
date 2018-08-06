import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton, CircularLoader } from '../../../ub-components/'

import '../styles/carouselMobile.css'

class CarouselMobileModal extends Component {
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
      <div className = { 'slider'}>
        <input
          type={ 'radio' }
          name={ 'slider' }
          title={ 'slide1' }
          checked={ selectedSlide === 'first' }
          defaultChecked = { true }
          className={ 'mobile_slider_nav' }/>
        <input
          type={ 'radio' }
          checked={ selectedSlide === 'second' }
          name={ 'slider' }
          title={ 'slide2' }
          className={ 'mobile_slider_nav' }/>
        <input
          type={ 'radio' }
          checked={ selectedSlide === 'third' }
          name={ 'slider' }
          title={ 'slide3' }
          className={ 'mobile_slider_nav' }/>
        <input
          checked={ selectedSlide === 'fourth' }
          type={ 'radio' }
          name={ 'slider' }
          title={ 'slide4' }
          className={ 'mobile_slider_nav' }/>
        <input
          checked={ selectedSlide === 'fifth' }
          type={ 'radio' }
          name={ 'slider' }
          title={ 'slide4' }
          className={ 'mobile_slider_nav' }/>
        <input
          checked={ selectedSlide === 'last' }
          type={ 'radio' }
          name={ 'slider' }
          title={ 'slide5' }
          className={ 'mobile_slider_nav' }/>
          <div className = { 'mobile_slider_inner'}>
            <div className = { 'mobile_slider_contents'}>
              <img src = { require('../../../images/carousel/mobile/1.png') } style = {{ height : '400px' }}/>
              <br/>
              <div className = { 'carousel-function'}>
                <div></div>
                <GenericButton text = { 'Next' }
                  className = { 'carousel-default-pagination-button' }
                  onClick = { () => selectedSlideFunc('second' ) }
                />
              </div>
            </div>
            <div className={ 'mobile_slider_contents' }>
              <img src = { require('../../../images/carousel/mobile/2.png') } style = {{ height : '400px' }}/>
              <br/>
              <div className = { 'carousel-function'}>
                <GenericButton text = { 'Previous' }
                  onClick = { () => selectedSlideFunc('first') }
                  className = { 'carousel-default-pagination-button' }
                />
                <GenericButton text = { 'Next' }
                  onClick = {  () => selectedSlideFunc('third') }
                  className = { 'carousel-default-pagination-button' }
                />
              </div>
            </div>
            <div className = { 'mobile_slider_contents'}>
              <img src = { require('../../../images/carousel/mobile/3.png') } style = {{ height : '400px' }}/>
              <br/>
              <div className = { 'carousel-function'}>
                <GenericButton text = { 'Previous' }
                  onClick = { () => selectedSlideFunc('second') }
                  className = { 'carousel-default-pagination-button' }
                />
                <GenericButton text = { 'Next' }
                  onClick = { () => selectedSlideFunc('fourth') }
                  className = { 'carousel-default-pagination-button' }
                />
              </div>
            </div>
            <div className = { 'mobile_slider_contents'}>
              <img src = { require('../../../images/carousel/mobile/4.png') } style = {{ height : '400px' }}/>
              <br/>
              <div className = { 'carousel-function'}>
                <GenericButton text = { 'Previous' }
                  onClick = { () => selectedSlideFunc('third') }
                  className = { 'carousel-default-pagination-button' }
                />
                <GenericButton text = { 'Next' }
                  onClick = { () => selectedSlideFunc('fourth') }
                  className = { 'carousel-default-pagination-button' }
                />
              </div>
            </div>
            <div className = { 'mobile_slider_contents'}>
              <img src = { require('../../../images/carousel/mobile/5.png') } style = {{ height : '400px' }}/>
              <br/>
              <div className = { 'carousel-function'}>
                <GenericButton text = { 'Previous' }
                  onClick = { () => selectedSlideFunc('fourth') }
                  className = { 'carousel-default-pagination-button' }
                />
                <GenericButton text = { 'Next' }
                  onClick = { () => selectedSlideFunc('last') }
                  className = { 'carousel-default-pagination-button' }
                />
              </div>
            </div>
            <div className = { 'mobile_slider_contents'}>
              <img src = { require('../../../images/carousel/mobile/6.png') } style = {{ height : '400px' }}/>
              <br/>
              <div className = { 'carousel-function'}>
                <GenericButton text = { 'Previous' }
                  onClick = { () => selectedSlideFunc('last') }
                  className = { 'carousel-default-pagination-button' }
                />
                <GenericButton text = { 'Finish' }
                  onClick = { () => onClose()}
                  className = { 'carousel-default-pagination-button' }
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

CarouselMobileModal.propTypes = {
  selectedSlideFunc: PropTypes.func,
  onClose : PropTypes.func
}

export default CarouselMobileModal
