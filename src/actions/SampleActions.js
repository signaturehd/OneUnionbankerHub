import { SAMPLE_ACTION } from '../utils/actionUtil'

export function changeSampleState (sampleState) {
  return { type: SAMPLE_ACTION, sampleState }
}
