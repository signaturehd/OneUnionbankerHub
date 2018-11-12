import { SET_PROFILE_PICTURE } from '../utils/actionUtil'
import initialState from './initialState'

export default function reducer (state = initialState.profilePicture, action) {
  switch (action.type) {
    case SET_PROFILE_PICTURE:
      return (state, action.profilePicture)
    default:
      return state
  }
}
