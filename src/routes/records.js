const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT id, IOC_value, trending FROM records');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [results] = await db.query('SELECT id, IOC_value, notes, trending FROM records WHERE id = ?', [req.params.id]);
        if (results.length === 0) return res.status(404).json({ error: 'Record not found' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { IOC_value, notes } = req.body;
        if (!IOC_value) return res.status(400).json({ error: 'IOC_value is required' });
        const [result] = await db.query('INSERT INTO records (IOC_value, notes) VALUES (?, ?)', [IOC_value, notes || null]);
        res.status(201).json({ message: 'Record added', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { IOC_value } = req.body;
        if (!IOC_value) return res.status(400).json({ error: 'IOC_value is required' });
        const [result] = await db.query('UPDATE records SET IOC_value = ? WHERE id = ?', [IOC_value, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Record not found' });
        res.json({ message: 'Record updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id/notes', async (req, res) => {
    try {
        const id = req.params.id;
        const { notes } = req.body;
        if (!notes) return res.status(400).json({ error: 'Notes are required' });

        const [result] = await db.query(
            'UPDATE records SET notes = ? WHERE id = ?',
            [notes, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.json({ message: 'Notes updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/:id/reset', async (req, res) => {
    try {
        const [result] = await db.query('UPDATE records SET trending = 0 WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Record not found' });
        res.json({ message: 'Trending count reset' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM records WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Record not found' });
        res.json({ message: 'Record deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;