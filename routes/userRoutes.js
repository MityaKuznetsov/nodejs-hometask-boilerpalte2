const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.get('', (req, res, next) => {
  try {
    const users = UserService.getUsers();

    res.data = users;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const user = UserService.getUser(id);

    res.data = user;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('', createUserValid, (req, res, next) => {
  try {
    const { body } = req;
    const user = UserService.createUser(body);

    res.data = user;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.put('/:id', updateUserValid, (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const user = UserService.updateUser(id, updatedData);

    res.data = user;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = UserService.deleteUser(id);

    res.data = { isDeleted: Boolean(deletedUser), deletedAccount: deletedUser };
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

module.exports = router;
