import express from "express";
import {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry
} from "../controllers/diaryController.js";

import { ensureAuthenticated } from "../middleware/authMiddleware.js"; 


const router = express.Router();
/**
* @route GET /api/diary
* @desc Fetch all diary entries
* @access Public (Authentication will be added in Part 2)
*/
router.get("/", ensureAuthenticated, getAllEntries);
router.post("/", ensureAuthenticated, createEntry);
router.get("/:id", ensureAuthenticated, getEntryById);
router.put("/:id", ensureAuthenticated, updateEntry);
router.delete("/:id", ensureAuthenticated, deleteEntry);

export default router;
 