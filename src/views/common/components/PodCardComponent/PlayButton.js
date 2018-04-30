import React , { Component } from 'react'
import './styles.css'


export default class GenericButton extends Component {
  render () {
    const { text, onClick, type } = this.props

    return (
      <button
        className = { 'play-button' }
        onClick = { onClick }
        type = { type }
      >{ text }</button>
    )
  }
}
