import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, GenericButton } from '../../../ub-components/'

class RewardRedeemFragments extends Component {
	constructor (props) {
		super(props)
		this.state = {
			selectedCard : false
		}
  }

  render () {
    const {
      resp,
      filterTitle,
      rewardGiftsId
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
                    gridTemplateRows: '1fr .05fr',
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
                    textAlign: 'left',
                    display: 'grid',
                    gridTemplateRows: '1fr .05fr',
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
                    <center>
                      <GenericButton
                        className = { 'gifts-know-more' }
                        text = { 'SHOW MORE' }
                        />
                    </center>
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
            </div>
          }
        </div>
      </div>
    )
  }
}

export default RewardRedeemFragments
