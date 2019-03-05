import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/GiftsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import './styles/GiftsStyle.css'
import { CircularLoader, Line, GenericButton } from '../../ub-components/'

import NoDataListedComponent from '../common/components/NoDataListedComponent'
import GiftsBanner from './components/GiftsBanner'
import GiftsListComponent from './components/GiftsListComponent'
import GiftsCheckout from './components/GiftsCheckout'

class GiftsFragment extends BaseMVPView {
	constructor (props) {
		super(props)
		this.state = {
			loader : false,
			filterTitle : 'everything',
			rewardGiftsId : [],
			showGiftsCart : false
		}
	}

	componentDidMount () {
    this.presenter.getRewardGifts()
	}

	setRewardGifts (rewardGifts) {
		this.getGiftsId(rewardGifts)
		this.setState({ rewardGifts })
	}

	chceckImage (image, filterTitle) {
		if (image.toLowerCase() === 'everything') {
			if(image.toLowerCase() === filterTitle.toLowerCase()) {
				return require('../../images/rewards/everything-orange.png')
			} else {
				return require('../../images/rewards/everything-grey.png')
			}
		} else if (image.toLowerCase() === 'food') {
			if(image.toLowerCase() === filterTitle.toLowerCase()) {
				return require('../../images/rewards/food-orange.png')
			} else {
				return require('../../images/rewards/food-grey.png')
			}
		} else if (image.toLowerCase() === 'service') {
			if(image.toLowerCase() === filterTitle.toLowerCase()) {
				return require('../../images/rewards/service-orange.png')
			} else {
				return require('../../images/rewards/service-grey.png')
			}
		} else if (image.toLowerCase() === 'travel & leisure') {
			if(image.toLowerCase() === filterTitle.toLowerCase()) {
				return require('../../images/rewards/travel-&-leisure-orange.png')
			} else {
				return require('../../images/rewards/travel-&-leisure-grey.png')
			}
		} else if (image.toLowerCase() === 'health & wellness') {
			if(image.toLowerCase() === filterTitle.toLowerCase()) {
				return require('../../images/rewards/health-&-wellness--orange.png')
			} else {
				return require('../../images/rewards/health-&-wellness-grey.png')
			}
		} else if (image.toLowerCase() === 'shop') {
			if(image.toLowerCase() === filterTitle.toLowerCase()) {
				return require('../../images/rewards/shop-orange.png')
			} else {
				return require('../../images/rewards/shop-grey.png')
			}
		} else if (image.toLowerCase() === 'entertainment') {
			if(image.toLowerCase() === filterTitle.toLowerCase()) {
				return require('../../images/rewards/entertainment-orange.png')
			} else {
				return require('../../images/rewards/entertainment-grey.png')
			}
		}
	}

	getGiftsId (gifts) {
		try {
			let listId = [...this.state.rewardGiftsId]
			gifts && gifts.map((resp) => {
				listId.push(resp.id)
			})
			this.setState({ rewardGiftsId : listId })
		} catch (e) {
			 console.log(e)
		}
	}

	setCategoryTypeList (rewardGiftsType) {
		this.setState({ rewardGiftsType })
	}

	circularLoader (loader) {
		this.setState({ loader })
	}

	render () {
		const { history } = this.props
		const {
			rewardGifts,
			rewardGiftsId,
			loader,
			rewardGiftsType,
			filterTitle,
			showGiftsCart
		} = this.state

		return (
			<div className={ 'gifts-container' }>
			{
				showGiftsCart ?
				<div>
					<GiftsCheckout/>
				</div>
				:
				<center>
					<div className = { 'text-align-left' }>
						<GenericButton
							className = { 'cursor-pointer global-button profile-button-small' }
							text = { 'back' }
							onClick = { () => history.push('/myrewards') }
						/>
					</div>
					<div className={ 'gifts-main-item1' }>
						<GiftsBanner
							history = { history }
							showGiftCart = { (e)=> {
								this.setState({ showGiftsCart : e })
							} }/>
					</div>
					<div className={ 'gifts-main-item2' }>
					</div>
					<div className={ 'gifts-main-item3' }>
					{
						loader ?
						<CircularLoader
							show = { loader }
							validateLoading = { true }
						/>
						:
						<div className = { 'gifts-grid-columnt-3x' }>
							<div></div>
							<div>
								<div>
									{
										filterTitle.toLowerCase() === 'everything' ?
										<div className = { 'gifts-title-list' }>
											{
												rewardGiftsType &&
												rewardGiftsType.map((resp, key) =>
													<center>
														<img
															height = { 50 }
															width = { 'auto' }
															onClick = { () => this.setState({ filterTitle : resp }) }
															src = { this.chceckImage(resp, filterTitle) }
															className = { 'cursor-pointer' }/>
													</center>
												)
											}
										</div> :
										<div
											style = {{
													display: 'flex',
													textAlign: 'center',
													margin: 'auto',
												}}>
											{
												rewardGiftsType &&
												rewardGiftsType.map((resp, key) =>
												<center>
													<img
														width = { 'auto' }
														height = { 50 }
														onClick = { () => this.setState({ filterTitle : resp }) }
														src = { this.chceckImage(resp, filterTitle) }
														className = { 'cursor-pointer' }/>
												</center>
												)
											}
										</div>
									}
								</div>
								<Line />
								<br/>
								<br/>
								<center>
									<br/>
									<h4 className = { 'gifts-title-feature' }>Features</h4>
									<br/>

								</center>
				        {
									rewardGifts &&
				          rewardGifts.length !== 0 ?
									<div>
										{
											filterTitle.toLowerCase() === 'everything' ?
											<div className = { 'gifts-grid-x4' }>
							          {
													rewardGifts.map((resp, key) =>
														<GiftsListComponent
															rewardGiftsId = { rewardGiftsId }
															resp = { resp }
															knowMoreClick = { (id) => history.push(`/rewardgifts/details/${id}`) }
														/>
													)
												}
											</div> :
											<div className = { 'gifts-grid-x4' }>
							          {
													rewardGifts.map((resp, key) =>
													 filterTitle.toString().toLowerCase() === resp.category.toString().toLowerCase() &&
														<GiftsListComponent
															rewardGiftsId = { rewardGiftsId }
															resp = { resp }
															knowMoreClick = { (id) => history.push(`/rewardgifts/details/${id}`) }
														/>
													)
												}
											</div>
										}
									</div>
									:
									<NoDataListedComponent
										text = { 'No Reward/s' }
										/>
								}
							</div>
							<div></div>
						</div>
					}
					</div>
			  </center>
			}
			</div>

		)
	}
}

GiftsFragment.propTypes = {
	setSelectedNavigation: PropTypes.func,
	profileHasCOC: PropTypes.boolean,
}

export default ConnectView(GiftsFragment, Presenter)
