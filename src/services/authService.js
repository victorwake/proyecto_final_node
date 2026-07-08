const VALID_USER = {
  email: "admin@techlab.com",
  password: "admin123",
};

const validateCredentials = async (email, password) => {
  return email === VALID_USER.email && password === VALID_USER.password;
};

export { validateCredentials };
