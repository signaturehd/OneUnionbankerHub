import { Progress } from 'react-sweet-progress'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserAvatar from 'react-user-avatar'

import {
  Card,
  Line
}  from '../../../ub-components/'

import staticIcon from '../../../images/onboarding/thumbnail.jpg'

class NewEmployeeHireNextVideosComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      neoData,
      selectedVideoFunc,
      selectedVideo
    } = this.props

    return (
      <div>
      <br/>
      <h4 className = { 'font-weight-lighter font-size-20px padding-10px' }>Up Next</h4>
      <Line />
      <br/>
        <div style = {{
            overflow: 'auto',
            height: 'auto'
          }}>
          {
            neoData.map((resp, key) =>
              <div
                style = {{
                  marginBottom: '20px',
                }}
                onClick = { () => selectedVideoFunc(resp) }
                className = { 'neo-details-upnext-video cursor-pointer' }
                key = { key }>
                <span
                  style = {{
                    backgroundImage : `url(${staticIcon})`,
                    objectFit: 'contain',
                    backgroundSize: 'cover',
                    height: '100%',
                    borderRadius: '10px',
                    backgroundPosition: 'center center',
                    width: '100%',
                    backgroundRepeat: 'no-repeat',
                    margin: 'auto',
                  }}/>
                <div
                  style = {{
                    padding : '5px',
                    letterSpacing: '.5px',
                   }}>
                   <h4>Employee Engagement</h4>
                   <h4 className = { 'font-weight-lighter font-size-12px' }>{resp.description}</h4>
                   <br/>
                 <div style = {{
                     display : 'inline-flex'
                   }}>
                   <UserAvatar size="22" name="Will" />
                   <UserAvatar size="22" name="Will" src="https://pbs.twimg.com/profile_images/429442426038538240/6Ac9kykG_400x400.jpeg" />
                   <UserAvatar size="22" name="John" colors={['#ccc', '#fafafa', '#ccaabb']}/>
                   <UserAvatar size="22" name="Mary" />
                   <UserAvatar size="22" name="Jane" color="#FFF" />
                   <UserAvatar size="22" name="Madonna" />
                   <UserAvatar size="22" name="Madonna" />
                   <UserAvatar size="22" name="Madonna" />
                   <UserAvatar size="22" name="Madonna" />
                 </div>
                </div>
              </div>
            )
          }
        </div>
        <Line />
      </div>
    )
  }
}

export default NewEmployeeHireNextVideosComponent
