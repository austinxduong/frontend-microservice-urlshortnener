import './App.css';
import { useEffect, useState } from 'react';

function App() {
const [api, setAPI] = useState([]);
const [loading, setLoading] = useState(false);
const [position, setPosition] = useState({ x: 0, y: 0 })

function fetchData() {
  setLoading(true)
  return fetch("https://backend-microservice-urlshortener.onrender.com/api/getALL")
    .then((response) => response.json())
    .then((data) => setAPI(data))
    .then((loading) => setLoading(false));
}

useEffect(() => {
  fetchData();

  function handleMove(e) {
    setPosition({ x: e.clientX, y: e.clientY });
  }
  window.addEventListener('pointermove', handleMove);

  return () => {
    window.removeEventListener('pointermove', handleMove);
  }
}, [])


  return (
    <div className="App">

    <div style={{
          position: 'absolute',
          backgroundColor: 'orange',
          borderRadius: '50%',
          opacity: 0.3,
          transform: `translate(${position.x}px, ${position.y}px)`,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
        }} />

      <header className="App-header">
        <h2> Microservice URL shortener</h2>
      </header>
      <body>
      <button onClick={fetchData}>Refresh Data</button>

        <div class="api-container">
        <ul class="api-ul">
        {loading && <p class="loading">Loading from database ...</p>}
            {api.map((apiData) => (
              <li key={apiData._id} class="api-urls">{apiData.url} [short URL]: {apiData.short_url}</li>
            ))}
          </ul>
        </div>
   
      </body>
    </div>
  );
}

export default App;
