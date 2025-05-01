import React, { useEffect, useState } from "react";
import DiaryEntryCard from "./DiaryEntryCard";

function DiaryList({ newEntry }) {
  const [entries, setEntries] = useState([]);//need intialize/set/update entries
  const [error, stateErr] = useState(null);
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "" });
//following will have some repitition, mainly going back and forth with the backend and accessing old entries, mutating them etc. 
  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem("jwt");
      if(!token){//no auth token so user isnt logged in, cant grant access
        stateErr("You need to be logged in in order to view your entries.");
        return;
      }
      try{
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/diary`,{//getting diary entry info here
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Couldn't get entries.");
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setEntries(data);
        } else {
          setEntries([]);
        }
      } catch (err) {
        stateErr(err.message);
      }
    };

    fetchEntries();
  }, []);

  useEffect(() => {
    if(newEntry){
      setEntries((prev) => [newEntry, ...prev]);
    }
  }, [newEntry]);

  const startEditing = (entry) =>{
    setEditingEntryId(entry._id);
    setEditForm({ title: entry.title, content: entry.content });
  };

  const cancelEditing = () =>{
    setEditingEntryId(null);
    setEditForm({ title: "", content: "" });
  };

  const handleEditChange = (e) =>{
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitEdit = async (id) =>{
    const token = localStorage.getItem("jwt");
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/diary/${id}`, {
      method: "PUT",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(editForm),
    });

    if(response.ok){
      const updated = await response.json();
      setEntries((prev) =>
        prev.map((entry) => (entry._id === id ? updated : entry))
      );
      cancelEditing();
    } else {
      alert("Update failed.");
    }
  };
//deletion should be very similar process to making a get request, both in routing and checking for auth status,
  const entryDeletion = async (id) =>{//passing the actual id here to find in DB after req
    const token = localStorage.getItem("jwt");
    if(!token){
      stateErr("You need to be logged in to delete an entry.");
      return;
    }
    try{
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/diary/${id}`,{//backend processing here
        
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if(!response.ok){
        throw new Error("Entry deletion failed.");//thrown error of status isnt 200+
      }

      setEntries((prev) => prev.filter((entry) => entry._id !== id));
    }catch (err){
      stateErr(err.message);
    }
  };

  if (error) return <p>{error}</p>;
  if (!entries.length) return <p>No diary entries found.</p>;
//formatting for actual list in dashboard:
  return (
    <ul className="diaryList">
      {entries.map((entry) => (
        <li key={entry._id}>
          {editingEntryId === entry._id ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitEdit(entry._id);
              }}>
              <input
                name="title"
                value={editForm.title}
                onChange={handleEditChange}/>
              <textarea
                name="content"
                value={editForm.content}
                onChange={handleEditChange}/>
              <button type="submit">Save</button>
              <button type="button" onClick={cancelEditing}>Cancel</button>
            </form>
          ) : (
            <>
              <DiaryEntryCard entry={entry} />
              <button onClick={() => startEditing(entry)}>Edit</button>
              <button onClick={() => entryDeletion(entry._id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default DiaryList;