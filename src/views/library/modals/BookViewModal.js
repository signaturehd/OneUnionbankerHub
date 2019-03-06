import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GenericButton, Modal } from '../../../ub-components/'
import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import Rating from 'react-rating'
import './styles/bookModal.css'
import staticImage from '../../../images/icons/book_placeholder.png'
import moment from 'moment'

class BookViewModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating : 0,
      comment : null,
      showCommentModal: false
    }
  }

  render () {
    const {
      onClose,
      details,
      rateBook,
      reserveBook,
      booksCommentList
    } = this.props

    const {
      rating,
      comment,
      showCommentModal
    } = this.state

    const style = {
      background : `rgba(0,0,0,0.5) url(${details.imageUrl ? details.imageUrl : staticImage}) no-repeat center center`,
      backgroundSize : '200px 200px',
      width: '-webkit-fill-available',
    }

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
        width = { 50 }
      >
      {
        showCommentModal &&
        <Modal
          onClose = { onClose }
          isDismisable = { true }>
          <textarea
            className={ 'default-feedback-textarea font-size-14px' }
            placeholder={ `We'd like to know what's the experience was like` }
            onChange={ e => this.setState({ comment : e.target.value }) }/>
          <br/>
        <center>
          <GenericButton
            text = { 'Submit' }
            className = { 'profile-button-medium cursor-pointer global-button' }
            onClick = { (e) => {
              rateBook(details.id, rating, comment)
              }
            }
            />
        </center>
        </Modal>
      }
        <div className = { 'library-modal-container' }>
          <div style = {style}>
          </div>
          <div className = { 'library-momdal-body' } >
            <div className = { 'library-modal-body-commands' } >
              <Rating
                emptySymbol = {<MdStarOutline style={{ fontSize: 30, color : '#c65e11' }} />}
                fullSymbol = {<MdStar style={{ fontSize: 30,  color : '#c65e11' }} />}
                onChange = { e => {
                  // rateBook(details.id, e)
                  e <= 3 ?
                  this.setState({ rating : e , showCommentModal : true })
                  :
                  rateBook(details.id, rating, comment)
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
              <p>Description: {details.description}</p>
            </div>
            <br/>
            <div>
              <h2 className = { 'font-weight-bold' }></h2>
                {
                  booksCommentList &&
                  booksCommentList.map((resp, key) =>
                    <div>
                      <h2>Name: { resp.name }</h2>
                      <div className = { 'grid-global-rows' }>
                        <h2>Date: { moment(resp.date).format('dddd, MMMM DD, YYYY, h:MM:ss A') }</h2>
                        <div>
                          <h2>Comment: { resp.comment }</h2>
                          <br/>
                        </div>
                      </div>
                    </div>
                  )
                }
            </div>
          </div>
          <div className = { 'library-momdal-footer' } >
            <div className = {'library-modal-footer-container'} >
              <center>
                <GenericButton
                  className = { 'profile-button-medium cursor-pointer global-button' }
                  onClick = { () => reserveBook(details.id, 1) } text = { 'Borrow' } />
              </center>
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

export default BookViewModal
