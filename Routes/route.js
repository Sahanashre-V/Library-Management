import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// import {bookController} from "../Controllers/book.js";
import {categoryController} from "../Controllers/category.js";
import {collectionController} from "../Controllers/collection.js";
import {issuanceController} from "../Controllers/issuance.js";
import {memberController} from "../Controllers/member.js";
import {membershipController} from "../Controllers/memership.js";
import {loginController} from "../Controllers/login.js";

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
    console.log(JWT_SECRET, "JWT SECRET");
    console.log(token, "TOKEN");
    console.log(err, "error");
    req.user = user;
    next();
  });
};

// Login Route
router.post("/login", loginController.login);

// Member Routes
router.post("/members", memberController.createMember); // Creating member (Signup)
router.get("/members", authenticateToken, memberController.getAllMembers);
router.put("/members/:id", authenticateToken, memberController.updateMember);
router.delete("/members/:id", authenticateToken, memberController.deleteMember);

// Book Routes
router.get("/books", authenticateToken, bookController.getAllBooks);
router.post("/books", authenticateToken, bookController.createBook);
router.put("/books/:id", authenticateToken, bookController.updateBook);

// Category Routes
router.get("/categories", authenticateToken, categoryController.getCategories);
router.post("/categories", authenticateToken, categoryController.createCategory);

// Collection Routes
router.get("/collections", authenticateToken, collectionController.getAllCollections);
router.post("/collections", authenticateToken, collectionController.createCollection);

// Issuance Routes
router.get("/issuances", authenticateToken, issuanceController.getAllIssuedBooks);
router.post("/issuances", authenticateToken, issuanceController.issueBook);
router.put("/issuances/:id", authenticateToken, issuanceController.updateIssuance);
router.delete("/issuances/:id", authenticateToken, issuanceController.deleteIssuance);

// Membership Routes
router.get("/memberships", authenticateToken, membershipController.getAllMemberships);
router.post("/memberships", authenticateToken, membershipController.createMembership);
router.put("/memberships/:id", authenticateToken, membershipController.updateMembership);
router.delete("/memberships/:id", authenticateToken, membershipController.deleteMembership);

export default router;
