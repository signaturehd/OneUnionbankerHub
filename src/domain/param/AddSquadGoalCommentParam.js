export default (
  type,
  id,
  description
) => ({
  body : {
    id,
    description,
  },
  type: type,
})
