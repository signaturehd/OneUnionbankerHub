import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  Modal,
  GenericButton,
  CircularLoader,
  GenericInput,
  Card
} from '../../../ub-components/'

import Presenter from './presenter/CharacterReferencePresenter'

import { Progress } from 'react-sweet-progress'

import 'react-sweet-progress/lib/style.css'

import { NotifyActions } from '../../../actions'
import store from '../../../store'

import './styles/characterReferenceStyle.css'

import CharacterReferenceAddFormModal from './modals/CharacterReferenceAddFormModal'
import MullptipleCardComponent from './components/CharacterReferenceMultipleCardComponent'

class CharacterReferenceFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      showCharacterReferenceModal : false,
      showOccupationModal : false,
      occupationId : '',
      occupationName : '',
      characterReferenceData : [],
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(5)
    this.presenter.getCharacterReference()
  }

  showCharacterReferenceMap (characterReferenceData) {
    this.setState({ characterReferenceData })
  }

  render() {
    const {
      history,
      percentage
    } = this.props

    const {
      showCharacterReferenceModal,
      showOccupationModal,
      showRequiredFields,
      occupationId,
      occupationName,
      characterReferenceData
    } = this.state

    return (
    <div>
      { super.render() }
      {
        showCharacterReferenceModal &&
        <CharacterReferenceAddFormModal
          occupationName = { occupationName }
          occupationId = { occupationId }
          showOccupationModal = { showOccupationModal }
          showOccupationModalFunc = { () =>
            this.setState({ showOccupationModal : true }) }
          showRequiredFieldsFunc = { (occupationId, occupationName, showOccupationModal) =>
            this.setState({ occupationId, occupationName, showOccupationModal }) }
          onClose = { () =>
            this.setState({ showCharacterReferenceModal : false }) }
          />
      }
      <div>
         <br/>
          <div className = { 'percentage-grid' }>
            <div>
              <h2 className={ 'header-margin-default text-align-left' }>Character Reference</h2>
              <h2>By nominating these persons as your personal character references, you provide consent that UnionBank of the Philippines may conduct a character reference check on your possible employment with the company. You also certify that the information you&#39;ve provided are true and corret</h2>
            </div>
            <Progress
              type = { 'circle' }
              height = { 100 }
              width = { 100 }
              percent={ percentage } />
          </div>
        <br/>
      </div>
      <div>
        <div className = { 'grid-global' } >
          <h2 className = { 'font-weight-bold' }>Character Reference</h2>
          <div className = { 'text-align-end' }>
            <GenericButton
              text = { 'ADD' }
              onClick = { () => this.setState({ showCharacterReferenceModal : true }) }
            />
          </div>
        </div>

        <br/>

        <div>
          <MullptipleCardComponent
            characterReferenceData = { characterReferenceData }
          />
        </div>
      </div>
    </div>
    )
  }
}

CharacterReferenceFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

CharacterReferenceFragment.defaultProps = {
}

export default ConnectView(CharacterReferenceFragment, Presenter)
