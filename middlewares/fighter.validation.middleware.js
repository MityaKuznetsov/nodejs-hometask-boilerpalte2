const { fighter } = require('../models/fighter');

const throwCustomError = (message, res) => {
  return res.status(400).json({ error: true, message });
};

const checkFighterRequiredFields = (req, res) => {
  const requiredFields = ['name', 'power', 'defense'];
  const fieldsTitles = ['Name', 'Power', 'Defence'];

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
    if (!(el in fighter)) {
      throwCustomError(`Request contains forbidden '${el}' field`, res);
    }
  });

  return true;
};

const validationFields = (req, res) => {
  const { power, defense, health } = req.body;

  if (power <= 1 || power >= 100) {
    throwCustomError('Power must be between 1 and 100', res);
  }

  if (defense <= 1 || defense >= 10) {
    throwCustomError('Defense must be between 1 and 10', res);
  }

  // custom health property validation
  if ((health && health <= 80) || health >= 120) {
    throwCustomError('Health must be between 80 and 120', res);
  }

  return true;
};

const checkUpdateRequiredFields = (req, res) => {
  const requiredFields = ['name', 'power', 'defense', 'health'];

  if (req.body.id) {
    throwCustomError(`Request contains a forbidden 'id' value`, res);
  }

  const haveRequiredFields = requiredFields.map((el) => !!req.body[el]);
  if (haveRequiredFields.includes(true)) {
    return true;
  }

  throwCustomError('There is not one of the required fields', res);
};

const createFighterValid = (req, res, next) => {
  const isRequiredValid = checkFighterRequiredFields(req, res);
  const isAllFieldsCorrect = checkAllFields(req, res);
  const isFieldValidation = validationFields(req, res);

  if (isRequiredValid && isAllFieldsCorrect && isFieldValidation) {
    next();
  }

  throwCustomError('Developer screwed up. Something went wrong', res);
};

const updateFighterValid = (req, res, next) => {
  const haveRequiredFields = checkUpdateRequiredFields(req, res);
  const isFieldValidation = validationFields(req, res);

  if (haveRequiredFields && isFieldValidation) {
    next();
  }

  throwCustomError('Developer screwed up. Something went wrong', res);
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
