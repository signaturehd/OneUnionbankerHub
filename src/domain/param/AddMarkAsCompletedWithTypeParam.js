export default (
  type,
  id,
  remarks,
  goalId
) => ({
  body : {
    remarks,
  },
  id,
  type,
  goalId
})
