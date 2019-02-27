import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/GiftDetailsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import './styles/giftDetails.css'

import { CircularLoader, Line, GenericButton } from '../../ub-components/'

import * as validate from './functions/GiftDetailsFunctions'

import NoDataListedComponent from '../common/components/NoDataListedComponent'
import GiftDetailsBannerComponent from './components/GiftDetailsBannerComponent'
import GiftDetailsEgiftComponent from './components/GiftDetailsEgiftComponent'
import GiftDetailsAboutComponent from './components/GiftDetailsAboutComponent'
// Modal
import GiftDetailsCheckoutModal from './modals/GiftDetailsCheckoutModal'
// import GiftDetailsMapComponent from './components/GiftDetailsMapComponent'

// Fragment
import GiftDetailsCheckoutFragment from './fragments/GiftDetailsCheckoutFragment'

import NoticeResponseModal from '../notice/NoticeResponseModal'
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
			showResponseModal: false,
			noticeResponse: '',
			disabled: false,
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

	noticeResponse (noticeResponse) {
		this.setState({ noticeResponse, showResponseModal: true, showCheckoutFragment : false })
	}

	resetData () {
		this.setState({ valueText : '', valueAmountText : '' })
	}

	getComputation (valueText, valuePoints) {
		const {
			totalPoints
		} = this.state
		let value = validate.checkedValidateNumberInput(valueText)
		let calculation
		let currentPoints = totalPoints
		let computePoints = parseInt(valuePoints) * parseInt(value) * 20
		if(computePoints <= currentPoints) {
			let totalPointsTemp = currentPoints - computePoints
			if(currentPoints > 0) {
				this.setState({ totalPoints: totalPointsTemp, valueText: value, disabled: false })
			}
		} else {
			this.setState({ totalPoints: temTotalPoints, valueText: value, disabled: true })
		}
	}

	getAmountComputation (valueAmountText) {
		const {
			totalPoints,
		} = this.state

		let value = validate.checkedValidateNumberInput(valueAmountText)
		let calculation
		let currentPoints = totalPoints
		let computePoints = parseInt(valueAmountText) * parseInt(valueAmountText) * 20
		if(computePoints <= currentPoints) {
			let totalPointsTemp = currentPoints - computePoints
			if(currentPoints > 0) {
				this.setState({ totalPoints: totalPointsTemp, valueAmountText: value, disabled: false })
			}
		} else {
			this.setState({ totalPoints: temTotalPoints, valueAmountText: value, disabled: true })
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
			showResponseModal,
			noticeResponse,
			disabled,
		} = this.state

		return (
			<div>
				{
					showCheckoutModal &&

					<GiftDetailsCheckoutModal
						totalPoints = { totalPoints }
						disabled = { disabled }
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
								valueAmountText : '',
								totalPoints: temTotalPoints,
							})
						}
						onSelectThis = { (list, value) => {
							try {
								this.presenter.getGiftsList(value)
								this.setState({
									showCheckoutModal : false,
									valueText : '',
									valueAmountText : ''
								})
							} catch (e) {
								console.log(e)
							}
						}}
						/>
				}
				{
					showResponseModal &&
					<NoticeResponseModal
						noticeResponse = { noticeResponse }
						onClose = { () => {
							this.setState({ showResponseModal : false })
							this.resetData()
							history.push('/myrewards')
							this.props.getProfileFunc()
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
									history = { history }
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
