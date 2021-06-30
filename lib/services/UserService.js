import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export default class UserService {
  static async create({ email, password, profilePhotoUrl }) {
    // hash the password with bcrypt
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    // insert user with email, passwordHash
    return User.insert({ email, passwordHash, profilePhotoUrl });
  }
}
