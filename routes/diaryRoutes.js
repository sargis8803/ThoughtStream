import express from "express";
import {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry
} from "../controllers/diaryController.js";

import authenticateJWT from "../middleware/authMiddleware.js";



const router = express.Router();
/**
* @route GET /api/diary
* @desc Fetch all diary entries
* @access Public (Authentication will be added in Part 2)
*/
router.get("/", authenticateJWT, getAllEntries);
router.post("/", authenticateJWT, createEntry);
router.get("/:id", authenticateJWT, getEntryById);
router.put("/:id", authenticateJWT, updateEntry);
router.delete("/:id", authenticateJWT, deleteEntry);

export default router;
 