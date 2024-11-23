const Bibit = require('../models/bibitModel');

const bibitController = {
    getBibit: async (req, res) => {
        try {
            const dataBibit = await Bibit.getBibit();
            res.json(dataBibit);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching bibit data', error });
        }
    },

    create: async (req, res) => {
        try {
            const { nama_bibit, jenis_tanaman, deskripsi, stok } = req.body;
            const data = [nama_bibit, jenis_tanaman, deskripsi, stok];
            const newBibit = await Bibit.create(data);
            res.status(201).json(newBibit);
        } catch (error) {
            res.status(500).json({ message: 'Error creating bibit', error });
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            const { nama_bibit, jenis_tanaman, deskripsi, stok } = req.body;
            const data = [nama_bibit, jenis_tanaman, deskripsi, stok];
            const updatedBibit = await Bibit.update(id, data);
            res.json(updatedBibit);
        } catch (error) {
            res.status(500).json({ message: 'Error updating bibit', error });
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            await Bibit.delete(id);
            res.send('Bibit berhasil dihapus');
        } catch (error) {
            res.status(500).json({ message: 'Error deleting bibit', error });
        }
    }
};

module.exports = bibitController;