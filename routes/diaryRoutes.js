import express from "express";
import {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry
} from "../controllers/diaryController.js";

const router = express.Router();

router.get("/", getAllEntries);
router.get("/:id", getEntryById);
router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;
