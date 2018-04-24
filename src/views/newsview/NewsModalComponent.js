<<<<<<< HEAD
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../ub-components/'



class NewsModalComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { onClose, title, image, description, link, details } = this.props
    return (
      <Modal
        onClose = { onClose }
      >
      </Modal>
    )
  }
}
// TODO
/* Fetch datas on Click display details */
/* Close modal set elements to null */

NewsModalComponent.propTypes = {

}

NewsModalComponent.defaultProps = {

}

export default NewsModalComponent
=======
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../ub-components/'



class NewsModalComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { onClose, title, image, description, link, details } = this.props
    return (
      <Modal
        onClose = { onClose }
      >
      </Modal>
    )
  }
}
// TODO
/* Fetch datas on Click display details */
/* Close modal set elements to null */

NewsModalComponent.propTypes = {

}

NewsModalComponent.defaultProps = {

}

export default NewsModalComponent
>>>>>>> 7cf23bbb6f50fd66d0c4f86515a65c2bf03bddc0
