import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TextArea.css'
class TextArea extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'Please Write your feedback to us.'
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }


  render () {
    return (
      <div className="app">
        <form>
            <textarea value={this.state.value} onChange={this.handleChange} cols={40} rows={10} />
        </form>
      </div>
    )
  }
}

export default TextArea