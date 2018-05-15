import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media, Player, withMediaProps, withKeyboardControls, controls } from 'react-media-player'

const { CurrentTime, Progress, SeekBar, Duration, Volume, PlayPause, Fullscreen, MuteUnmute } = controls

class MedPlayer extends Component {
  render () {
    const { selectedPodcast, history } = this.props
    const url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    const newUrl = url

   return (
    <div className = { 'media-player-content' }>
      <Media>
      {({ isFullscreen, playPause }) =>
        <div
          className={`media-player${  isFullscreen ? ' media-player--fullscreen' : ''}`}
          tabIndex="0">
          <Player
            className = {'player-content'}
            src={ newUrl }
            onClick={() => playPause()}
          />
          <div className="media-controls">
            <PlayPause className="media-control media-control--play-pause" />
            <CurrentTime className="media-control media-control--current-time" />
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
  }
}

export default MedPlayer
