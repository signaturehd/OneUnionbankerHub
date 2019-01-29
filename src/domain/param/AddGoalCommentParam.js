export default (id, description, goalType) => ({
  goalType,
  body : {
    id,
    description
  }
})
