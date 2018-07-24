import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../ub-components'

import './styles/carousel.css'

class Carousel extends Component {
  constructor (props) {
      super(props)
      this.state = {
        selectedSlide : 'first'
      }
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
          checked={ this.state.selectedSlide === 'first' }
          defaultChecked = { true }
          className={ 'slider__nav' }/>
        <input
          type={ 'radio' }
          checked={ this.state.selectedSlide === 'second' }
          name={ 'slider' }
          title={ 'slide2' }
          className={ 'slider__nav' }/>
        <input
          type={ 'radio' }
          checked={ this.state.selectedSlide === 'third' }
          name={ 'slider' }
          title={ 'slide3' }
          className={ 'slider__nav' }/>
        <input
          checked={ this.state.selectedSlide === 'fourth' }
          type={ 'radio' }
          name={ 'slider' }
          title={ 'slide4' }
          className={ 'slider__nav' }/>
        <input
          checked={ this.state.selectedSlide === 'last' }
          type={ 'radio' }
          name={ 'slider' }
          title={ 'slide5' }
          className={ 'slider__nav' }/>
        <div className={'slider__inner'}>
          <div className={'slider__contents'}>
            <img src = { require('../../images/carousel/Slide1.PNG') } style = {{height : '450px'}}/>
            <br/>
            <div className={'carousel-function'}>
              <div></div>
              <GenericButton text = { 'Next' }
                onClick = { () => this.setState({ selectedSlide : 'second' })}
              />
            </div>
          </div>
          <div className={'slider__contents'}>
            <img src = { require('../../images/carousel/Slide2.PNG') } style = {{height : '450px'}}/>
            <br/>
            <div className={'carousel-function'}>
              <GenericButton text = { 'Previous' }
                onClick = { () => this.setState({ selectedSlide : 'first' })}
              />
              <GenericButton text = { 'Next' }
                onClick = { () => this.setState({ selectedSlide : 'third' })}
              />
            </div>
          </div>
          <div className={'slider__contents'}>
            <img src = { require('../../images/carousel/Slide3.PNG') } style = {{height : '450px'}}/>
            <br/>
            <div className={'carousel-function'}>
              <GenericButton text = { 'Previous' }
                onClick = { () => this.setState({ selectedSlide : 'second' })}
              />
              <GenericButton text = { 'Next' }
                onClick = { () => this.setState({ selectedSlide : 'fourth' })}
              />
            </div>
          </div>
          <div className={'slider__contents'}>
            <img src = { require('../../images/carousel/Slide4.PNG') } style = {{height : '450px'}}/>
            <br/>
            <div className={'carousel-function'}>
              <GenericButton text = { 'Previous' }
                onClick = { () => this.setState({ selectedSlide : 'third' })}
              />
              <GenericButton text = { 'Next' }
                onClick = { () => this.setState({ selectedSlide : 'last' })}
              />
            </div>
          </div>
          <div className={'slider__contents'}>
            <img src = { require('../../images/carousel/Slide5.PNG') } style = {{height : '450px'}}/>
            <br/>
            <div className={'carousel-function'}>
              <GenericButton text = { 'Previous' }
                onClick = { () => this.setState({ selectedSlide : 'fourth' })}
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

Carousel.propTypes = {
  onClose : PropTypes.func
}

export default Carousel
