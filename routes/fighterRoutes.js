const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get('', (req, res, next) => {
  try {
    const fighters = FighterService.getFighters();

    res.data = fighters;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const fighter = FighterService.getFighter(id);

    res.data = fighter;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('', createFighterValid, (req, res, next) => {
  try {
    const fighter = FighterService.createFighter(req.body);

    res.data = fighter;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.put('/:id', updateFighterValid, (req, res, next) => {
  try {
    const { id } = req.params;
    const result = FighterService.updateFighter(id, req.body);

    res.data = result;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;

    FighterService.deleteFighterById(id);
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

module.exports = router;
