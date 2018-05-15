import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GenericButton } from '../../../ub-components'
import { Modal } from '../../../ub-components/'
import ConnectView from '../../../utils/ConnectView'
import Presenter from '../presenter/LibraryPresenter'
import BaseMVPView from '../../common/base/BaseMVPView'
import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import Rating from 'react-rating'
import './styles.css'
import staticImage from '../../../images/education_bg.jpg'

class BookViewModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      rating : 0
    }
  }
 reserveBook (id,quantity) {
  this.props.presenter.reserveBook(id,quantity)
    }

 submitForm (id, quantity) {
    this.presenter.ReserveBook(id, quantity)
  }

  render () {
    const { onClose, details, rateBook } = this.props
    const { rating } = this.state
    const style = {
      background : `rgba(0,0,0,0.5) url(${staticImage}) no-repeat center center`,
      backgroundSize : '450px 200px',
      width: '-webkit-fill-available',
    }

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
        width = { 50 }
      >
        <div className = { 'library-modal-container' }>
          <div style = {style}>
          </div>
          <div className = { 'library-momdal-body' } >
            <div className = { 'library-modal-body-commands' } >
              <Rating
                emptySymbol = {<MdStarOutline style={{ fontSize: 30, color : '#c65e11' }} />}
                fullSymbol = {<MdStar style={{ fontSize: 30,  color : '#c65e11' }} />}
                onChange = { e => {
                  rateBook(details.id, e)
                  this.setState({ rating : e })
                }}
                fractions = { 2 }
                initialRating = { rating ? rating : details.rating }
              />
            </div>
            <div className = { 'library-modal-body-title' } >
              <p className = { 'library-modal-body-title-main' } >{details.title}</p>
              <p className = { 'library-modal-body-title-author' } >Author :{details.author}</p>
              <p className = { 'library-modal-body-title-author' } >Publisher : {details.publisher}</p>
            </div>
            <div className = { 'library-modal-body-description' } >
              <p>{details.description}</p>
            </div>

          </div>
          <div className = { 'library-momdal-footer' } >
            <div className = {'library-modal-footer-container'} >
              <GenericButton onClick = { () => this.submitForm(details.id, 1) } text = { 'Reserve' } />
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

BookViewModal.propTypes = {
  onClose: PropTypes.func,
  detail: PropTypes.object,
}

export default ConnectView (BookViewModal, Presenter)
