import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components/'

import './styles/styles.css'

class NewsModalComponent extends Component {
  constructor (props) {
    super(props)
  }

  openLink () {
    const { details } = this.props
    window.open(details.linkUrl)
  }

  render () {
    const { onClose, title, image, description, link, details } = this.props

    const style = {
        newsBackground:
        {
          background : `url(${details.imageUrl}) rgba(0,0,0,0.7)`,
          backgroundRepeat : 'no-repeat',
          height : '250px',
          width: 'auto',
          backgroundSize : 'cover',
          color : 'white',
          fontWeight : 'bold'
        }
    }

    return (
      <Modal
        onClose = { onClose }
        isDismisable = { true }
        width = { 50 }
      >
        <div>
          <div style = { style.newsBackground }>
          </div>

          <div className = {'news-modal-body'}>
            <div className = {'news-modal-body-title'}>
              <span> { details.title } </span>
            </div>
            <div className = {'news-modal-body-description'}>
              <span> { details.details } </span>
            </div>
          </div>

          <div className = {'news-modal-footer'}>
            <small className = {'news-modal-footer-link'} onClick = { () => this.openLink() } >See More</small>
          </div>
        </div>
      </Modal>
    )
  }
}
// TODO
/* Fetch datas on Click display details */
/* Close modal set elements to null */

NewsModalComponent.propTypes = {
  onClose : PropTypes.func,
}

NewsModalComponent.defaultProps = {

}

export default NewsModalComponent
