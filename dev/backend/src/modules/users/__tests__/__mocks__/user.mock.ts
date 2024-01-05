import * as bcrypt from 'bcryptjs';

export const getMockUser = () => {
  return {
    name: 'Mocked user',
    email: 'mockeduser@email.com',
    password: 'mockedpassword',
  };
};

export const getPasswordHashedUser = () => {
  return {
    name: 'Mocked user',
    email: 'mockeduser@email.com',
    password: bcrypt.hashSync('mockedpassword'),
  };
};
