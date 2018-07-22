class TransactionDetailsController {

  checkedBenefitStatus (detailStatus) {
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
}

export default TransactionDetailsController
