import pool from '../utils/pool.js';

export default class Tardy {
  id;
  userId;
  photoUrl;
  caption;
  tags;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async insert({ userId, photoUrl, caption, tags }) {
    const { rows } = await pool.query(
      'INSERT INTO tardys (user_id, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, photoUrl, caption, tags]
    );

    return new Tardy(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM tardys'
    );

    return rows.map(row => new Tardy(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM tardys JOIN comments ON tardys.user_id = comments.comment_by WHERE tardys.id = $1',
      [id]
    );

    if(!rows[0]) return null;

    const coms = rows.map(row => row.comment);

    return { ...new Tardy(rows[0]), comments: coms };
  }

  static async patchById({ caption }, id, userId) {
    const { rows } = await pool.query(
      'UPDATE tardys SET caption = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [caption, id, userId]
    );

    return new Tardy(rows[0]);
  }

  static async deleteById(id, userId) {
    const { rows } = await pool.query(
      'DELETE FROM tardys WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    return new Tardy(rows[0]);
  }
}
