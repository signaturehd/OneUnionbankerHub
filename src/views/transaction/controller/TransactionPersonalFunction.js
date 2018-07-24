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

  export function checkedCreditRatio (ration) {
    return ration && ration.CreditRatio ? ration && ration.CreditRatio : '(Not Yet Provided)'
  }

  export function checkPurposeName (purposeTerm) {
    return purposeTerm && purposeTerm.Term ? purposeTerm && purposeTerm.Term && purposeTerm.Term.Name : '(Not Yet Provided)'
  }

  export function checkedTerm (term) {
    return term && term.Term ? term && term.Term && term.Term.Term : '(Not Yet Provided)'
  }

  /* Calamity Assistance  */

  export function checkedCalamityType (type) {
    return type && type.CalamityType ? type && type.CalamityType && type.CalamityType.Calamity : '(Not Yet Provided)'
  }

  export function checkedProperty (property) {
    return property &&
           property.DamageProperty.PropertyName ?
              property &&
              property.DamageProperty &&
              property.DamageProperty.PropertyName
              : '(Not Yet Provided)'
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
