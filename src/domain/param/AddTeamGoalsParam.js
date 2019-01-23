export default
(goalType,
participantArray,
goalTitle,
description,
startDate,
dueDate,
priorityId,
goalTypeId
) => ({
  goalType: goalType,
  body : {
    participantDetails: participantArray,
    title: goalTitle,
    description: description,
    startDate: startDate,
    endDate: dueDate,
    priority: priorityId,
    type: goalTypeId
  }
})
