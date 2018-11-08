import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/PostEmploymentPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'

import {
  Card,
  GenericButton,
  Line
} from '../../ub-components/'

import './styles/postEmploymentStyle.css'

import { Progress } from 'react-sweet-progress'

import PostEmploymentComponent from './components/PostEmploymentComponent'

class PostEmploymentFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      showPostEmploymentComponent : true,
      hideSubmitButton : true,
      pageId : '',
      postEmp : 0,
      title: '',
      subtitle : '',
      dataRequirements : [],
      enabledLoader: false,
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.getPostEmployment()
  }

  showPercentageOfPreEmployment (postEmp) {
    this.setState({ postEmp })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showPostEmploymentData (dataRequirements) {
    this.setState({ dataRequirements })
  }

  incrementFunc () {
    let count = this.state.pageId + 1

    if(this.state.pageId === 3) {
    } else {
      this.setState({ pageId : count })
    }
  }

  decrementFunc () {
    let count = this.state.pageId - 1

    if(this.state.pageId === 1) {
    } else {
      this.setState({ pageId : count })
    }
  }

  getFormData (id) {
    let formArray = []
    this.state.dataRequirements.map((form, key) => {
      form.documentId === id &&
        formArray.push({
          id : form.documentId,
          name : form.documentType,
          status : form.status,
          url : form.url
        })
    })
    return formArray
  }

  render () {
    const {
      showPostEmploymentComponent,
      dataRequirements,
      postEmp,
      pageId,
      title,
      subtitle,
      hideSubmitButton,
      enabledLoader,
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
      <div className={ 'postemployment-container' }>
        <div></div>
        <div>
          <div className = { 'percentage-grid' }>
            <div>
              <h2 className={ 'font-size-30px text-align-left' }>{ title ? title :  'Post Employment' }</h2>
              <br/>
              <h4>{ subtitle ? subtitle : 'Below are the list of pre-employment, please complete/ comply all the requirements.' }</h4>
            </div>
            <Progress
              type = { 'circle' }
              height = { 65 }
              width = { 65 }
              percent = { postEmp } />
          </div>
          <br/>
          <Line/>
          <br/>
          {
            showPostEmploymentComponent ?
              <div>
                {
                  arrayCard.map((resp, key) =>
                    <Card
                      onClick = { () => {
                        this.setState({ showPostEmploymentComponent : false, pageId : resp.id })
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
            :
            <div>
              <PostEmploymentComponent
                enabledLoader = { enabledLoader }
                titleFunc = { (title) => this.setState({ title }) }
                subtitleFunc = { (subtitle) => this.setState({ subtitle }) }
                certificateArray = { this.getFormData(3) }
                bir1905Array = { this.getFormData(1) }
                bir2316Array = { this.getFormData(2) }
                pageId = { pageId }
                getSelectedAttachments = { (resp) => this.presenter.getSelectedAttachments(resp) }
                />
            </div>
          }
          <br/>
          {
            !showPostEmploymentComponent &&
            <div className = { 'grid-global ' }>
              {
                pageId !== 0 ?
                <GenericButton
                  className = { 'global-button' }
                  text = { 'Previous' }
                  onClick = { () => this.decrementFunc() } /> :
                <div></div>
              }
              {
                hideSubmitButton ?
                <GenericButton
                  className = { 'preemp-next-button' }
                  text = { pageId === 3 ? 'Finish' : 'Next' }
                  onClick = { () => this.incrementFunc() } />
                  :
                <div></div>
              }
            </div>
          }
        </div>
        <div></div>
      </div>
    )
  }
}

export default ConnectView(PostEmploymentFragment, Presenter)