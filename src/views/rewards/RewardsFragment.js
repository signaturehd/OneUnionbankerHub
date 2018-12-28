	import React from 'react'
	import PropTypes from 'prop-types'
	import Presenter from './presenter/RewardsPresenter'
	import BaseMVPView from '../common/base/BaseMVPView'
	import ConnectView from '../../utils/ConnectView'
	import { InputModal, Card, GenericButton } from '../../ub-components'

	import './styles/myrewards.css'


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
			path: '/myrewards/celebratedna',
		},
		{
			id: 1 ,
			styleName: 'myrewards-cards-1 myrewards-option-default font-weight-bold',
			title: 'U Are Recognized',
			path: '/myrewards/uarerecognized',
		},
		{
			id: 2 ,
			styleName: 'myrewards-cards-1 myrewards-option-default font-weight-bold',
			title: 'Star Award',
			path: '/myrewards/staraward',
		},
		{
			id: 3 ,
			styleName: 'myrewards-cards-1 myrewards-option-default font-weight-bold',
			title: 'Etc',
			path: '/myrewards/staraward',
		}]

		return (
<div className = {'grid-container'}>
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

						<Card className = {'myreward-orange-color '}>
						<div className = { 'myrewards-card-adjustment'}>

							<p className= { '' }> My Reward </p>
							<p className = { 'myrewards-card-adjustment '}> 20,000 </p>
						</div>
						</Card>

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
							</Card>
							))
						}



						</div>
					</div>
				</div>

				<div className={'grid-item2'}>
						<h1 className= { 'header-margin-default text-align-left' } > Redeem </h1>
						<p> awjeawjeiajw iejaw ijeaw</p>
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
