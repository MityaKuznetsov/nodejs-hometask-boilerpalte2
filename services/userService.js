const { UserRepository } = require('../repositories/userRepository');

class UserService {
  getUsers() {
    const users = UserRepository.getAll();

    if (!users) {
      throw Error('Users not found');
    }

    return users;
  }

  getUser(id) {
    const user = UserRepository.getOne(id);

    if (!user) {
      throw Error('User not found');
    }

    return user;
  }

  createUser(data) {
    const searchFields = { email: data.email, phoneNumber: data.phoneNumber };
    const isBusy = UserRepository.findByFields(searchFields);

    if (!isBusy) {
      const updatedData = { ...data };
      Object.keys(data).forEach((el) => {
        const element = data[el];

        updatedData[el] = element === Number(element) ? element : element.toLowerCase();
      });

      const user = UserRepository.create(updatedData);

      if (!user) {
        throw Error('Can\'t create new user');
      }

      return user;
    }

    throw Error('A user with such data already exists');
  }

  updateUser(id, data) {
    const user = this.getUser(id);

    if (user) {
      const searchFields = { email: data.email, phoneNumber: data.phoneNumber };
      const isBusy = UserRepository.findByFields(searchFields);

      if (!isBusy) {
        const updatedUser = UserRepository.update(id, data);

        if (!updatedUser) {
          throw Error('Can\'t update user');
        }

        return updatedUser;
      }

      throw Error('An internal error has occurred');
    }

    throw Error('A user with such data already exists');
  }

  deleteUser(id) {
    const user = this.getUser(id);

    if (user) {
      const isDeleted = UserRepository.delete(id);

      if (!isDeleted) {
        throw Error('An error occurred while removing');
      }

      return isDeleted;
    }

    throw Error('An internal error has occurred');
  }

  search(data) {
    const { email, password } = data;

    if (UserRepository.findByFields({ email }) && UserRepository.findByFields({ password })) {
      return true;
    }

    return false;
  }
}

module.exports = new UserService();
