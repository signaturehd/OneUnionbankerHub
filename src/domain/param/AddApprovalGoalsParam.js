export default (goalType, goalId, isApprove, rejectedRemarks) => ({
  goalType,
  body : {
    id: goalId,
    status: isApprove,
    remarks: rejectedRemarks
  }
})
