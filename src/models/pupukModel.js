const { connectDB } = require('../configs/database');

const pupukModel = {
    getPupuk: async () => {
        const connection = await connectDB();
        const [rows] = await connection.execute('SELECT * FROM pupuk');
        await connection.end();
        return rows;
    },

    create: async (data) => {
        const connection = await connectDB();
        const [result] = await connection.execute('INSERT INTO pupuk (nama_pupuk, jenis_pupuk, kandungan, stok) VALUES (?, ?, ?, ?)', data);
        const [rows] = await connection.execute('SELECT * FROM pupuk WHERE id_pupuk = ?', [result.insertId]);
        await connection.end();
        return rows;
    },

    update: async (id, data) => {
        const connection = await connectDB();
        await connection.execute('UPDATE pupuk SET nama_pupuk = ?, jenis_pupuk = ?, kandungan = ?, stok = ? WHERE id_pupuk = ?', [...data, id]);
        const [rows] = await connection.execute('SELECT * FROM pupuk WHERE id_pupuk = ?', [id]);
        await connection.end();
        return rows;
    },

    delete: async (id) => {
        const connection = await connectDB();
        await connection.execute('DELETE FROM pupuk WHERE id_pupuk = ?', [id]);
        await connection.end();
    }
};

module.exports = pupukModel;