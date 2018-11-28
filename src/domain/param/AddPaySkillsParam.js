export default (programId, dateOfCompletion, accreditingBodyId, others, attachments) => ({
  body : {
    programId,
    dateOfCompletion,
    accreditingBodyId,
    others,
  },
  attachments
})
