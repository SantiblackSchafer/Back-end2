import { UserModel } from '../models/user.model.js';

export class UserDAO {
  async findById(id) {
    return UserModel.findById(id);
  }

  async findByEmail(email) {
    return UserModel.findOne({ email });
  }

  async create(userData) {
    return UserModel.create(userData);
  }

  async update(id, userData) {
    return UserModel.findByIdAndUpdate(id, userData, { new: true });
  }
}