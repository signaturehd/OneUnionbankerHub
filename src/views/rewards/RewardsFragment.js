import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/RewardsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import { InputModal, Card, GenericButton } from '../../ub-components'

import './styles/myrewards.css'
import RewardRedeemFragment from './fragments/RewardRedeemFragments'
import RewardSearchComponent from './components/RewardSearchComponent'

class RewardsRecognitionFragment extends BaseMVPView {
	constructor (props) {
		super(props)
		this.state = {
			selectedAwards: false,
			selectedId: null,
		}
	}

	componentDidMount () {
		this.props.setSelectedNavigation(9)
		this.presenter.getRewardAwards()
	}

	setRecognizedRewards (recognizedAwards) {
		this.setState({ recognizedAwards })
	}

	render () {
		const { history, profileHasCOC } = this.props
		const {
			accountNumber,
			showAccountNumberModal,
			recognizedAwards,
			selectedId,
			selectedAwards
		} = this.state

		const membersData = [{
			id : 0,
			name: 'test',
			details : [{test: 'name'}, {test: 'name'}]
		},{
			id : 1,
			name: 'test 1',
			details : [{test: 'name'}, {test: 'name'}]
		},{
			id : 2,
			name: 'test 2',
			details : [{test: 'name'}, {test: 'name'}]
		},{
			id : 3,
			name: 'test 3',
			details : [{test: 'name'}, {test: 'name'}]
		}]

		const myrewards1 = [{
			id: 0,
			styleName: 'myrewards-cards-1 myrewards-option-default font-weight-bold',
			title: 'Celebrate a DNA Moment',
			details: 'Short Description',
			path: '/myrewards/celebratedna',
		},
		{
			id: 1,
			styleName: 'myrewards-cards-1 myrewards-option-default font-weight-bold',
			title: 'U Are Recognized',
			details: 'Short Description',
			path: '/myrewards/uarerecognized',
		},
		{
			id: 2,
			styleName: 'myrewards-cards-1 myrewards-option-default font-weight-bold',
			title: 'Star Award',
			details: 'Recognized a UnionBanker',
			path: '/myrewards/staraward',
		}]

		const redeemData  = [{
			id: 0,
			staticImage: '',
			leftText: '10% OFF in Zalora',
			rightText: '13, 000 points',
		},
		{
			id: 1,
			staticImage: '',
			leftText: '20% OFF in Carola',
			rightText: '23, 000 points',
		},
		{
			id: 2,
			staticImage: '',
			leftText: '30% OFF in Valora',
			rightText: '33, 000 points',
		}]

		return (
			<div>
				{
					selectedAwards  ?

					<div>
						<GenericButton
							text = { 'back' }
							onClick = { () => this.setState({ selectedAwards: false }) }
							/>
						test
						 id :{ selectedId }
						 status: { selectedAwards }
					</div>
					 :
					<div className={'myreward-grid-container'}>
						<div className={'myrewards-container'} >
							<div>
								<h2 className={'header-margin-default text-align-left '}>My Rewards</h2>
								<p> Gather and redeem your points</p>
							</div>
							{
								showAccountNumberModal &&
								<InputModal
									isDismisable={true}
									onClose={() => this.setState({ showAccountNumberModal: false })}
									onChange={e => this.setState({ accountNumber: e.target.value })}
									placeholder={'Account Number'}
									type={'text'}
									onSubmit={e => {
										e.preventDefault()
										this.presenter.validateAccountNumber(accountNumber)
									}
									}
								/>
							}

							<div className={'myreward-orange-color'}>
								<span className={'myreward-orange-text align-left'}> My Reward </span>
								<span className={'myreward-orange-text align-right'}> 20,000 </span>
							</div>

							<div>
								<h2 className={'header-margin-default text-align-left'}> Recognize a Unionbanker </h2>
								<h6> Celebrate those who own the future and drive innovation </h6>
							</div>
							<div className={'myrewards-adjustment'}>
								<div className={'myrewards-card-container'}>
									{
										myrewards1.map((value, idx) => (
											<Card
												className={'myrewards-card'}
												onClick={() =>
													this.setState({ selectedAwards : true, selectedId: value.id })
												}
												key={idx}>
												<div className={'rewards-column-grid'}>
													<div
														className={value.styleName}
														text={value.title} >
													</div>
													<p className={'myrewards-option-cards font-weight-bold'}>{value.title}</p>
													<p className={'myrewards-option-cards-details'}>{value.details}</p>
												</div>
											</Card>
										))
									}
								</div>
							</div>
						</div>
						<div>
						<RewardRedeemFragment redeemData = {redeemData} />
						<br/>
						<RewardSearchComponent
							type = { 'suggestion' }
							sendDataList = { (e) => console.log(e) }
							listData = { membersData }/>
						</div>
					</div>
				}
			</div>
		)
	}
}

RewardsRecognitionFragment.propTypes = {
	setSelectedNavigation: PropTypes.func,
	profileHasCOC: PropTypes.boolean,
}

export default ConnectView(RewardsRecognitionFragment, Presenter)
