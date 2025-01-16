import { User } from "../models/User";

interface validatedData {
  email: string;
  password: string;
}

export class AuthRepository {
  async login({ email, password }: validatedData) {
    try {
      const user = await User.findOne({
        where: { email, password },
      });
      if (!user) {
        throw new Error("Invalid username or password");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  // async createCard(req: Request) {
  //   try {
  //     const card = await Card.create(req.body);
  //     const results = await card.save();
  //     return results;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async deleteCard(req: Request) {
  //   try {
  //     const { id } = req.params;
  //     const card = await Card.findByPk(id);
  //     if (!card) {
  //       throw new Error("Card not found");
  //     }
  //     await card.destroy();
  //     return "Task deleted successfully";
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async updateCard(req: Request) {
  //   try {
  //     const { id } = req.params;
  //     const { content } = req.body;
  //     const card = await Card.findByPk(id);
  //     if (!card) {
  //       throw new Error("Card not found");
  //     }
  //     card.set({ content });
  //     await card.save();
  //     return "Task updated successfully";
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
