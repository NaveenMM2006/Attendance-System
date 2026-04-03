import  pool  from "../config/db.js";

export const createUser = async ({ name, email, password_hash, role, roll_number, branch }) => {
    const results = await pool.query(
        `INSERT INTO users (name, email, password_hash, role, roll_number, branch)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, email, password_hash, role, roll_number,branch]
    );

    return results.rows[0];
};

export const getuserByEmail = async (email) => {
    const result = await pool.query (
        `SELECT * FROM users WHERE email= $1`,
        [email]
    );

    return result.rows[0];
};


export const getUserById = async (id) => {
    const result = await pool.query(
        `SELECT id, name, email, role, roll_number, branch FROM users WHERE id=$1`,
        [id]
    );

    return result.rows[0];
};
