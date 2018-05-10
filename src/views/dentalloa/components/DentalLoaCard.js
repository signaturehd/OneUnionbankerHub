import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'
import Button from './DentalLoaButton'
import TextBox from './DentalLoaTextBox'
import DentalLoaBranchModal from '../modal/DentalLoaBranchModal'
import DentalLoaDependentModal from '../modal/DentalLoaDependentModal'
import DentalLoaProcedureModal from '../modal/DentalLoaProcedureModal'
import { GenericTextBox, Card, Datepicker } from '../../../ub-components'


class DentalLoaCard extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showConfirmation: false,
      showRecipientModal : false,
      showHealthwayBranchModal : false,
      showProcedureModal : false,
    }

    this.showModal = this.showModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
  }

  showModal (e) {
    if (e === 'recipient') {
      this.setState({ showRecipientModal : true })
    } else if (e === 'branch') {
      this.setState({ showHealthwayBranchModal : true })
    } else if (e === 'procedure') {
      this.setState({ showProcedureModal : true })
    }
  }

  render () {
    const { proceedModal , text1, text2, text3, onFocus, details } = this.props
    console.log(details)
    const { showRecipientModal, showHealthwayBranchModal, showProcedureModal } = this.state
    return (
      <Card className={ 'dentalloa-card' }>
      {
        showRecipientModal &&
        <DentalLoaBranchModal
          showRecipientModal = { showRecipientModal }
          show = { this.state.showRecipientModal}
          details = { details.dependents }
          onClose = { () => this.setState({ showRecipientModal : false }) }>
        </DentalLoaBranchModal>
      }
      {
        showHealthwayBranchModal &&
        <DentalLoaBranchModal
          showHealthwayBranchModal = { showHealthwayBranchModal }
          show = { this.state.showHealthwayBranchModal}
          details = { details.branches }
          onClose = { () => this.setState({ showHealthwayBranchModal : false }) }>
        </DentalLoaBranchModal>
      }
      {
        showProcedureModal &&
        <DentalLoaProcedureModal
          showProcedureModal = { showProcedureModal }
          show = { this.state.showProcedureModal}
          details = { details.procedures }
          onClose = { () => this.setState({ showProcedureModal : false }) }>
        </DentalLoaProcedureModal>
      }
      <form onSubmit = { this.handleSubmit }>
        <div className = {'dentalloa-header'} >
          <h5 > LOA Details </h5>
            <div className = {'dentalloa-body'}>
            <i className = { 'dentalloa-icon text1-icon' }/>
             <GenericTextBox
               onClick = { () => this.showModal('recipient') }
               type = { 'button' }
               placeholder = { text1 }/>
            <i className = { 'dentalloa-icon text2-icon' }/>
             <GenericTextBox
               type = { 'button' }
               onClick = { () => this.showModal('branch') }
               placeholder = { text2 }/>
            <i className = { 'dentalloa-icon text3-icon' }/>
            <Datepicker
              label = { 'Expected date' }
            />
          </div>
        </div>
        <div className = {'dentalloa-footer-left'}>
          <input onClick = { () => this.showModal('procedure') }
            type = {'button'}
            className = {'dentalloa-procedure' }
            value = { 'Procedures' } />
          <div className = { 'dentalloa-button-submit' }>
            <Button/>
          </div>
        </div>
      </form>
    </Card>
    )
  }
}

DentalLoaCard.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.object,
  confirm : PropTypes.string,
  text1   : PropTypes.string,
  text2   : PropTypes.string,
  text3   : PropTypes.string,
  onFocus : PropTypes.func,
  onClick : PropTypes.func,
}

DentalLoaCard.defaultProps = {
  confirm : 'continue',
  text1   : 'Recipient',
  text2   : 'Healthway Branch',
  text3   : 'Preferred Schedule'
}

export default DentalLoaCard
