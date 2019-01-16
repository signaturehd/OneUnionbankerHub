import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/RewardsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import { InputModal, Card, GenericButton } from '../../ub-components'

import './styles/myrewards.css'
import RewardRedeemFragment from './fragments/RewardRedeemFragments'
import AwardFragment from './fragments/AwardFragment'
import RewardSearchComponent from './components/RewardSearchComponent'

import { format } from '../../utils/numberUtils'

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
		this.presenter.getRewardPoints()
	}

	setRecognizedRewards (recognizedAwards) {
		this.setState({ recognizedAwards })
	}

	setRewardPoints (rewardPoints) {
		this.setState({ rewardPoints })
	}

	render () {
		const { history, profileHasCOC } = this.props
		const {
			rewardPoints,
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
			styleName: 'myrewards-cards-2 myrewards-option-default font-weight-bold',
			title: 'U Are Recognized',
			details: 'Short Description',
			path: '/myrewards/uarerecognized',
		},
		{
			id: 2,
			styleName: 'myrewards-cards-3 myrewards-option-default font-weight-bold',
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

		const awardData  = [{
			id: 0,
			title: 'Celebrate a DNA Moment',
			details: 'This award is given to individuals or teams who demonstrate behaviors aligned to the following:',
			styleName : 'myawards-image myawards-image-1',
			value : 'Values:',
			valuesDetails : 'Integrity, Magis, Ubuntu',
			principles : 'Distinguishing beliefs/principles:' ,
			principlesDetails : 'Forward-thinking, Agile, Open and Innovative',
		},
		{
			id: 1,
			title: 'U Are Recognized',
			details: 'Given to individuals or teams who demonstrated any component of the UnionBank DNA in their day-to-day task.',
			styleName : 'myawards-image myawards-image-2',
			value : null,
			valuesDetails : null,
			principles : null,
			principlesDetails : null,
		},
		{
			id: 2,
			title: 'Star Award',
			details: 'Short Star Award details',
			styleName : 'myawards-image myawards-image-3 ',
			value : null,
			valuesDetails : null,
			principles : null,
			principlesDetails : null,

		}]

		return (
			<div>
				{
					selectedAwards  ?
					<div>
					 <AwardFragment
					 	selectedId = { selectedId }
					  awardData = { awardData }
						selectedAwards = { (selectedAwards) => this.setState({selectedAwards}) }/>
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
								<img
									height = { '20' }
									width = { '20' }
									src = { require('../../images/rewards/Rewards-Orange.png') }/>
								<h4 className={'myreward-orange-text align-left font-weight-lighter'}>My Reward </h4>
								<h4 className={'myreward-orange-text align-right'}>{ rewardPoints && format(rewardPoints) }</h4>
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
