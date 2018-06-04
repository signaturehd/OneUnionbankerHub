import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Rating from 'react-rating'
import { MdStarOutline, MdStar } from 'react-icons/lib/md'

import './styles/podcastModalStyle.css'

import { Modal, GenericButton, GenericTextBox } from '../../../ub-components/'

class PodcastAddReviewModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isDismisable : true,
      rating : 0,
      comments : '',
      addReview : null,
    }
  }
  addReview (id, rating, comments) {
    this.props.presenter.paddRating(id, rating, comments)
  }

  render () {
    const { onClose, submit, cancel, podcast } = this.props
    const { isDismisable, rating, comments } = this.state
    return (
        <Modal
          isDismisable = { isDismisable }
          onClose = { onClose } >
          <div>
            <center>
              <h2> Add Review </h2>
              <Rating
                emptySymbol = {<MdStarOutline style={{ fontSize: 40, color : '#c65e11' }} />}
                fullSymbol = {<MdStar style={{ fontSize: 40,  color : '#c65e11' }} />}
                onChange = { e => { e
                this.setState({ rating : e}) }}
                initialRating = {  rating ? rating : 0 }
                fractions = { 2 } />
              <GenericTextBox
                type = { 'text' }
                onChange = { e => this.setState({ comments : e.target.value }) }
                placeholder = { 'Enter Comment' }/>
              <br/>
                <GenericButton
                  type = { 'button' }
                  onClick = { () =>
                    this.addReview(podcast.id, rating, comments)}
                  text = { submit } />
              </center>
          </div>
        </Modal>
      )
  }
}
PodcastAddReviewModal.propTypes = {
  onClose : PropTypes.func,
  submit : PropTypes.string,
  cancel : PropTypes.string,
  podcast : PropTypes.object,
  addReview : PropTypes.func,
}
PodcastAddReviewModal.defaultProps = {
  submit : 'Submit',
  cancel : 'Cancel',
}
export default PodcastAddReviewModal
