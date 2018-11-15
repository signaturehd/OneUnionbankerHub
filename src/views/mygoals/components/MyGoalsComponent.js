import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'

import Presenter from '../presenter/MyGoalsPresenter'

import {
  Modal,
  GenericButton,
  GenericInput,
  SingleInputModal,
  CircularLoader,
  DatePicker,
  Card,
  Line,
  Checkbox,
  FloatingActionButton
} from '../../../ub-components/'

import { format } from '../../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/myGoalStyles.css'

class MyGoalsComponent extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  noticeResponse (noticeResponse) {
    this.setState({ noticeResponse, showNoticeResponseModal : true })
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  render () {
    const { cardHolder } = this.props
    return (
      <div className = { 'grid-main padding-5px' }>
      {
        cardHolder.map((resp) =>
          <Card className = { 'margin-5px' }>
            <div className = { 'grid-card-row' }>

              <div className = { 'grid-card-x2 header-color border-radius-top' }>
                <h2 className = { 'margin-10px text-align-left font-size-16px font-weight-bold color-white' }>Goal Title</h2>
                <h2 className = { 'margin-10px text-align-right font-size-16px font-weight-lighter unionbank-color' }>Personal</h2>
              </div>

              <div className = { 'grid-card-x2' }>
                <div className = { 'grid-div-row' }>
                  <div></div>
                  <div>
                    <h2 className = { 'margin-10px text-align-left font-size-14px font-weight-lighter' }>Description description description...</h2>
                    <h2 className = { 'margin-10px text-align-left font-size-14px font-weight-lighter' }>Nov 15, 2018 to Dec 15, 2018</h2>
                    <h2 className = { 'margin-10px text-align-left font-size-14px font-weight-bold' }>High</h2>
                  </div>
                  <div></div>
                </div>

                <div className = { 'grid-div-row' }>
                  <div></div>
                  <div className = { 'margin-10px text-align-right' }>
                    <Progress
                      type = { 'circle' }
                      height = { 65 }
                      width = { 65 }
                      percent = { 80 }/>
                  </div>
                  <div></div>
                </div>
              </div>

              <div>
                <Line/>
                <div className = { 'grid-footer-column margin-5px' }>
                  <div>
                    <span className = { 'icon-check icon-check-img' }/>
                  </div>
                  <div></div>
                  <div>
                    <span className = { 'icon-check icon-edit-img' }/>
                  </div>
                </div>
              </div>

            </div>
          </Card>
        )
      }
      </div>
    )
  }
}

MyGoalsComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default MyGoalsComponent
