import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../ub-components'

import CarouselDesktopModal from './modals/CarouselDesktopModal'
import CarouselMobileModal from './modals/CarouselMobileModal'

class Carousel extends Component {
  constructor (props) {
      super(props)
      this.state = {
        selectedSlide : 'first',
        desktopViewCarousel : false,
        mobileViewCarousel  : false,
      }
  }

  componentDidMount () {
  const mediaQueryDesktop = window.matchMedia('(min-width: 1360px)')
    if (mediaQueryDesktop.matches) {
      this.setState({ desktopViewCarousel : true })
    } else {
      this.setState({ mobileViewCarousel : true  })
    }
  }

  render () {
    const { onClose } = this.props
    const {
      desktopViewCarousel,
      mobileViewCarousel ,
      selectedSlide
    } = this.state

    return (
      <div>
        {
          desktopViewCarousel &&
          <CarouselDesktopModal
            selectedSlide = { selectedSlide }
            selectedSlideFunc = { (resp) => this.setState({ selectedSlide : resp }) }
            onClose = { () => this.setState({ desktopViewCarousel : false }) }
            />
        }
        {
          mobileViewCarousel &&
          <CarouselMobileModal
            selectedSlide = { selectedSlide }
            selectedSlideFunc = { (resp) => this.setState({ selectedSlide : resp }) }
            onClose = { () => this.setState({ mobileViewCarousel : false }) }
            />
        }
      </div>
    )
  }
}

Carousel.propTypes = {
  onClose : PropTypes.func
}

export default Carousel
