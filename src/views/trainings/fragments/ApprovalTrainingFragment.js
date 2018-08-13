import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import ApprovalTrainingCardComponent from '../components/ApprovalTrainingCardComponent'

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

class ApprovalTrainingFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      approvalTrainingList : [],
      enabledLoader: false,
      index: 8,
    }
  }

  componentDidMount () {
    this.props.presenter.getNeedApprovalTrainings()
  }

  showApprovalList (approvalTrainingList) {
    this.setState({ approvalTrainingList })
  }

  circularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  render () {
  const {
    history,
    presenter,
    searchString
  } = this.props

  const {
    approvalTrainingList,
    enabledLoader,
    index,
  } = this.state

  let training = approvalTrainingList
  const search = searchString.trim().toLowerCase()
  if (search.length > 0) {
        training = approvalTrainingList.filter(approvalTrainingList =>
       approvalTrainingList.name.toLowerCase().match(search) ||
       approvalTrainingList.title.toLowerCase().match(search))
  }

  return (
    <div>
      { super.render() }
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
              approvalTrainingList &&
              approvalTrainingList.slice(0, index).map((resp, key) =>
                <ApprovalTrainingCardComponent
                  id = { key }
                  name = { resp.name }
                  status = { resp.status }
                  title = { resp.title }
                  />
              )
            }
          </div>
            {
              approvalTrainingList ?
            <div>
              <div className = { 'grid-global' }>
                  {
                    index === 8 ?
                    <div></div> :
                    <GenericButton
                      className = { 'transaction-component-button' }
                      text = { 'View Less' }
                      onClick = { () =>
                        this.setState({
                          index : MyTrainingFunctions.indexDecreased(index)
                          })
                        }
                      />
                  }
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
            :
            <div></div>
          }
        </div>
      </div>
      }
    </div>
    )
  }
}

export default ApprovalTrainingFragment
