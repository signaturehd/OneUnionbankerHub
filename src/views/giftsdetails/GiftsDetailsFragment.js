import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/GiftDetailsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import './styles/giftDetails.css'

import { CircularLoader, Line, GenericButton } from '../../ub-components/'

import NoDataListedComponent from '../common/components/NoDataListedComponent'
import GiftDetailsBannerComponent from './components/GiftDetailsBannerComponent'
import GiftDetailsEgiftComponent from './components/GiftDetailsEgiftComponent'
import GiftDetailsAboutComponent from './components/GiftDetailsAboutComponent'
// Modal
import GiftDetailsCheckoutModal from './modals/GiftDetailsCheckoutModal'
// import GiftDetailsMapComponent from './components/GiftDetailsMapComponent'

// Fragment
import GiftDetailsCheckoutFragment from './fragments/GiftDetailsCheckoutFragment'
import moment from 'moment'

let temTotalPoints

class GiftsDetailsFragment extends BaseMVPView {
	constructor (props) {
		super(props)
		this.state = {
			loader : false,
			showCheckoutModal : false,
			showCheckoutFragment : false,
			totalPoints : 0,
			valueText : '',
			valueAmountText : '',
			mode: 2,
		}
	}

	componentDidMount () {
		let id = this.props.match.params.id
    this.presenter.getRewardGiftsDetails(id)
    this.presenter.getRewardPoints()
	}

	setSelectedGiftList (selectedRewardsArray) {
		this.setState({ selectedRewardsArray })
	}

	circularLoader (loader) {
		this.setState({ loader })
	}

	setRewardGiftsDetails (rewardDetails) {
		this.setState({ rewardDetails })
	}

	setRewardPoints (totalPoints) {
		temTotalPoints = totalPoints
		this.setState({ totalPoints })
	}

	getComputation (valueText, valuePoints) {
		const {
			totalPoints
		} = this.state
		let calculation
		let currentPoints = totalPoints
		let computePoints = parseInt(valuePoints) * parseInt(valueText) * 20
		let totalPointsTemp = totalPoints - computePoints
		if(totalPointsTemp <= totalPoints) {
			this.setState({ totalPoints: totalPointsTemp, valueText })
		} else {
			this.setState({ totalPoints: temTotalPoints, valueText })
		}
	}

	getAmountComputation (valueAmountText) {
		const {
			totalPoints,
			valueText
		} = this.state

		let calculation
		let currentPoints = totalPoints
		let computePoints = parseInt(valueAmountText) * parseInt(valueText) * 20
		let totalPointsTemp = totalPoints - computePoints
		if(totalPointsTemp <= totalPoints) {
			this.setState({ totalPoints: totalPointsTemp, valueAmountText, valueText })
		} else {
			this.setState({ totalPoints: temTotalPoints, valueAmountText, valueText })
		}
	}

	getQuantity (valueText) {
		this.setState({ valueText })
	}

	render () {
		const { history } = this.props
		const {
			loader,
			rewardDetails,
			showCheckoutModal,
			showCheckoutFragment,
			selectedRewardsArray,
			selectedGifts,
			showGiftCartFragment,
			totalPoints,
			valueText,
			valueAmountText,
			mode,
		} = this.state

		return (
			<div>
				{
					showCheckoutModal &&

					<GiftDetailsCheckoutModal
						totalPoints = { totalPoints }
						valueText = { valueText }
						valueTextFunc = { (valueText, value) => {
							this.getComputation(valueText, value)
						} }
						valueAmountText = { valueAmountText }
						valueAmountTextFunc = { (valueAmountText, value) => {
							this.getAmountComputation(valueAmountText, value)
						} }
						valueAmountFunc = { (quantity) => {
							this.getQuantity(quantity)
						} }
						selectedRewardsArray = { selectedGifts }
						onClose = { () =>
							this.setState({
								showCheckoutModal : false,
								valueText : '',
								valueAmountText : ''
							})
						}
						onSelectThis = { (list, value) => {
							this.presenter.getGiftsList(value)
							this.setState({
								showCheckoutModal : false,
								valueText : '',
								valueAmountText : ''
							})
						}}
						/>
				}
				{
					loader ?
					<CircularLoader
						validateLoading = { true }
						show = { loader }/>
					:
					<div>
						{
							showCheckoutFragment ?
							<GiftDetailsCheckoutFragment
								deleteSelectedGifts = { (id, key) => {
									try {
										this.presenter.setDeleteSelectedGifts(id, key)
									} catch (e) {
										console.log(e)
									}
								} }
								onCheckoutTransaction = { () => this.presenter.addRewardGiftsDenominations(mode, this.props.match.params.id) }
								subTotalPoints = { totalPoints }
								selectedRewardsArray = { selectedRewardsArray }
								hasCustom = { rewardDetails && rewardDetails.hasCustom }
								name = { rewardDetails && rewardDetails.name }
								backToList = { () => this.setState({ showCheckoutFragment : false }) }
							/>
						:
							<div>
								<GiftDetailsBannerComponent
									totalPoints = { totalPoints }
									showGiftCart = { () => this.setState({ showCheckoutFragment : true })}
									tagline = { rewardDetails && rewardDetails.tagline }
									name = { rewardDetails && rewardDetails.name }
									logo = { rewardDetails && rewardDetails.logo }
									category = { rewardDetails && rewardDetails.category }
									locations = { rewardDetails && rewardDetails.locations }
									longtitude = { rewardDetails && rewardDetails.locations[0].longtitude }
									latitude = { rewardDetails && rewardDetails.locations[0].latitude }
								/>
								<GiftDetailsEgiftComponent
									totalPoints = { totalPoints }
									onCheckOutModal = { (showCheckoutModal, selectedGifts) =>
										{
											this.setState({ showCheckoutModal, selectedGifts })
										}
									}
									denominations = { rewardDetails && rewardDetails.denominations }
									hasCustom = { rewardDetails && rewardDetails.hasCustom }
								/>
								<GiftDetailsAboutComponent
									name = { rewardDetails && rewardDetails.name }
									writeup = { rewardDetails && rewardDetails.writeup }
									recommendations = { rewardDetails && rewardDetails.highlights }
								/>
							</div>
						}

					</div>
				}
			</div>
		)
	}
}

GiftsDetailsFragment.propTypes = {
	setSelectedNavigation: PropTypes.func,
}

export default ConnectView(GiftsDetailsFragment, Presenter)
