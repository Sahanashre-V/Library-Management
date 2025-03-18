import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { createBook, getAllBooks, updateBook } from "../Controllers/book.js";
import { createMember, getAllMembers, updateMember, deleteMember } from "../Controllers/member.js";
import { getCategories, createCategory } from "../Controllers/category.js";
import { getAllCollections, createCollection } from "../Controllers/collection.js";
import { getAllIssuedBooks, issueBook, updateIssuance, deleteIssuance } from "../Controllers/issuance.js";
import { getAllMemberships, createMembership, updateMembership, deleteMembership } from "../Controllers/memership.js";
import { login } from "../Controllers/login.js";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err && err.status === 403) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Login Route
router.post("/login", login);

// Member Routes
router.post("/members", createMember);
router.get("/members", authenticateToken, getAllMembers);
router.put("/members/:id", authenticateToken, updateMember);
router.delete("/members/:id", authenticateToken, deleteMember);

// Book Routes
router.get("/books", authenticateToken, getAllBooks);
router.post("/books", authenticateToken, createBook);
router.put("/books/:id", authenticateToken, updateBook);

// Category Routes
router.get("/categories", authenticateToken, getCategories);
router.post("/categories", authenticateToken, createCategory);

// Collection Routes
router.get("/collections", authenticateToken, getAllCollections);
router.post("/collections", authenticateToken, createCollection);

// Issuance Routes
router.get("/issuances", authenticateToken, getAllIssuedBooks);
router.post("/issuances", authenticateToken, issueBook);
router.put("/issuances/:id", authenticateToken, updateIssuance);
router.delete("/issuances/:id", authenticateToken, deleteIssuance);

// Membership Routes
router.get("/memberships", authenticateToken, getAllMemberships);
router.post("/memberships", authenticateToken, createMembership);
router.put("/memberships/:id", authenticateToken, updateMembership);
router.delete("/memberships/:id", authenticateToken, deleteMembership);

export default router;
