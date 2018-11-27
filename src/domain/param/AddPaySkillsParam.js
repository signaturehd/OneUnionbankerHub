export default (programId, dateOfCompletion, accreditingBodyId, attachments) => ({
  body : {
    programId,
    dateOfCompletion,
    accreditingBodyId
  },
  attachments
})
