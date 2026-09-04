const pool = require("../config/database");

class Post {
  async findAll(limit, offset) {
    const [rows] = await pool.query(
      `select * from posts limit ${limit} offset ${offset};`,
    );
    return rows;
  }

  async count() {
    const [rows] = await pool.query(`select count(*) as count from posts;`);
    return rows[0].count;
  }

  async findOne(id) {
    const [rows] = await pool.query(`select * from posts where id = ${id};`);
    return rows[0];
  }
}

module.exports = new Post();
