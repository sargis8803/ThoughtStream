import React from 'react';

function DiaryEntryCard({ entry }) {
  const { title, content, createdAt, weather } = entry;
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="diaryEntryCard">
      <h3>{title}</h3>
      <p>{content}</p>
      {weather && (
        <div>
          {weather.condition && <p>Condition at the time: {weather.condition}</p>}
          {weather.location && <p>Location: {weather.location}</p>}
        </div>
      )}
      <p><small>Created on: {formattedDate}</small></p>
    </div>
  );
}

export default DiaryEntryCard;