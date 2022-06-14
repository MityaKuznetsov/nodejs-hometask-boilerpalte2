const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
  getFighters() {
    const fighters = FighterRepository.getAll();

    if (!fighters) {
      throw Error('Fighters not found');
    }

    return fighters;
  }

  getFighter(id) {
    const fighter = FighterRepository.getOne(id);

    if (!fighter) {
      throw Error('Fighter not found');
    }
    return fighter;
  }

  createFighter(fighterData) {
    const searchFields = { name: fighterData.name && fighterData.name.toLowerCase() };
    const isBusy = FighterRepository.findByFields(searchFields);

    if (!isBusy) {
      const updatedData = { ...fighterData, name: fighterData.name.toLowerCase(), health: fighterData.health || 100 };
      const fighter = FighterRepository.create(updatedData);

      if (!fighter) {
        throw Error('Can\'t create new fighter');
      }

      return fighter;
    }

    throw Error('A user with such data already exists');
  }

  updateFighter(id, fighter) {
    const currentFighter = this.getFighter(id);

    if (currentFighter) {
      const searchFields = { name: fighter.name };
      const isBusy = FighterRepository.findByFields(searchFields);

      if (!isBusy) {
        const updatedFighter = FighterRepository.update(id, fighter);

        if (!updatedFighter) {
          throw Error('Can\'t update fighter');
        }

        return updatedFighter;
      }
      throw Error('An internal error has occurred');
    }

    throw Error('A fighter with such data already exists');
  }

  deleteFighterById(id) {
    const fighter = this.getFighter(id);

    if (fighter) {
      const isDeleted = FighterRepository.delete(id);

      if (!isDeleted) {
        throw Error('An error occurred while removing');
      }

      return isDeleted;
    }

    throw Error('An internal error has occurred');
  }
}

module.exports = new FighterService();
