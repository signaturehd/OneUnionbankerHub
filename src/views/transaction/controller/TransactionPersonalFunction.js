import moment from 'moment'
import { format } from '../../../utils/numberUtils'

  /* Medical */
  export function checkedDateFilled (details) {
    return details ?
           details &&
           moment(details && details.dateFiled).format('dddd, MMMM d, YYYY, h:MM:ss A') : '(Not Yet Provided)'
  }

  export function checkedAccountNumber (details) {
    return details && details.AccountNo ? details && details.AccountNo : '(Not Yet Provided)'
  }

  export function  checkedReferenceNumber (details) {
    return details && details.ReferenceNumber ? details && details.ReferenceNumber : '(Not Yet Provided)'
  }

  export function checkedPatient (patient) {
    return patient && patient.Recipient ? patient && patient.Recipient : '(Not Yet Provided)'
  }

  /* Multi Purpose Loan */
  export function checkedPurposeOfAvailement (poa) {
    return poa && poa.PurposeOfAvailment ? poa && poa.PurposeOfAvailment : '(Not Yet Provided)'
  }

  export function checkedModeOfLoan (mode) {
    return mode && mode.ModeOfLoan ? mode && mode.ModeOfLoan :  '(Not Yet Provided)'
  }

  export function checkedAmortization (amortization) {
    return amortization && amortization.Amortization ? format(amortization && amortization.Amortization) : '(Not Yet Provided)'
  }

  export function checkedDesiredAmount (desiredAmount) {
    return desiredAmount && desiredAmount.DesiredAmount ? format(desiredAmount && desiredAmount.DesiredAmount) : '(Not Yet Provided)'
  }

  export function checkedCreditRatio (details) {
    return details && details.Term ? details && details.Term && details.Term.Rate : '(Not Yet Provided)'
  }

  export function checkPurposeName (details) {
    return details && details.Term ? details && details.Term && details.Term.Name : '(Not Yet Provided)'
  }

  export function checkedTerm (details) {
    return details && details.Term ? details && details.Term && details.Term.Term : '(Not Yet Provided)'
  }

  export function indexDecreased (index) {
    if(Number(index) === 4) {
      return index
    } else {
      return index - 4
    }
  }

  export function indexIncreased (index) {
    return index + 4
  }

  export function checkedBenefitStatus (detailStatus) {
    if(detailStatus === 'cancelled') {
      return 'cancel'
    } else if (detailStatus === 'for crediting') {
      return 'crediting'
    } else if (detailStatus === 'credited') {
      return 'credited'
    } else if (detailStatus === 'for reconciliation') {
      return 'reconciliation'
    } else if (detailStatus === 'cleared') {
      return 'clear'
    } else if (detailStatus === 'for processing') {
      return 'process'
    }
  }
