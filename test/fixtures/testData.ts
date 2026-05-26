export const userCredentials = {
  validUser: {
    email: 'customer3@practicesoftwaretesting.com',
    password: 'pass123'
  },

  invalidUser: {
    email: 'automation_user_999@testmail.com',
    password: 'WrongPassword999'
  },

  invalidFormatUser: {
    email: 'invalid-email-format',
    password: '12'
  }
};

export const searchData = {
  existingProduct: 'hammer',
  nonExistingProduct: 'verylongnonexistingtext'
};

export const sortingOptions = {
  sortByNameAsc: 'Name (A - Z)',
  sortByNameDesc: 'Name (Z - A)',
  sortByPriceAsc: 'Price (Low - High)',
  sortByPriceDesc: 'Price (High - Low)'
};

export const quantityData = {
  defaultQuantity: '1',
  increasedQuantity: '2',
  customQuantity: '3'
};

export const paginationData = {
  secondPage: '2',
  thirdPage: '3'
};