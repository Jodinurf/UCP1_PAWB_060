const Pupuk = require('../models/pupukModel');

const pupukController = {
    getPupuk: async (req, res) => {
        try {
            const dataPupuk = await Pupuk.getPupuk();
            res.json(dataPupuk);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching pupuk data', error });
        }
    },

    create: async (req, res) => {
        try {
            const { nama_pupuk, jenis_pupuk, kandungan, stok } = req.body;
            const data = [nama_pupuk, jenis_pupuk, kandungan, stok];
            const newPupuk = await Pupuk.create(data);
            res.status(201).json(newPupuk);
        } catch (error) {
            res.status(500).json({ message: 'Error creating pupuk', error });
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            const { nama_pupuk, jenis_pupuk, kandungan, stok } = req.body;
            const data = [nama_pupuk, jenis_pupuk, kandungan, stok];
            const updatedPupuk = await Pupuk.update(id, data);
            res.json(updatedPupuk);
        } catch (error) {
            res.status(500).json({ message: 'Error updating pupuk', error });
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            await Pupuk.delete(id);
            res.send('Pupuk berhasil dihapus');
        } catch (error) {
            res.status(500).json({ message: 'Error deleting pupuk', error });
        }
    }
};

module.exports = pupukController;