import moment from 'moment'
import { format } from '../../../utils/numberUtils'

  /* Default Amount View (e.g) P 2,000.00 */

  export function checkedAmountFormat (amount) {
    return amount && amount ? format(amount) :  '(Not Yet Provided)'
  }

  /* (e.g) Friday, July 5, 2018, 1:07:18 PM*/
  export function checkedDateFilled (details) {
    return details ?
           details &&
           moment(details && details.dateFiled).format('dddd, MMMM DD, YYYY, hh:mm:ss A') : '(Not Yet Provided)'
  }

  /* (e.g) July 5, 2018 */
  export function checkedMDYDate (date) {
    return date ?
           date &&
           moment(date).format('MMM DD, YYYY') : '(Not Yet Provided)'
  }

  /* Medical */
  export function checkedAccountNumber (details) {
    return details && details.AccountNo ? details && details.AccountNo : ''
  }

  export function checkReleasingCenter (details) {
    return details && details.ReleasingCenter ? details && details.ReleasingCenter : ''
  }

  export function  checkedReferenceNumber (details) {
    return details && details.ReferenceNumber ? details && details.ReferenceNumber : '(No Reference Number)'
  }

  export function checkedPatient (patient) {
    return patient && patient.Recipient ? patient && patient.Recipient : '(No Recipient)'
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
    return  term &&
            term.Term &&
            term.Term.Term ? term.Term.Term
            :
            '(Not Yet Provided)'
  }

  export function checkedRate (rate)  {
    return rate && rate.Term && rate.Term.Rate ? rate.Term.Rate : '(Not Yet Provided)'
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

  /* Bereavement Assistance */

  export function checkedDependent (dependent) {
    return dependent &&
           dependent.BereavementDetails &&
           dependent.BereavementDetails.Dependent &&
           dependent.BereavementDetails.Dependent.Name ?
           dependent.BereavementDetails.Dependent.Name :
           '(Not Yet Provided)'
  }

  export function checkedRelationship (relationship) {
    return relationship &&
           relationship.BereavementDetails &&
           relationship.BereavementDetails.Dependent &&
           relationship.BereavementDetails.Dependent.Relationship ?
           relationship.BereavementDetails.Dependent.Relationship :
           '(Not Yet Provided)'
  }

  export function checkedHome (funeral) {
    return funeral &&
           funeral ?
           funeral :
           '(Not Yet Provided)'
  }

  export function checkedAddress (address) {
    return address &&
           address ?
           address : '(Not Yet Provided)'
  }

  export function checkRegion (region) {
    return region &&
           region ?
           region : '(Not Yet Provided)'
  }

  export function checkCity (city) {
    return city &&
           city ?
           city : '(Not Yet Provided)'
  }

  export function checkProvince (province) {
    return province &&
           province ?
           province : '(Not Yet Provided)'
  }

  export function indexDecreased (index) {
    if(Number(index) === 3) {
      return index
    } else {
      return index - 3
    }
  }

  export function indexIncreased (index) {
    return index + 3
  }

  /* Education  */
  export function checkedCourse (course) {
    return course && course.Course ? course.Course: '(Not Yet Provided)'
  }

  export function checkedCollege (school) {
    return school &&
           school.College ?
           school.College :
           '(Not Yet Provided)'
  }

  export function checkedAcademicyear (year) {
    return year &&
           year.AcademicYear ?
           year.AcademicYear :
           '(Not Yet Provided)'
  }

  export function checkedSemester (semester) {
    return semester &&
           semester.Semester ?
           semester.Semester :
           '(Not Yet Provided)'
  }

  export function checkedGrant (grant) {
    return grant &&
           grant.Grant &&
           grant.Grant.Name ?
           grant.Grant.Name :
           '(Not Yet Provided)'
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
    } else if (detailStatus === 'confirmed') {
      return 'confirmed'
    } else if (detailStatus === 'for confirmation') {
      return 'confirmation'
    } else {
      return 'not transaction'
    }
  }

  /* Maternity Assistance */

export function checkedType (details) {
  return details && details.MaternityAssistanceDetails.DeliveryType ?
  details.MaternityAssistanceDetails.DeliveryType :
  '(Not Yet Provided)'
}

export function checkedAmount (details) {
  return  details && details.MaternityAssistanceDetails &&
          details.MaternityAssistanceDetails.Amount ?
          format(details.MaternityAssistanceDetails.Amount) :
          '(Not Yet Provided)'
}

export function checkedorNumber (details) {
  return  details && details.MaternityAssistanceDetails &&
          details.MaternityAssistanceDetails.ReceiptNumber ?
          details.MaternityAssistanceDetails.ReceiptNumber :
          '(No Receipt Number)'
}

export function checkedDeliveryDate (details) {
  return details && details.MaternityAssistanceDetails.DeliveryDate ?
  moment(details.MaternityAssistanceDetails.DeliveryDate).format('MMM DD, YYYY') :
  '(Not Yet Provided)'
}

export function checkedORDate (details) {
  return details && details.MaternityAssistanceDetails.ORDate ?
  moment(details.MaternityAssistanceDetails.ORDate).format('MMM DD, YYYY') :
  '(No Official Receipt Date)'
}

export function checkedRecipient (details) {
  return details && details.MaternityAssistanceDetails.Recipient ?
  details.MaternityAssistanceDetails.Recipient :
  '(Not Yet Provided)'
}

/* Car Leases */
export function checkedCarBrand (details) {
  return details &&
         details.CarDetails &&
         details.CarDetails.Brand ?
         details.CarDetails.Brand : '(Not Yet Provided)'
}

export function checkedModel (details) {
  return details &&
         details.CarDetails &&
         details.CarDetails.Model ?
         details.CarDetails.Model : '(Not Yet Provided)'
}

export function checkedLeaseMode (details) {
  return details &&
         details.CarDetails &&
         details.CarDetails.LeaseMode ?
         details.CarDetails.LeaseMode : '(Not Yet Provided)'
}

export function checkedInsurancePayment (details) {
  return details &&
         details.CarDetails &&
         details.CarDetails.InsurancePayment ?
         details.CarDetails.InsurancePayment : '(Not Yet Provided)'
}

export function checkedEquityAmount (details) {
  return details &&
         details.CarDetails &&
         details.CarDetails.EquityAmount ?
         format(details.CarDetails.EquityAmount) : '(Not Yet Provided)'
}

export function checkedCarAmount (details) {
  return details &&
         details.CarDetails &&
         details.CarDetails.Amount ?
         format(details.CarDetails.Amount) : '(Not Yet Provided)'
}

//return details && details.AccountNo ? details && details.AccountNo : '(Not Yet Provided)'

  export function checkedReleasingCenter (details) {
    return details && details.ReleasingCenter ? details && details.ReleasingCenter  : '(Not Yet Provided)'
  }
  export function checkedDeliveryType (details) {
    return details && details.LaptopLeaseDetails ? details.LaptopLeaseDetails && details.LaptopLeaseDetails.DeliveryType : '(Not Yet Provided)'
  }
  export function checkedBrand (details) {
    return details && details.LaptopLeaseDetails === '' ? details.LaptopLeaseDetails.Brand : '(Not Yet Provided)'
  }
  export function checkedColorFamily (details) {
    return details && details.LaptopLeaseDetails ? details.LaptopLeaseDetails &&  details.LaptopLeaseDetails.ColorFamily : '(Not Yet Provided)'
  }
  export function checkedEstimatedCost (details) {
    return details && details.LaptopLeaseDetails ? details.LaptopLeaseDetails &&  details.LaptopLeaseDetails.EstimatedCost : '(Not Yet Provided)'
  }
