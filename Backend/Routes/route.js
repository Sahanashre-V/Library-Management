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

// Category Routes
router.get("/categories", categoryController.getCategories);
router.post("/categories", categoryController.createCategory);

// Collection Routes
router.get("/collections", collectionController.getAllCollections);
router.post("/collections", collectionController.createCollection);

// Issuance Routes
router.get("/issuance", issuanceController.getAllIssuedBooks);
router.post("/issuance", issuanceController.issueBook);
router.put("/issuance/:id", issuanceController.updateIssuance);
router.delete("/issuance/:id", issuanceController.deleteIssuance);

// Member Routes
router.get("/members", memberController.getAllMembers);
router.post("/members", memberController.createMember);
router.put("/members/:id", memberController.updateMember);
router.delete("/members/:id", memberController.deleteMember);

// Memership Routes
router.get("/membership", membership.getAllMemberships);
router.post("/membership", membership.createMembership);
router.put("/membership/:id", membership.updateMembership);
router.delete("/membership/:id", membership.deleteMembership);


module.exports = router;
