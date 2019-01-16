export default (
  awardId,
  employees,
  remarks,
) => ({
    body: {
      awardId,
      employees,
      remarks,
    }
  })
