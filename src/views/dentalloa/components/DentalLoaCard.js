import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'
import Button from './DentalLoaButton'
import TextBox from './DentalLoaTextBox'
import GenericTextBox from '../../../ub-components/TextBox/GenericTextBox'

class DentalLoaCard extends Component {
constructor (props) {
super(props)
this.state = {
  showConfirmation: false
}
this._showModal = this._showModal.bind(this)
}
_handleSubmit(e) {
  e.preventDefault()
  console.log("dawd")
}

_showModal(e) {
  console.log("clicked")
}
_showModal1(e) {
  console.log("clicked")
}
render () {
const { proceedModal , text1, text2, text3, onFocus, onBlur} = this.props

return (
  <div className = { 'dentalloa-card' } >
  <form>
    <div className = {'dentalloa-header'} >
      <h5 > LOA Details </h5>
        <div className = {'dentalloa-body'}>
        <i className = { 'dentalloa-icon text1-icon' }/>
         <GenericTextBox
           onFocus = { this._showModal }
           type = { 'button' }
           placeholder = { text1 }/>
        <i className = { 'dentalloa-icon text2-icon' }/>
         <GenericTextBox
           type = { 'button' }
           onFocus = { this._showModal }
           placeholder = { text2 }/>
        <i className = { 'dentalloa-icon text3-icon' }/>
        <input className = { 'dentalloa-datepicker' } type = {'date'} />
      </div>
    </div>
    <div className = {'dentalloa-footer-left'}>
        <input onClick = { this._showModal } type = {'button'} className = {'dentalloa-procedure' } value = { 'Procedures' } />
      <div className = { 'dentalloa-button-submit' }>
        <Button onClick = { this._handleSubmit }/>
      </div>
    </div>
    </form>
</div>
)
}
}
DentalLoaCard.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.func,
  confirm : PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}
DentalLoaCard.defaultProps = {
  confirm : 'continue',
  text1 : 'Recipient',
  text2 : 'Healthway Branch',
  text3 : 'Preferred Schedule'
}
export default DentalLoaCard
