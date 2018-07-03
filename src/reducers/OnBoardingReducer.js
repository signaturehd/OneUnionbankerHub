import { ADD_EDUCATION, ADD_SKILLS, ADD_ABOUTME, ADD_CERTIFICATE, ADD_EXPERIENCE,
  REMOVE_SKILLS, REMOVE_EDUCATION, REMOVE_ABOUTME, REMOVE_CERTIFICATE, REMOVE_EXPERIENCE } from '../utils/actionUtil'

import initialState from './initialState'

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ADD_EDUCATION:
      return { ...state, onboardingEduation: action.onboardingObj }

    case ADD_SKILLS:
      return { ...state, onBoardingSkills: action.onboardingObj }

    case ADD_ABOUTME:
        return { ...state, onBoardingAboutMe: action.onboardingObj }

    case ADD_CERTIFICATE:
        return { ...state, onBoardingCertificate: action.onboardingObj }

    case ADD_EXPERIENCE:
        return { ...state, onBoardingExperience: action.onboardingObj }

    case REMOVE_EDUCATION:
      return { ...state, formval: [...formval, action.onboardingObj] }

    case REMOVE_SKILLS:
      return { ...state, formval: [...formval, action.onboardingObj] }

    case REMOVE_ABOUTME:
      return { ...state, formval: [...formval, action.onboardingObj] }

    case REMOVE_CERTIFICATE:
      return { ...state, formval: [...formval, action.onboardingObj] }

    case REMOVE_EXPERIENCE:
      return { ...state, formval: [...formval, action.onboardingObj] }

    default:
      return state
  }
}
