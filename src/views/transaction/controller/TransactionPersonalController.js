class TransactionPersonalController {

  indexDecreased (index) {
    if(Number(index) === 4) {
      return index
    } else {
      return index - 4
    }
  }

  indexIncreased (index) {
    return index + 4
  }

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

export default TransactionPersonalController
