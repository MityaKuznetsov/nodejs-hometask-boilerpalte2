const { user } = require('../models/user');

const throwCustomError = (message, res) => {
  return res.status(400).json({ error: true, message });
};

const emailRegex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
const phoneNumberRegex = /^\+?3?8?(0\d{9})$/;

const checkUserRequiredFields = (req, res) => {
  const requiredFields = [
    'email',
    'password',
    'firstName',
    'lastName',
    'phoneNumber',
  ];
  const fieldsTitles = [
    'Email',
    'Password',
    'First name',
    'Last name',
    'Phone number',
  ];

  requiredFields.forEach((el) => {
    if (!req.body[el]) {
      throwCustomError(
        `${fieldsTitles[requiredFields.indexOf(el)]} is required`,
        res
      );
    }
  });

  return true;
};

const checkAllFields = (req, res) => {
  if (req.body.id) {
    throwCustomError(`Request contains a forbidden 'id' value`, res);
  }
  Object.keys(req.body).forEach((el) => {
    if (!(el in user)) {
      throwCustomError(`Request contains forbidden '${el}' field`, res);
    }
  });

  return true;
};

const validationFields = (req, res) => {
  const { email, password, phoneNumber } = req.body;

  if (!emailRegex.test(email)) {
    throwCustomError('Gmail (Google mail) emails allowed only', res);
  }

  if (!phoneNumberRegex.test(phoneNumber)) {
    throwCustomError(
      'You have to write your phone number in this format: +380xxxxxxxxx',
      res
    );
  }

  if (password.length < 3) {
    throwCustomError('Password must be at least three characters', res);
  }

  return true;
};

const checkUpdateRequiredFields = (req, res) => {
  const requiredFields = [
    'email',
    'password',
    'firstName',
    'lastName',
    'phoneNumber',
  ];

  if (req.body.id) {
    throwCustomError(`Request contains a forbidden value 'id'`, res);
  }

  const haveRequiredFields = requiredFields.map((el) => !!req.body[el]);
  if (haveRequiredFields.includes(true)) {
    return true;
  }

  throwCustomError('There is not one of the required fields', res);
};

const createUserValid = (req, res, next) => {
  const isRequiredValid = checkUserRequiredFields(req, res);
  const isAllFieldsCorrect = checkAllFields(req, res);
  const isFieldValidation = validationFields(req, res);

  if (isRequiredValid && isAllFieldsCorrect && isFieldValidation) {
    next();
  }

  throwCustomError('Something went wrong', res);
};

const updateUserValid = (req, res, next) => {
  const haveRequiredFields = checkUpdateRequiredFields(req, res);
  const isFieldValidation = validationFields(req, res);

  if (haveRequiredFields && isFieldValidation) {
    next();
  }

  throwCustomError('Something went wrong', res);
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
