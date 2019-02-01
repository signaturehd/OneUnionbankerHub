export default (goalParam, rate, remarks) => ({
  goalId: goalParam.id,
  goalType: goalParam.type,
  body : {
    rate,
    remarks,
    employeeId: goalParam.employeeId,
  }
})
