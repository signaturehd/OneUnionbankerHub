import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/PostEmploymentPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'
import {
  Card
} from '../../ub-components/'

import './styles/postEmploymentStyle.css'

class PostEmploymentFragment extends BaseMVPView {
  constructor (props) {
    super (props)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.getPostEmployment()
  }

  render () {
    const arrayCard = [{
      id: 1,
      name : 'Bureau of Internal Revenue(BIR) Form 1905',
    }, {
      id: 2,
      name : 'Bureau of Internal Revenue(BIR) Form 2316',
    }, {
      id: 3,
      name : 'Certificate of Employment Attachment',
    }]

    return (
      <div className={ 'postemployment-container' }>
        <div></div>
        <div>
          <div>
            <h2 className={ 'font-size-30px text-align-left' }> Post Employment</h2>
            <br/>
            <h4>Below are the list of pre-employment, please complete/ comply all the requirements.</h4>
          </div>
          <br/>
          {
            arrayCard.map((resp, key) =>
              <Card
                className = { 'postemployment-padding-documents' }
                key = { key }>
                <div className = { 'postemployment-grid-x2' }>
                  <h2> { resp.name } </h2>
                  <div>
                    <span className = { 'postemployment-icon postemployment-seemore-button float-right' }/>
                  </div>
                </div>
              </Card>
            )
          }
        </div>
        <div></div>
      </div>
    )
  }
}

export default ConnectView(PostEmploymentFragment, Presenter)
