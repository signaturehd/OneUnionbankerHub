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
import GiftDetailsFooterComponent from './components/GiftDetailsFooterComponent'

// Modal
import GiftDetailsCheckoutModal from './modals/GiftDetailsCheckoutModal'
// import GiftDetailsMapComponent from './components/GiftDetailsMapComponent'

// Fragment
import GiftDetailsCheckoutFragment from './fragments/GiftDetailsCheckoutFragment'

class GiftsDetailsFragment extends BaseMVPView {
	constructor (props) {
		super(props)
		this.state = {
			loader : false,
			showCheckoutModal : false,
			showCheckoutFragment : false,
			selectedRewardsArray : []
		}
	}

	componentDidMount () {
    const id = this.props.match.params.id
    this.presenter.getRewardGiftsDetails(id)
	}

	circularLoader (loader) {
		this.setState({ loader })
	}

	setRewardGiftsDetails (rewardDetails) {
		this.setState({ rewardDetails })
	}

	render () {
		const { history } = this.props
		const {
			loader,
			rewardDetails,
			showCheckoutModal,
			showCheckoutFragment,
			selectedRewardsArray
		} = this.state
		console.log(selectedRewardsArray)
		return (
			<div>
				{
					showCheckoutModal &&

					<GiftDetailsCheckoutModal
						selectedRewardsArray = { selectedRewardsArray }
						onClose = { () => this.setState({ showCheckoutModal : false }) }
						onSelectThis = { () =>
							this.setState({
								showCheckoutFragment : true,
								showCheckoutModal : false,
							}) }
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
								/>
							:
							<div>
								<GiftDetailsBannerComponent
									tagline = { rewardDetails && rewardDetails.tagline }
									name = { rewardDetails && rewardDetails.name }
									category = { rewardDetails && rewardDetails.category }
									locations = { rewardDetails && rewardDetails.locations }
									longtitude = { rewardDetails && rewardDetails.locations[0].longtitude }
									latitude = { rewardDetails && rewardDetails.locations[0].latitude }
								/>
								<GiftDetailsEgiftComponent
									onCheckOutModal = { (showCheckoutModal, selectedRewardsArray) =>
										{
											this.setState({ showCheckoutModal, selectedRewardsArray })
										}
									}
									denominations = { rewardDetails && rewardDetails.denominations }
								/>
								<GiftDetailsAboutComponent
									name = { rewardDetails && rewardDetails.name }
									writeup = { rewardDetails && rewardDetails.writeup }
									recommendations = { rewardDetails && rewardDetails.highlights }
								/>
								<GiftDetailsFooterComponent
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
