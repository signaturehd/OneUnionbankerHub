	import React from 'react'
	import { Switch, Route, createBrowserHistory } from 'react-router-dom'
	import PropTypes from 'prop-types'
	
	import BaseMVPView from '../common/base/BaseMVPView'
	import ConnectView from '../../utils/ConnectView'
	import { InputModal, Card, GenericButton } from '../../ub-components'
	import './styles/myrewards.css'

const RewardsRecognitionFragment = () => {
	const myrewards1 = [{
		id: 0 ,
		styleName: 'myrewards-cards-1 myrewards-option-default font-weight-bold',
		title: 'A',
		path: '/mycompliance/codeofconduct',
	  },
	  {
		id: 1 ,
		styleName: 'myrewards-cards-1 myrewards-option-default font-weight-bold',
		title: 'B',
		path: '/mycompliance/codeofconduct',
	  },
	  {
		id: 2 ,
		styleName: 'myrewards-cards-1 myrewards-option-default font-weight-bold',
		title: 'C',
		path: '/mycompliance/codeofconduct',
	  }
	]


	return (
		<div className={'myrewards-card-container'} >
			<div>
				<h2 className={ 'header-margin-default text-align-left' }>My Rewards</h2>
				<h2> Check your rewards. </h2>
			</div>
			
			<div className = { 'myrewards-adjustment' }>
				<div className = { 'myrewards-card-container' }>
				{
				myrewards1.map((value, idx) => (
					<Card
					className = { 'myrewards-card' }
					onClick={ () =>
						history.push(value.path)
					}
					key={ idx }>
					<div className = { 'rewards-column-grid' }>
						<div
						className={ value.styleName }
						text={ value.title } >
						</div>
						<p className={ 'myrewards-option-cards font-weight-bold' }>{ value.title }</p>
					</div>
					</Card>
					))
				}
				</div>
			</div>
		</div>
	)
}

    <h2> My Rewards and Recognition</h2>

  )
}

export default RewardsRecognitionFragment;
