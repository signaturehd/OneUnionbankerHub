import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.css'

class Option2 extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { title, author, description } = this.props

    return (
      <div className = {'container-option2'}  >
        <h1> Option 2 </h1>
      </div>
    )
  }
}

Option2.propTypes = {
  onClick : PropTypes.func,
  title : PropTypes.string,
  description : PropTypes.string,
  image : PropTypes.string,
  author : PropTypes.string,
  rating : PropTypes.number,
  id : PropTypes.string
}

Option2.defaultProps = {
  title : 'title',
  description : 'description',
  author : 'author',
  image : 'image',
  rating : 0,
}


export default Option2
