import { SET_PROFILE_PICTURE } from '../utils/actionUtil'

export function setProfilePicture (profilePicture) {
  return  { type : SET_PROFILE_PICTURE, profilePicture }
}
