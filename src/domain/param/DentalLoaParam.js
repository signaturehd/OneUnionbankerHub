export default (accountNo, type, dependentId, releasingCenter, branchId, procedures, preferedDate) => ({
  accountNo,
  type,
  dependentId,
  dentalClinicId: branchId,
  releasingCenter,
  preferredDate: preferedDate,
  dentalProcedures: procedures,
})
