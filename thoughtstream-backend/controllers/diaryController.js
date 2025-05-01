import DiaryEntry from "../models/DiaryEntry.js";
import jwt from "jsonwebtoken";


import { openWeatherData } from "./weatherController.js";

/**
 * @route GET /api/diary
 * @desc Fetch all diary entries with optional filters
 * @access Public (Authentication will be added in Part 2)
 */
export const getAllEntries = async (req, res) => {
  try {
      console.log("Authenticated user ID:", req.user.userId);
      const { search, tag, location } = req.query;
      let filter = {user: req.user.userId};//updated here
      // Search filter (Matches title or content)

      console.log("Filter:", filter);
      if (search) {
          filter.$or = [
              { title: { $regex: search, $options: "i" } },
              { content: { $regex: search, $options: "i" } }
          ];
      }

      // Tag filter (Exact match)
      if (tag) {
          filter.tags = tag;
      }

      // Location filter (Exact match)
      if (location) {
          filter.location = location;
      }

      // Fetch filtered results and sort by newest first
      const entries = await DiaryEntry.find(filter).sort({ createdAt: -1 });
      res.status(200).json(entries);
  } catch (error) {
      res.status(500).json({ message: "Server Error: Unable to fetch diary entries" });
  }
};

/**
* @route GET /api/diary/:id
* @desc Fetch a single diary entry by ID
* @access Public (Authentication will be added in Part 2)
*/

export const getEntryById = async (req, res) => {
  try {
      const entry = await DiaryEntry.findById(req.params.id);
      if (!entry) {
          return res.status(404).json({ message: "Diary entry not found" });
      }
      if(entry.user.toString() !== req.user.userId.toString()){
        return res.status(403).json({message: "Forbidden"});
      }
      res.status(200).json(entry);
  } catch (error) {
      res.status(500).json({ message: "Server Error: Unable to retrieve diary entry" });
  }
};


export const createEntry = async (req, res) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded token:", decoded);

    const userId = decoded.userId;


    const { title, content, reflection, tags, location } = req.body;
    console.log("Request Body:", req.body);
    console.log("Creating entry for user:", userId);

    const weatherData = location ? await openWeatherData(location) : null;

    const newEntry = new DiaryEntry({
      user: userId,  
      title,
      content,
      reflection,
      tags,
      location,
      weather: weatherData
    });

    await newEntry.save();
    res.status(201).json(newEntry);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

/**
* @route PUT /api/diary/:id
* @desc Update an existing diary entry
* @access Public (Authentication will be added in Part 2)
*
* TODO: Implement this function.
* - Extract updated fields from `req.body`
* - Find the entry by `req.params.id` and update it
* - Ensure that the entry exists before updating
* - Return the updated entry with a `200 OK` status
*/

export const updateEntry = async (req, res) => {
    try{
      const { title, content, reflection, tags, location } = req.body;
      const entry = await DiaryEntry.findById(req.params.id);
      if (!entry){
        return res.status(404).json({ message: "No entry" });
      } 
      if(entry.user.toString() !== req.user.userId){
        return res.status(403).json({message: "Forbidden"});
      }
      //after checking for the existence of the entry, updating req.body values here:
      if(title) {
        entry.title = title;
      }
      if(content) {
        entry.content = content;
      }
      if(tags) {
        entry.tags = tags;
      }
      if(location) {
        entry.location = location;
      }
      if(reflection) {
        entry.reflection = reflection;
      }

      const entryUpdate = await entry.save();
      res.status(200).json(entryUpdate);
    } catch(error) {
      res.status(500).json({ message: "Failed to update entry"});
    }
   };
   


   /**
    * @route DELETE /api/diary/:id
    * @desc Delete a diary entry
    * @access Public (Authentication will be added in Part 2)
    *
    * TODO: Implement this function.
    * - Find the entry by `req.params.id` and delete it
    * - Ensure that the entry exists before deleting
    * - Return a success message with a `200 OK` status
    */

   export const deleteEntry = async (req, res) => {
    try{
      const entry = await DiaryEntry.findByIdAndDelete(req.params.id);//might need to change when entry deletion occurs
      if(!entry){
        return res.status(404).json({ message: "No entry (404)" });
      }

      if(entry.user.toString() !== req.user.userId){
        return res.status(403).json({message: "Forbidden"});
      }
  
      res.status(200).json({message: "Deleted entry"});//OK status
    }catch (error){
      res.status(500).json({message: "Entry deletion failed"});//internal error server side
    }
  };
  