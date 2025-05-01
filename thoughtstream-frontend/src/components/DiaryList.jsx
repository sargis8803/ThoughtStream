import React, { useEffect, useState } from "react";
import DiaryEntryCard from "./DiaryEntryCard";

function DiaryList({ newEntry }) {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setError("Please log in to view your entries.");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/diary`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          setEntries(data);
        } else {
          setEntries([]);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEntries();
  }, []);

  useEffect(() => {
    if (newEntry) {
      setEntries((prev) => [newEntry, ...prev]);
    }
  }, [newEntry]);

  const startEditing = (entry) => {
    setEditingEntryId(entry._id);
    setEditForm({ title: entry.title, content: entry.content });
  };

  const cancelEditing = () => {
    setEditingEntryId(null);
    setEditForm({ title: "", content: "" });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitEdit = async (id) => {
    const token = localStorage.getItem("jwt");
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/diary/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(editForm),
    });

    if (response.ok) {
      const updated = await response.json();
      setEntries((prev) =>
        prev.map((entry) => (entry._id === id ? updated : entry))
      );
      cancelEditing();
    } else {
      alert("Update failed.");
    }
  };

  if (error) return <p>{error}</p>;
  if (!entries.length) return <p>No diary entries found.</p>;

  return (
    <ul className="diaryList">
      {entries.map((entry) => (
        <li key={entry._id}>
          {editingEntryId === entry._id ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitEdit(entry._id);
              }}
            >
              <input
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
              />
              <textarea
                name="content"
                value={editForm.content}
                onChange={handleEditChange}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={cancelEditing}>Cancel</button>
            </form>
          ) : (
            <>
              <DiaryEntryCard entry={entry} />
              <button onClick={() => startEditing(entry)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default DiaryList;

