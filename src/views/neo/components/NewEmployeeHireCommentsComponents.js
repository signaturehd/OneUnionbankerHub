import { Progress } from 'react-sweet-progress'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import staticIcon from '../../../images/onboarding/thumbnail.jpg'

import {
  Card,
  GenericInput
}  from '../../../ub-components/'

let commentArrayListData = [{
  id: 0,
  name : 'J. Timberlake',
  comment : 'Thats great!',
  reactionCount: 2,
}, {
  id : 1,
  name : 'J. Timberlake',
  comment: 'Thanks A lot !!!',
  reactionCount: 2,
}, {
  id : 2,
  name : 'J. Timberlake',
  comment: 'Thanks A lot !!!',
  reactionCount: 5,
}, {
  id : 3,
  name : 'J. Ponce',
  comment: 'Thanks A lot !!!',
  reactionCount: 5,
}, {
  id : 4,
  name : 'J. Fritz',
  comment: 'Thanks A lot !!!',
  reactionCount: 5,
}]

class NewEmployeeHireCommentsComponents extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      commentArrayList,
    } = this.props

    return (
      <Card
        style = {{
          borderRadius: '0px'
        }}
        >
        <div style = {{
            height: '360px',
            overflow: 'auto',
            padding: '10px 20px'
          }}>
          <h4
            className = { 'font-weight-lighter' }
            style = {{
              lineSpacing: '1px'
            }}>Comments</h4>
          <br/>
          <div
            className = { 'neo-details-upnext-comment cursor-pointer' }>
            <span
              style = {{
                backgroundImage : `url(${staticIcon})`,
                objectFit: 'contain',
                backgroundSize: 'cover',
                height: '50px',
                borderRadius: '50px',
                backgroundPosition: 'center center',
                width: '50px',
                backgroundRepeat: 'no-repeat',
                margin: 'auto',
              }}/>
            <GenericInput
              onChange = { () => {} }
              value = { '' }
              text = { 'Enter your comments' }
              />
          </div>
          {
            commentArrayListData.map((resp, key) =>
              <div
                style = {{
                  marginBottom: '10px'
                }}
                className = { 'neo-details-upnext-comment cursor-pointer' }
                key = { key }>
                <span
                  style = {{
                    backgroundImage : `url(${staticIcon})`,
                    objectFit: 'contain',
                    backgroundSize: 'cover',
                    height: '50px',
                    borderRadius: '50px',
                    backgroundPosition: 'center center',
                    width: '50px',
                    backgroundRepeat: 'no-repeat',
                    margin: 'auto',
                  }}/>
                <div
                  style = {{
                    padding : '5px',
                    letterSpacing: '.5px',
                   }}>
                   <h4 className = { 'font-size-14px font-weight-normal' }>{resp.name}</h4>
                   <h4 className = { 'font-weight-lighter font-size-10px' }>{resp.comment}</h4>
                </div>
                <span className = { `neo-heart-details-comments neo-heart-active` }/>
                <h4 className = { 'margin-auto font-size-8px unionbank-color-grey' }>123</h4>
              </div>
            )
          }
        </div>
      </Card>
    )
  }
}

export default NewEmployeeHireCommentsComponents
