import React, { Component } from 'react'
import { Card } from '../../ub-components'

import staticImage from './styles/ubp-bg.png'


class Redeem extends Component {
    render () {
        const redeem = [{
            id: 0,
            staticImage: '',
            leftText: '10 % OFF in Zalora',
            rightText: '13, 000 points',
        },
        {
            id: 1,
            staticImage: '',
            leftText: '20 % OFF in Carola',
            rightText: '23, 000 points',
        },
        {
            id: 2,
            staticImage: '',
            leftText: '30 % OFF in Valora',
            rightText: '33, 000 points',
        }]

        return (
            <div>
                <h2 className={'header-margin-default text-align-left'}>Redeem</h2>
                {
                    redeem.map((value, idx) => (
                        <Card className="myrewards-container-component">
                            <img className={'myrewards-card-image '} src={staticImage} />
                            <div className={'myrewards-grid myrewards-card-image-text'}>
                                <span class="align-left" >{value.leftText}</span>
                                <span class="align-right" >{value.rightText}</span>
                            </div>
                        </Card>
                    ))
                }
            </div>
        )
    }
}


export default Redeem
