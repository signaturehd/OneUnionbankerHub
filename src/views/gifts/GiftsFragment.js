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

	chceckImage (image) {
		if (image.toLowerCase() === 'everything') {
			return require('../../images/rewards/everything-grey.png')
		} else if (image.toLowerCase() === 'food') {
			return require('../../images/rewards/food-grey.gif')
		} else if (image.toLowerCase() === 'service') {
			return require('../../images/rewards/service-grey.gif')
		} else if (image.toLowerCase() === 'travel & leisure') {
			return require('../../images/rewards/travel-&-leisure-grey.gif')
		} else if (image.toLowerCase() === 'health & wellness') {
			return require('../../images/rewards/health-&-wellness-grey.gif')
		} else if (image.toLowerCase() === 'shop') {
			return require('../../images/rewards/shop-grey.gif')
		} else if (image.toLowerCase() === 'entertainment') {
			return require('../../images/rewards/entertainment-grey.gif')
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
					<div className={ 'gifts-main-item1' }>
						<GiftsBanner
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
													<img
														height = { 50 }
														width = { 120 }
														onClick = { () => this.setState({ filterTitle : resp }) }
														src = { this.chceckImage(resp) }
														className = { 'cursor-pointer' }/>
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
												<img
													width = { 120 }
													height = { 50 }
													onClick = { () => this.setState({ filterTitle : resp }) }
													src = { this.chceckImage(resp) }
													className = { 'cursor-pointer' }/>
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
