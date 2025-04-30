// src/components/DiaryEntryCard.jsx
import React from 'react';

function DiaryEntryCard({ entry }) {
  const { title, content, createdAt, weather } = entry;

  // Format the creation timestamp
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="diary-entry-card">
      <h3>{title}</h3>
      <p>{content}</p>
      {weather && <p><strong>Weather:</strong> {weather}</p>}
      <p><small>Created on: {formattedDate}</small></p>
    </div>
  );
}

export default DiaryEntryCard;

