const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Import Controllers
const bookController = require("../Controllers/book");
const categoryController = require("../Controllers/category");
const collectionController = require("../Controllers/collection");
const issuanceController = require("../Controllers/issuance");
const memberController = require("../Controllers/member");
const membershipController = require("../Controllers/memership");
const loginController = require("../Controllers/login");

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err.status==403) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Login Route
router.post("/login", loginController.login);

// Member Routes
router.post("/members", memberController.createMember);  //Creating member(Signup)
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

module.exports = router;
