const { Router } = require('express');
const FightService = require('../services/fightService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');


const router = Router();

router.post('/start', (req, res) => {
  FightService.createFight(req.body);
}, responseMiddleware)

router.post('/finish', (req, res) => {}, responseMiddleware)

module.exports = router;