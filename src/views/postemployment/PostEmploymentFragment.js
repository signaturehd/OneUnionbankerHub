import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/PostEmploymentPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'
import {
  Card
} from '../../ub-components/'

import './styles/postEmploymentStyle.css'

import PostEmploymentComponent from './components/PostEmploymentComponent'

class PostEmploymentFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      showPostEmploymentComponent : true,
      pageId : '',
      postEmp : '',
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.getPostEmployment()
  }

  showPercentageOfPreEmployment (postEmp) {
    this.setState({ postEmp })
  }

  setPage (pageId) {
    this.setState({ pageId })
  }

  showPostEmploymentData (dataRequirements) {
    this.setState({ dataRequirements })
  }

  render () {
    const {
      showPostEmploymentComponent,
      dataRequirements,
      postEmp
    } = this.state

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
      <div>
        {
          showPostEmploymentComponent &&
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
                    onClick = { () => {
                      this.setPage(resp.id)
                      this.setState({ showPostEmploymentComponent : false })
                    } }
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
        }
        <div>
          {
            !showPostEmploymentComponent &&
            <PostEmploymentComponent
              postEmp = { postEmp }
              pageId = { pageId }
              />
          }
        </div>
      </div>
    )
  }
}

export default ConnectView(PostEmploymentFragment, Presenter)
