import React, { useState, useEffect } from 'react';

const PostBox = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0); // Initialize likes from post prop or default to 0
  const [liked, setLiked] = useState(false);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Fetch weather data using the API and geographic coordinates from post.location
    // Example: Replace API_KEY with your actual API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${post.title}&appid=344eabda7a745531884c040b6028acb4`)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, [post.location]);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const getTemperatureEmoji = (temperature) => {
    if (temperature - 273.15 <= 15) {
      return '❄️'; // Cold emoji
    } else if (temperature - 273.15 > 10 && temperature - 273.15 <= 25) {
      return '☀️'; // Moderate emoji
    } else {
      return '🔥'; // Hot emoji
    }
  };

  return (
    <div className="post-box">
      {post.image && (
        <div className="post-image">
          <img src={post.image} alt="Post" />
        </div>
      )}
      <h2>
        {post.title}
        {weather && weather.main ? (
          <span>, <br/> Current Temprature: {(weather.main.temp - 273.15).toFixed()}°C {getTemperatureEmoji(weather.main.temp)}</span>
        ) : (
          <span>, Weather data not available</span>
        )}
      </h2>


      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="post-weather">
      </div>
      <div className="post-like">
        <button onClick={handleLike}>
          {liked ? 'Unlike' : 'Like'}
        </button>
        <span>{likes} {likes === 1 ? 'like' : 'likes'}</span>
      </div>
    </div>
  );
};

export default PostBox;
