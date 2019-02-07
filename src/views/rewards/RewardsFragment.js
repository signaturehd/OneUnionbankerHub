import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/RewardsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import { Card, GenericButton, CircularLoader } from '../../ub-components'
import NoticeResponseModal from '../notice/NoticeResponseModal'

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
			showNoticeModal: false,
			enabledLoader: false,
			searchString: '',
			orNumberErrorMessage: '',
      employeeName: 'test',
      enabledCircularLoader : false,
			selectAllIsChecked: false
		}
	}

	componentDidMount () {
		this.props.setSelectedNavigation(9)
		this.presenter.getRewardAwards()
		this.presenter.getRewardPoints()
    this.presenter.getRewardList()
    this.presenter.getAwardData()
    this.presenter.getRedeemData()
	}

	setRecognizedRewards (recognizedAwards) {
		this.setState({ recognizedAwards })
	}

	setRewardPoints (rewardPoints) {
		this.setState({ rewardPoints })
	}

	showSuccessMessage (successMessage) {
		this.setState({ successMessage, showNoticeModal: true })
	}

  showLoading (enabledLoader) {
    this.setState({ enabledLoader })
  }

  setValidateAlphabet (employeeMessage) {
    this.setState({ employeeMessage })
  }

	sendData () {
		const {
			selectedId,
			employeeName,
			employeeMessage,
		} = this.state
		this.presenter.submitAwards(
			selectedId,
			employeeName,
			employeeMessage
		)
	}

  searchData (searchString) {
    this.presenter.getEligibleInRewards(this.state.selectedId, searchString)
  }

  showLoadingCircular (enabledCircularLoader) {
    this.setState({ enabledCircularLoader })
  }

  setEmployeeList (membersData) {
    this.setState({ membersData })
  }

  storedEmployeeList (employeeList) {
    this.setState({ employeeList })
  }

  setAwardData (awardData) {
    this.setState({ awardData })
  }

  setRewardList (rewardList) {
    this.setState({ rewardList })
  }

  setRedeemData (redeemData) {
    this.setState({ redeemData })
  }

	setAllEmployeeSelectBool (selectAllIsChecked) {
		this.setState({ selectAllIsChecked })
	}

  resetData () {
    this.setState({ membersData: [], employeeList : [], searchString : '', employeeMessage: '' })
  }

	render () {
		const { history, profileHasCOC } = this.props
		const {
			rewardPoints,
			recognizedAwards,
			selectedId,
			selectedAwards,
			employeeName,
			employeeMessage,
			successMessage,
			showNoticeModal,
			orNumberText,
			orNumberErrorMessage,
      enabledLoader,
      searchString,
      membersData,
      enabledCircularLoader,
      rewardList,
      awardData,
      redeemData,
			employeeList,
			selectAllIsChecked
		} = this.state

		return (
			<div>
			{
				showNoticeModal &&
				<NoticeResponseModal
  				noticeResponse = { successMessage }
  				onClose = { () =>
  					this.setState({
  						showNoticeModal: false,
  						selectedAwards: false,
  						employeeName: '',
  						employeeMessage: '' })
          }/>
  			}
        <div>
          <div>
            {
              enabledLoader ?

              <CircularLoader
                validateLoading = { true }
                show = { enabledLoader }
                />

              :
              <div>
                {
                  selectedAwards  ?
                  <div>
                     <AwardFragment
											employeeList = { employeeList }
                      enabledCircularLoader = { enabledCircularLoader }
                      searchString = { searchString }
                      onChangeDataFunc = { (e) => this.setState({ searchString : e }) }
                      searchFunc = { () => this.searchData(searchString) }
                      membersData = { membersData }
											deleteEmployeeToList = { (key, id) =>
												this.presenter.setDeleteEmployeeToList(key, id, selectedId) }
                      membersDataFunc = { (data) => {
												this.presenter.receiveEmployeeListData(data, membersData, employeeList, selectedId)
                        // this.presenter.setEmployeeId(data)
                      } }
                      selectedId = { selectedId }
											selectAllIsChecked = { selectAllIsChecked }
                      awardData = { awardData }
											selectAllEmployee = { () => this.presenter.setSelectAllEmployee(selectAllIsChecked, membersData, selectedId) }
                      selectedAwards = { (selectedAwards) => {
												this.setState({ selectedAwards })
												this.resetData()
											} }
                      onSubmitAwards = { () => this.sendData() }
                      employeeName = { employeeName }
                      employeeMessage = { employeeMessage }
                      setEmployeeName = { (employeeName) => this.setState({employeeName}) }
                      setEmployeeMessage = { (e) => this.presenter.validateAlphabet(e) }
                      orNumberErrorMessage = { orNumberErrorMessage }/>
                  </div>
                   :
                  <div className={'myreward-grid-container'}>
                    <div></div>
                    <div className={'myrewards-container'} >
                      <div>
                        <h2 className={'header-margin-default text-align-left '}>My Rewards</h2>
                        <p> Gather and redeem your points</p>
                      </div>
                      <div className={'myreward-orange-color'}>
                        <img
                          height = { '20' }
                          width = { '20' }
                          src = { require('../../images/rewards/Rewards-Orange.png') }/>
                        <h4 className={'myreward-orange-text align-left font-weight-lighter'}>My Reward </h4>
                        <h4 className={'myreward-orange-text text-align-right'}>{ rewardPoints && format(rewardPoints) }</h4>
                      </div>
                      <div>
                        <h2 className={'header-margin-default text-align-left'}> Recognize a Unionbanker </h2>
                        <h6> Celebrate those who own the future and drive innovation </h6>
                      </div>
                      <div className={'myrewards-adjustment'}>
                        <div className={'myrewards-card-container'}>
                          {
                            rewardList&&rewardList.map((value, idx) => (
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
                                </div>
                              </Card>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                    {
                      <RewardRedeemFragment
												redeemData = {redeemData}
												history = {history} />
                    }
                    <div></div>
                  </div>
                }
              </div>
            }
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

export default ConnectView(RewardsRecognitionFragment, Presenter)
