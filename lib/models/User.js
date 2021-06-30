import pool from '../utils/pool.js';

export default class User {
  email;
  passwordHash;
  profilePhotoUrl;

  constructor(row) {
    this.email = row.email;
    this.passwordHash = row.password_hash;
    this.profilePhotoUrl = row.profile_photo_url;
  }

  static async insert({ email, passwordHash, profilePhotoUrl }) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash, profile_photo_url) VALUES ($1, $2, $3) RETURNING *',
      [email, passwordHash, profilePhotoUrl]
    );

    return new User(rows[0]);
  }
}
