import { ADD_EDUCATION, ADD_CERTIFICATE, ADD_EXPERIENCE, ADD_SKILLS, ADD_ABOUTME,
  REMOVE_EDUCATION, REMOVE_CERTIFICATE, REMOVE_EXPERIENCE, REMOVE_SKILLS, REMOVE_ABOUTME } from '../utils/actionUtil'

export function addEducation (onboardingObj) {
  return { type: ADD_EDUCATION, onboardingObj }
}

export function addCertificate (onboardingObj) {
  return { type: ADD_CERTIFICATE, onboardingObj }
}

export function addExperience (onboardingObj) {
  return { type: ADD_EXPERIENCE, onboardingObj }
}

export function addSkills (onboardingObj) {
  return { type: ADD_SKILLS, onboardingObj }
}

export function removeEducation (onboardingObj) {
  return { type: ADD_ABOUTME, onboardingObj }
}

export function removeCertificate (onboardingObj) {
  return { type: ADD_ABOUTME, onboardingObj }
}

export function removeExperience (onboardingObj) {
  return { type: ADD_ABOUTME, onboardingObj }
}

export function removeSkills (onboardingObj) {
  return { type: ADD_ABOUTME, onboardingObj }
}

export function removeAboutMe (onboardingObj) {
  return { type: ADD_ABOUTME, onboardingObj }
}
