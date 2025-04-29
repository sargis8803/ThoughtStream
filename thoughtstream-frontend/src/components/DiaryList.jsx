import React from "react";

function DiaryList({ entries }) {
  if (!entries.length) return <p>No diary entries yet.</p>;

  return (
    <ul className="diaryList">
      {entries.map((entry, index) => (
        <li key={index} className="entry">
          <h3>{entry.title}</h3>
          <p>{entry.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default DiaryList;
