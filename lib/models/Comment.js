import pool from '../utils/pool.js';

export default class Comment {
  id;
  commentBy;
  tardy;
  comment;

  constructor(row) {
    this.id = row.id;
    this.commentBy = row.comment_by;
    this.tardy = row.tardy;
    this.comment = row.comment;
  }

  static async insert({ tardy, comment, commentBy }) {

    const { rows } = await pool.query(
      'INSERT INTO comments (tardy, comment, comment_by) VALUES ($1, $2, $3) RETURNING *',
      [tardy, comment, commentBy]
    );

    return new Comment(rows[0]);
  }

  static async delete(id, commentBy) {

    const { rows } = await pool.query(
      'DELETE FROM comments WHERE id = $1 AND comment_by = $2 RETURNING *',
      [id, commentBy]
    );

    return new Comment(rows[0]);
  }
}
