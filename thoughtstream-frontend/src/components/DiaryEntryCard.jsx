import React from "react";

function DiaryEntryCard({title, content, timestamp, weather}){
    return(
        <div className="DEC">
            <h2 className="title">{title}</h2>
            <p className="timeStamp">
                {new Date(timestamp).toLocaleString()}
            </p>
            <p className="content">{content}</p>
            {weather &&(
                <div className="weatherInfo">
                    <p>Current Weather: {weather.description}</p> 
                    {weather.temp && <p>Temperature: {weather.temo}</p>}
                </div>
            )}
        </div>
    );
}

export default DiaryEntryCard;