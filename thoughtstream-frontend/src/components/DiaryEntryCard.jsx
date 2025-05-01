import React from 'react';
//general schema for entry card, how its structure will render in the UI
function DiaryEntryCard({ entry }) {
  const { title, content, createdAt, weather } = entry;
  const formattedDate = new Date(createdAt).toLocaleString();//get current date and format to put into entry

  return (
    <div className="diaryEntryCard">
      <h3>{title}</h3>
      <p>{content}</p>
      {weather && (
        <div>
          {weather.condition && <p>Condition at the time: {weather.condition}</p>}{/*condition info*/}
          {weather.location && <p>Location: {weather.location}</p>}
        </div>
      )}
      <p><small>Created on: {formattedDate}</small></p>{/* hold date here*/}
    </div>
  );
}

export default DiaryEntryCard;