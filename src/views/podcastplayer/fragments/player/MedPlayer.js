import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AudioImage from '../../../../images/podcast.jpg'
import {
  Media,
  Player,
  withMediaProps,
  withKeyboardControls,
  controls,
} from 'react-media-player'

const {
  CurrentTime,
  Progress,
  SeekBar,
  Duration,
  Volume,
  PlayPause,
  Fullscreen,
  MuteUnmute,
} = controls



class MedPlayer extends Component {

  render () {
    let IsCompleted
    const { selectedPodcast } = this.props

    const style = {
      defaultBackground : {
        backgroundImage : `url(${selectedPodcast && selectedPodcast.image })`,
        height: '360px',
      	width: '-webkit-fill-available',
      	backgroundRepeat: 'no-repeat',
      	backgroundOrigin: 'content-box',
      	backgroundSize: 'contain',
      	objectFit: 'cover',
        backgroundColor: 'black',
      	bottom: '0px',
      	backgroundPosition: 'center',
        display: '-webkit-box',
      }
    }

    const labelStyle = {
      color:'#fff',
      fontSize: '13px',
      padding: '0px'
    }
    return (
      <div className = { 'media-player-content' }>
        <Media>
          {({ isFullscreen, playPause, currentTime, duration}) =>
          <div
            className={`media-player${  isFullscreen ? ' media-player--fullscreen' : ''}`}
            tabIndex="0">
            <div style = { style.defaultBackground }>
              <Player
                className = { 'player-content' }
                // src = {selectedPodcast && selectedPodcast.url}
                src = 'https://www.youtube.com/watch?v=LEu7FxUUr90'
                onClick = { () => playPause()}/>
            </div>
            <div className="media-controls">
            <label style={labelStyle}>{IsCompleted}</label>
              <PlayPause className="media-control media-control--play-pause" />
              <CurrentTime className="media-control media-control--current-time" onChange={isCompleted(currentTime, duration)}/>

              <div className="media-control-group media-control-group--seek">
                <Progress className="media-control media-control--progress" />
                <SeekBar className="media-control media-control--seekbar" />
              </div>

              <Duration className="media-control media-control--duration" />
              <MuteUnmute className="media-control media-control--mute-unmute" />
              <Volume className="media-control media-control--volume" />
              <Fullscreen className="media-control media-control--fullscreen" />
            </div>
          </div>
          }
        </Media>
      </div>
    )

    function isCompleted(currentTime, duration) {
      if(currentTime>=duration)
      {
        IsCompleted= 'Completed'
      }
    }
  }
}

MedPlayer.propTypes = {
  selectedPodcast : PropTypes.object,
}

export default MedPlayer
