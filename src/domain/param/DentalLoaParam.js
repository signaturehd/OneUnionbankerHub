export default (accountNo, type, dependentId, branchId, procedures, preferedDate) => ({

  accountNo,
  type,
  dependentId,
  dentalClinicId: branchId ,
  preferredDate : preferedDate,
  dentalProcedures: procedures,
})
