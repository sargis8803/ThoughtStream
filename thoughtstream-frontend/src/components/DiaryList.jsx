import React, { useEffect, useState } from "react";
import DiaryEntryCard from "./DiaryEntryCard";

function DiaryList() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

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
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch entries.");
        }

        const data = await response.json();
        setEntries(data.entries || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEntries();
  }, []);

  if (error) return <p>{error}</p>;
  if (!entries.length) return <p>No diary entries found.</p>;

  return (
    <ul className="diaryList">
      {entries.map((entry) => (
        <li key={entry._id || entry.id}>
          <DiaryEntryCard entry={entry} />
        </li>
      ))}
    </ul>
  );
}

export default DiaryList;
