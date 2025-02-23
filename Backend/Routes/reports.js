// routes/reports.js
const express = require('express');
const router = express.Router();
const pool = require('../DB/db');

// 1. Books that have never been borrowed
router.get('/never-borrowed-books', async (req, res) => {
  try {
    const query = `
      SELECT book_name, author
      FROM library_books
      WHERE book_id NOT IN (
        SELECT DISTINCT book_id FROM library_borrowings
      );
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Outstanding books (not yet returned)
router.get('/outstanding-books', async (req, res) => {
  try {
    const query = `
      SELECT m.member_name, b.book_name, i.issued_date, i.target_return_date, b.author
      FROM library_borrowings i
      JOIN library_books b ON i.book_id = b.book_id
      JOIN library_members m ON i.member_id = m.member_id
      WHERE i.returned_date IS NULL;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Top 10 most borrowed books
router.get('/top-borrowed-books', async (req, res) => {
  try {
    const query = `
      SELECT b.book_name, COUNT(i.borrowing_id) AS times_borrowed,
             COUNT(DISTINCT i.member_id) AS members_count
      FROM library_borrowings i
      JOIN library_books b ON i.book_id = b.book_id
      GROUP BY b.book_id, b.book_name, b.author
      ORDER BY times_borrowed DESC
      LIMIT 10;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
