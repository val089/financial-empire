export enum Mutations {
  UpdateUserProfile = 'updateUserProfile',
  UploadAvatar = 'uploadAvatar',
  DownloadImage = 'downloadImage',
  AddFinancialEntry = 'addFinancialEntry',
  DeleteFinancialEntry = 'deleteFinancialEntry',
}

export enum Queries {
  UserProfile = 'userProfile',
  DownloadImage = 'downloadImage',
  FinancialEntries = 'financialEntries',
  FinancialEntriesTotalAmount = 'financialEntriesTotalAmount',
  CategoriesFinancialEntries = 'categoriesFinancialEntries',
  SubcategoryFinancialEntries = 'subcategoryFinancialEntries',
  MonthlyFinancialSummary = 'monthlyFinancialSummary',
}
