export default
(goalType,
participantArray,
goalTitle,
description,
startDate,
dueDate,
priorityId,
goalTypeId,
squadId
) => ({
  goalType: goalType,
  body : {
    squadId,
    participantDetails: participantArray,
    title: goalTitle,
    description: description,
    startDate: startDate,
    endDate: dueDate,
    priority: priorityId,
    type: goalTypeId
  }
})
