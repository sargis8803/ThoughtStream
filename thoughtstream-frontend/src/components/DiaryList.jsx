import React, { useEffect, useState } from "react";
import DiaryEntryCard from "./DiaryEntryCard";

function DiaryList() {
  const [entries, localEntry] = useState([]);
  const [error, entryErr] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        entryErr("Please log in to view your entries.");
        return;
      }
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/diary`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if(!response.ok) {
          throw new Error("Couldn't get entries.");
        }
    
        const data = await response.json();
        if (Array.isArray(data)) {
          localEntry(data);
        } else {
          localEntry([]);
        }
      } catch (err) {
        entryErr(err.message);
      }
    };

    fetchEntries();
  }, []);

//deletion should be very similar process to making a get request, both in routing and checking for auth status, 
  const EntryDeletion = async (id) => {//passing the actual id here to find in DB after req
    const JWT = localStorage.getItem("jwt");
    if(!JWT){
      entryErr("You need to be logged in to update/delete an old entry.");
      return;
    }
    try{
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/diary/${id}`,{//backend processing here
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${JWT}`,
        },
      });
      if(!response.ok){
        throw new Error("Entry deletion failed.");//thrown error of status isnt 200+
      }

      localEntry((oldEntryState) => oldEntryState.filter((entry) => entry._id !== id));
    } catch (err) {
      entryErr(err.message);
    }
  };

  if (error) return <p>{error}</p>;
  if (!entries.length) return <p>No diary entries found.</p>;

  return (
    <ul className="diaryList">
      {entries.map((entry) => (
        <li key={entry._id || entry.id}>
          <DiaryEntryCard entry={entry} />
          <button 
            onClick={() => EntryDeletion(entry._id || entry.id)} 
            className="deleteButton">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default DiaryList;
