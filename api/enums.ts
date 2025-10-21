export enum Mutations {
  Login = 'login',
  UpdateUserProfile = 'updateUserProfile',
  UploadAvatar = 'uploadAvatar',
  AddFinancialEntry = 'addFinancialEntry',
  DeleteFinancialEntry = 'deleteFinancialEntry',
  EditFinancialEntry = 'editFinancialEntry',
  AddInvestment = 'addInvestment',
}

export enum Queries {
  UserProfile = 'userProfile',
  DownloadImage = 'downloadImage',
  FinancialEntries = 'financialEntries',
  FinancialEntriesTotalAmount = 'financialEntriesTotalAmount',
  CategoriesFinancialEntries = 'categoriesFinancialEntries',
  SubcategoryFinancialEntries = 'subcategoryFinancialEntries',
  MonthlyFinancialSummary = 'monthlyFinancialSummary',
  ImageUrl = 'imageUrl',
  Investments = 'investments',
}
