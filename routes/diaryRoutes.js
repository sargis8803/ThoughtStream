import express from "express";
import {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry
} from "../controllers/diaryController.js";

const router = express.Router();
/**
* @route GET /api/diary
* @desc Fetch all diary entries
* @access Public (Authentication will be added in Part 2)
*/
router.get("/:id", getEntryById);

router.get("/", getAllEntries);

router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;
 