import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Accordion extends Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    this.handleClick()
  }

  handleClick () {
    const acc = this.acc.children
    for (let i = 0; i < acc.length; i++) {
      const a = acc[i]
      a.onclick = () => a.classList.toggle('active')
    }
  }

  render () {
    return (
      <div
        ref={a => this.acc = a}
        onClick={this.handleClick}>
        {this.props.children}
      </div>
    )
  }
}
export default Accordion
