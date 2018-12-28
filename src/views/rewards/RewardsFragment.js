	import React from 'react'
	import PropTypes from 'prop-types'
	import Presenter from './presenter/RewardsPresenter'
	import BaseMVPView from '../common/base/BaseMVPView'
	import ConnectView from '../../utils/ConnectView'


	import { InputModal, Card, GenericButton } from '../../ub-components'
	import './styles/myrewards.css'
	import staticImage from './styles/ubp-bg.png'

class RewardsRecognitionFragment extends BaseMVPView {
	constructor (props) {
		super(props)
	}
	componentDidMount () {
		this.props.setSelectedNavigation(9)
	}


	render () {
		const { history, profileHasCOC } = this.props
    	const { accountNumber, showAccountNumberModal } = this.state


		const myrewards1 = [{
			id: 0 ,
			styleName: 'myrewards-cards-1 myrewards-option-default font-weight-bold',
			title: 'Celebrate a DNA Moment',
			details: 'Short Description',
			path: '/myrewards/celebratedna',
		},
		{
			id: 1 ,
			styleName: 'myrewards-cards-1 myrewards-option-default font-weight-bold',
			title: 'U Are Recognized',
			details: 'Short Description',
			path: '/myrewards/uarerecognized',
		},
		{
			id: 2 ,
			styleName: 'myrewards-cards-1 myrewards-option-default font-weight-bold',
			title: 'Star Award',
			details: 'Recognize a UnionBanker',
			path: '/myrewards/staraward',
		},
		{
			id: 3 ,
			styleName: 'myrewards-cards-1 myrewards-option-default font-weight-bold',
			title: 'Etc',
			details: 'Short Description',
			path: '/myrewards/staraward',
		}]

		
		const styleImage = {
				backgroundImage: `url(${staticImage})`,
				backgroundImage: `url('${staticImage}')`,
				width: '50px',
				height: '20px',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
		}
		

		return (
				<div className={'myrewards-container'} >
					<div>
						<h2 className={ 'header-margin-default text-align-left ' }>My Rewards</h2>
						<p> Gather and redeem your points</p>
					</div>
					{
					showAccountNumberModal &&
						<InputModal
						isDismisable = { true }
						onClose = { () => this.setState({ showAccountNumberModal : false }) }
						onChange = { e => this.setState({ accountNumber: e.target.value }) }
						placeholder = { 'Account Number' }
						type = { 'text' }
						onSubmit = { e => {
							e.preventDefault()
							this.presenter.validateAccountNumber(accountNumber)
							}
						}
					/>
					}

						<div className = { 'myreward-orange-color'}>
							<span className= { 'myreward-orange-text align-left'}>☻</span>
							<span className= { 'myreward-orange-text align-left'}> My Reward </span>
							<span className = { 'myreward-orange-text align-right'}> 20,000 </span>
						</div>

					<div>
							<h2 className={ 'header-margin-default text-align-left' }> Recognize a Unionbanker </h2>
							<h6> Celebrate those who own the future and drive innovation </h6>
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
								<div>
								<p className={ 'myrewards-option-cards' }>{ value.details }</p>
							</div>
							</Card>
							))
						}

						<Card className={'myrewards-container-component'} >
							<img src={staticImage} height="150" width="260px" border-radius="250px" />
			   	
								<div className={'myrewards-grid'}>
									<h2 class="text-align-left font-size-12px font-weight-lighter" >20 % OFF in Zalora</h2>
								</div>
							<div className={'myrewards-grid'}>
								<h2 className="margin-10px text-align-right font-size-12px font-weight-bold color-gray">Update for approval</h2>
									</div>
						
						</Card>
					</div>
				</div>
			</div>
			)
	}
}

RewardsRecognitionFragment.propTypes = {
	setSelectedNavigation: PropTypes.func,
	profileHasCOC: PropTypes.boolean,
  }

export default ConnectView (RewardsRecognitionFragment, Presenter)
