import { User } from "../models/User";

type UserParams = {
  email: string;
  password: string;
};

export class AuthRepository {
  async findUserByEmail(email: string) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id: number) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user: UserParams) {
    try {
      const createdUser = await User.create(user);
      const results = await createdUser.save();
      return results;
    } catch (error) {
      throw error;
    }
  }
}
