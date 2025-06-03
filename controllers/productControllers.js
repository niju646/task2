import pool from '../models/db.js';


export const addProduct = async (req, res) => {
    const { name, price, description, category, inStock = true } = req.body;
    try {
        const existing = await pool.query(`SELECT * FROM products WHERE name = $1`, [name]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ message: 'Product already exists' });
        }
        const result = await pool.query(
            `INSERT INTO products (name, price, description, category, inStock)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, price, description, category, inStock]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getProducts = async (req, res) => {
    try {
        const result = await pool.query(`select * from products`);
        res.status(201).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getProductsById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`SELECT * FROM products WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "products not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category, inStock } = req.body;
    try {
        const result = await pool.query(`UPDATE products SET name=$1, price=$2, description=$3, category=$4, inStock=$5
       WHERE id=$6 RETURNING *`,
            [name, price, description, category, inStock, id]
        );
        if (result.rows.length === 0) {

            return res.status(404).json({ message: "Product not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`DELETE FROM products WHERE id = $1 RETURNING *`, [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};