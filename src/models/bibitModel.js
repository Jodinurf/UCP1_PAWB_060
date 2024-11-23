const { connectDB } = require('../configs/database');

const bibitModel = {
    getBibit: async () => {
        const connection = await connectDB();
        const [rows] = await connection.execute('SELECT * FROM bibit');
        await connection.end(); 
        return rows;
    },

    create: async (data) => {
        const connection = await connectDB();
        const [result] = await connection.execute('INSERT INTO bibit (nama_bibit, jenis_tanaman, deskripsi, stok) VALUES (?, ?, ?, ?)', data);
        const [rows] = await connection.execute('SELECT * FROM bibit WHERE id_bibit = ?', [result.insertId]);
        await connection.end();
        return rows;
    },

    update: async (id, data) => {
        const connection = await connectDB();
        await connection.execute('UPDATE bibit SET nama_bibit = ?, jenis_tanaman = ?, deskripsi = ?, stok = ? WHERE id_bibit = ?', [...data, id]);
        const [rows] = await connection.execute('SELECT * FROM bibit WHERE id_bibit = ?', [id]);
        await connection.end();
        return rows;
    },

    delete: async (id) => {
        const connection = await connectDB();
        await connection.execute('DELETE FROM bibit WHERE id_bibit = ?', [id]);
        await connection.end();
    }
}

module.exports = bibitModel;