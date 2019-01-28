export default (
  type,
  id,
  remarks
) => ({
  body : {
    id,
    remarks,
  },
  type,
})
