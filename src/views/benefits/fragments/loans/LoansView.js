import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LoansView extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { title, author, description } = this.props

    return (
      <div className = {'container-option2'}  >
        <h1> Multi Purpose Loan </h1>
      </div>
    )
  }
}

LoansView.propTypes = {
  onClick : PropTypes.func,
  title : PropTypes.string,
  description : PropTypes.string,
  image : PropTypes.string,
  author : PropTypes.string,
  rating : PropTypes.number,
  id : PropTypes.string
}

LoansView.defaultProps = {
  title : 'title',
  description : 'description',
  author : 'author',
  image : 'image',
  rating : 0,
}


export default LoansView
