import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import ResponseModal from '../../notice/NoticeResponseModal'
import TrainingCardModal from '../modals/TrainingCardModal'

import MyTrainingListCardComponent from
'../components/MyTrainingListCardComponent'

import * as MyTrainingFunctions from
'../functions/MyTrainingFunctions'

import {
  CircularLoader,
  Line,
  GenericInput,
  GenericButton,
  Modal
} from '../../../ub-components/'

import './styles/myTrainingStyle.css'

class MyTrainingFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      trainingList : [],
      enabledLoader: false,
      searchString : '',
      index: 8,
      trainingDetails: null,
      showConfirmation : false,
      loadingModal : false,
      noticeResponse : null,
      showNoticeResponseModal : false,
    }
    this.programSearch = this.programSearch.bind(this)
  }

  componentDidMount () {
    this.props.presenter.getEmployeeTraining()
  }

  setTrainingDetails (trainingDetails) {
    this.setState({ trainingDetails })
  }

  showTrainingList (trainingList) {
    this.setState({ trainingList })
  }

  showCircularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  hideCircularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  clearTraining () {
    this.setState({ trainingDetails : '', loadingModal : false })
  }

  setLoadingModal(loadingModal) {
    this.setState({ loadingModal })
  }

  programSearch (e) {
    this.setState({ searchString: e.target.value.substr(0 , 20) })
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  noticeResponse (noticeResponse) {
    this.setState({ noticeResponse, showNoticeResponseModal : true })
  }

  render () {
  const { history, presenter, searchString } = this.props
  const {
    trainingList,
    enabledLoader,
    index,
    trainingDetails,
    showConfirmation,
    loadingModal,
    noticeResponse,
    showNoticeResponseModal,
  } = this.state


  let training = trainingList
  const search = searchString.trim().toLowerCase()
  if (search.length > 0) {
        training = trainingList.filter(trainingList =>
       trainingList.venue.toLowerCase().match(search) ||
       trainingList.title.toLowerCase().match(search))
  }

  return (
    <div>
      { super.render() }
      {
        trainingDetails &&
        <TrainingCardModal
          onClose = { () => this.setState({ trainingDetails : '' }) }
          details = { trainingDetails }
          onEnroll = { (id) => presenter.enrollEmployee(String(id)) }
          showConfirmation = { showConfirmation }
          setConfirmation = { (showConfirmation) => this.setState({showConfirmation}) }
        />
      }

      {
        loadingModal &&
        <Modal>
          <center>
            <h3>Please wait while Loading...</h3>
            <br/>
            <br/>
            <CircularLoader show={true}/>
           </center>
         </Modal>
      }

      {
        showNoticeResponseModal &&
        <ResponseModal
          onClose = { () => {
            this.setState({ showNoticeResponseModal : false, trainingDetails : '' })

          }}
          noticeResponse = { noticeResponse }
        />
      }

      {
        enabledLoader ?
        <center className = { 'circular-loader-center' }>
           <CircularLoader show = { true }/>
         </center>
       :
      <div className = { 'mytrainings-grid-container-row' }>
        <div className = { 'mytrainings-list-card' }>
          <div>
            <Line/>
            <br/>
          </div>
          <div className = { 'mytrainings-list' }>
          {
           training &&
           training.slice(0, index).map((resp, key) =>
             <MyTrainingListCardComponent
               key = { key }
               id = { resp.id }
               venue = { resp.venue }
               title = { resp.title }
               startTime = { resp.startTime }
               endTime = { resp.endTime }
               status = { resp.status }
               startDate = { resp.startDate }
               endDate = { resp.endDate }
               onClick = { (id) => presenter.getEmployeeTrainingDetails(id) }
             />
           )
          }
          </div>
          <div>
            <div className = { 'grid-global' }>
              <GenericButton
                className = { 'transaction-component-button' }
                text = { 'View Less' }
                onClick = { () =>
                  this.setState({
                    index : MyTrainingFunctions.indexDecreased(index)
                    })
                  }
                />
              <GenericButton
                className = { 'transaction-component-button' }
                text = { 'View More' }
                onClick = { () =>
                  this.setState({
                    index : MyTrainingFunctions.indexIncreased(index)
                    })
                  }
                />
            </div>
            <Line/>
          </div>
        </div>
      </div>
      }
    </div>
    )
  }
}

export default MyTrainingFragment