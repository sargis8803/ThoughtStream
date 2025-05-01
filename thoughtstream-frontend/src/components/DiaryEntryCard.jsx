import React from 'react';

function DiaryEntryCard({ entry }) {
  const { title, content, createdAt, weather } = entry;
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="diary-entry-card">
      <h3>{title}</h3>
      <p>{content}</p>

      {/* Check if weather is an object and display its properties */}
      {weather && (
        <div>
          <p><strong>Weather:</strong></p>
          {weather.condition && <p>Condition: {weather.condition}</p>}
          {weather.temperature && <p>Temperature: {weather.temperature}°C</p>}
          {weather.location && <p>Location: {weather.location}</p>}
        </div>
      )}

      <p><small>Created on: {formattedDate}</small></p>
    </div>
  );
}

export default DiaryEntryCard;


