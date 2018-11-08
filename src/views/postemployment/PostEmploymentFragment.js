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
import ResponseModal from '../notice/NoticeResponseModal'

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
      pdfFile : '',
      dataRequirements : [],
      enabledLoader: false,
      enabledLoaderPdfModal: false,
      count : 2,
      attachments : [],
      attachmentsData : [{
        name : 'Form'
      }],
      showNoticeResponseModal : false,
      noticeResponse : '',
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.getPostEmployment()
  }

  submitForm (id) {
    const {
      attachmentsData
    } = this.state

    this.presenter.addRequirement(id, attachmentsData)
    this.setState({ enabledLoader : false })
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

  showPdfFileView (pdfFile) {
    this.setState({ pdfFile })
  }

  showDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : true })
  }

  hideDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : false })
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

  showAttachmentsFileView (data) {
    let arrayNew = [...this.state.attachments]
    const objectArray = {
      file : data
    }
    arrayNew.push(objectArray)
    this.setState({ attachments : arrayNew })
  }

  noticeResponseResp (noticeResponse) {
    this.setState({ noticeResponse , showNoticeResponseModal : true})
  }

  addAttachmentsFunc (attachment, tempCount) {
    const attachmentTemp = [...attachment]
    let newCount = tempCount + 1
    this.setState({ count : newCount })
    attachmentTemp.push({
      name : 'Form' + tempCount
    })
    this.setState({ attachmentsData : attachmentTemp })
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
      enabledLoaderPdfModal,
      pdfFile,
      count,
      attachments,
      attachmentsData,
      showNoticeResponseModal,
      noticeResponse,
    } = this.state

    const arrayCard = [{
      id: 1,
      name : 'Bureau of Internal Revenue(BIR) Form 1905',
    }, {
      id: 2,
      name : 'Bureau of Internal Revenue(BIR) Form 2316',
    }, {
      id: 3,
      name : 'Certificate of Employment',
    }]

    return (
      <div className={ 'postemployment-container' }>
        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false})
              this.presenter.getPostEmployment()
            }}
            noticeResponse={ noticeResponse }
          />
        }
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
                pdfFile = { pdfFile }
                count = { count }
                attachments = { attachments }
                attachmentsData = { attachmentsData }
                enabledLoaderPdfModal = { enabledLoaderPdfModal }
                enabledLoader = { enabledLoader }
                titleFunc = { (title) => this.setState({ title }) }
                subtitleFunc = { (subtitle) => this.setState({ subtitle }) }
                certificateArray = { this.getFormData(3) }
                bir1905Array = { this.getFormData(1) }
                bir2316Array = { this.getFormData(2) }
                pageId = { pageId }
                countFunc = { (count) => this.setState({ count }) }
                addAttachmentsFunc = { (data, tempCount) => this.addAttachmentsFunc(data, tempCount)  }
                getOnBoardingDocument = { (link) => this.presenter.getOnBoardingDocument(link) }
                getSelectedAttachments = { (resp) => this.presenter.getSelectedAttachments(resp) }
                submitForm = { (id) => {
                  {
                    this.setState({ enabledLoader : true })
                    this.submitForm(id)
                  }
                } }
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
                  onClick = { () => {
                    this.decrementFunc()
                    this.setState({
                      attachments : []
                    })
                  } } /> :
                <div></div>
              }
              {
                hideSubmitButton ?
                <GenericButton
                  className = { 'preemp-next-button' }
                  text = { pageId === 3 ? 'Finish' : 'Next' }
                  onClick = { () => {
                    this.setState({
                      attachments : []
                    })
                    this.incrementFunc()
                  } } />
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
