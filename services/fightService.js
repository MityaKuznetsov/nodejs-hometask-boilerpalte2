const { FightRepository } = require('../repositories/fightRepository');

class FightersService {
  createFight(data) {
    const fight = FightRepository.createFight(data);

    if (!fight) {
      return Error('An error occurred while removing');
    }
    return fight;
}
}

module.exports = new FightersService();