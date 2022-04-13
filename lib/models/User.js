const pool = require('../utils/pool')

module.exports = class User{
    id;
    name;
    email;

    constructor(row){
        this.id = row.id;
        this.name = row.name;
        this.email = row.email;
    }

    static async Signup({ name, email }){
        const { rows } = await pool.query(`
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        RETURNING *`, [name, email]);

        return new User(rows[0]);
    }
    static async getEmailList(){
        const { rows } = await pool.query(`
        SELECT * FROM users`);

        return rows.map((row) => new User(row));
    }

    static async deleteUser(id){
        const { rows } = await pool.query(`
        DELETE FROM users
        WHERE id=$1
        RETURNING *`, [id]);

        if(!rows[0]) return null;

        return new User(rows[0]);
    }
}
