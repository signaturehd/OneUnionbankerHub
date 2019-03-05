import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, GenericButton } from '../../../ub-components/'

class GiftsListComponent extends Component {
	constructor (props) {
		super(props)
		this.state = {
			selectedCard : false
		}
  }

  render () {
    const {
      resp,
      rewardGiftsId,
			knowMoreClick
    } = this.props

    const {
      selectedCard,
    } = this.state

    return (
      <div
        key = { resp.id }
        onClick = { () => {
          this.setState({ selectedCard: true })
        } }
        onMouseLeave = { () => {
          this.setState({ selectedCard: false })
        } }
        className={ 'flip' }>
        <div className={ `egifts-card ${ selectedCard && 'flipped' }` }>
          <div className={ `face front` }>
            {
              !selectedCard &&
              <Card
                style = {{
                  backgroundImage: `url(${ resp.cardUrl })`,
                  objectFit: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'bottom',
                  backgroundSize: 'cover',
                }}
                className = { 'cursor-pointer gifts-card-rewards' }>
                <div  style = {{
                    margin: '10px',
                    textAlign: 'left',
                    display: 'grid',
                    gridTemplateRows: '1fr 0.15fr',
                    height: '100%',
                    minHeight: '200px',
                  }}>
                  <div>
                    <h4 className = { 'font-size-10px unionbank-white-color' }>General</h4>
                    <h4
                      style = {{
                        fontSize: '1em',
                        fontWeight: 'bold',
                        lineHeight: '1.5em',
                        textShadow: '0px 0px 3px #000',
                        textShadow: '0px 0px 3px rgba(0,0,0,0.25)',
                      }}
                      className = { 'unionbank-white-color' }>{resp.name}</h4>
                  </div>
                  <div className = { 'gifts-location-alignment' }>
                    <h4
                      style = {{
                        fontSize: '.7em',
                        fontWeight: 'bold',
                        lineHeight: '1.5em',
                        textShadow: '0px 0px 3px #000',
                        textShadow: '0px 0px 3px rgba(0,0,0,0.25)',
                      }}
                      className = { 'unionbank-white-color' }>{resp.locationCount} location{ resp.locationCount === 1 ? '' : 's' }</h4>
                  </div>
                </div>
              </Card>
            }
          </div>
          {
            selectedCard &&
            <div className={ `face back` }>
              <Card
                className = { 'cursor-pointer gifts-card-rewards' }>
                <div  style = {{
                    margin: '10px',
                    display: 'grid',
                    gridTemplateRows: '1fr 0.15fr',
                    height: '100%',
                    minHeight: '200px',
                  }}>
                  <div>
                    <img
                      alt={ resp.name }
                      width = { 50 }
                      height = { 50 }
                      style = {{
                        height: '50px',
                        margin: '0 auto 8px',
                        display: 'block',
                        border: '1px solid #80808040'
                      }}
                      src={ resp.logo }/>
                  </div>
                  <center>
                    <h4
                      className = { 'gifts-merchandise-tagline' }>{resp.tagline}</h4>
                  </center>
                  <div className = { 'gifts-location-alignment' }>
                    <center>
                      <GenericButton
                        onClick = { () => knowMoreClick(resp.id) }
                        className = { 'gifts-know-more' }
                        text = { 'SHOW MORE' }
                        />
                    </center>
                  </div>
                </div>
              </Card>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default GiftsListComponent
