export default (goalType, goalParam, description) => ({
  goalType,
  body : {
    id: goalParam.goalId,
    description
  },
  body2 : {
    id: goalParam.goalId,
    description
  },
  status: goalParam.status,
  goalId: goalParam.goalId,
})
