const express = require("express");
const router = express.Router();

const bookController = require("../Controllers/book");
const categoryController = require("../Controllers/category");
const collectionController = require("../Controllers/collection");
const issuanceController = require("../Controllers/issuance");
const memberController = require("../Controllers/member");
const membership = require("../Controllers/memership")

// Book Routes
router.get("/books", bookController.getAllBooks);
router.post("/books", bookController.createBook);
router.put("/books/:id",bookController.updateBook)

// Category Routes
router.get("/categories", categoryController.getCategories);
router.post("/categories", categoryController.createCategory);

// Collection Routes
router.get("/collections", collectionController.getAllCollections);
router.post("/collections", collectionController.createCollection);

// Issuance Routes
router.get("/issuances", issuanceController.getAllIssuedBooks);
router.post("/issuances", issuanceController.issueBook);
router.put("/issuances/:id", issuanceController.updateIssuance);
router.delete("/issuances/:id", issuanceController.deleteIssuance);

// Member Routes
router.get("/members", memberController.getAllMembers);
router.post("/members", memberController.createMember);
router.put("/members/:id", memberController.updateMember);
router.delete("/members/:id", memberController.deleteMember);

// Memership Routes
router.get("/memberships", membership.getAllMemberships);
router.post("/memberships", membership.createMembership);
router.put("/memberships/:id", membership.updateMembership);
router.delete("/memberships/:id", membership.deleteMembership);


module.exports = router;
