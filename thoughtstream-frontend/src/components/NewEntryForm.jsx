import React, { useState } from "react";

// Component for creating a new diary entry
function NewEntryForm({ location, setNewEntry }) {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [reflection, setReflection] = useState("");
  const [tags, setTags] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Please login again");
      return;
    }

    try {
         // Send form data to the backend API
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/diary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content: entry,
          reflection,
          tags: tags.split(",").map((tag) => tag.trim()),
          location,
        }),
      });

      // If token is expired or invalid
      if (response.status === 403) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        alert("Session expired. Please login again.");
        return;
      }

       // Handle other API errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save entry");
      }

      const data = await response.json();
      setNewEntry(data); // Inform Dashboard of new entry

      // Clear the form
      setTitle("");
      setEntry("");
      setReflection("");
      setTags("");

    } catch (error) {
      console.error("Submission error:", error);
      alert(
        error.message.includes("token")
          ? "Session expired. Please login again."
          : error.message || "Failed to save entry"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="entry-form">
        {/* Title input */}
      <div className="form-group">
        <input
          id="entryTitle"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entry title..."
          className="title-input"
          required
        />
      </div>

        {/* Main diary content */}
      <div className="form-group">
        <textarea
          id="entryContent"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your thoughts here..."
          className="content-textarea"
          rows={10}
          required
        />
      </div>

        {/* Optional reflection section */}
      <div className="form-group">
        <textarea
          id="reflection"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Reflection..."
          className="content-textarea"
          rows={5}
        />
      </div>

        {/* Tags input */}
      <div className="form-group">
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma-separated)"
          className="title-input"
        />
      </div>

        {/* Submit button */}
      <button type="submit" className="submit-button">
        Save Entry
      </button>
    </form>
  );
}

export default NewEntryForm;