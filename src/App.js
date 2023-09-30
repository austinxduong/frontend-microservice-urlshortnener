import './App.css';
import { useEffect, useState } from 'react';

function App() {
const [api, setAPI] = useState([]);
const [loading, setLoading] = useState(false);

function fetchData() {
  setLoading(true)
  return fetch("https://backend-microservice-urlshortener.onrender.com/api/getALL")
    .then((response) => response.json())
    .then((data) => setAPI(data))
    .then((loading) => setLoading(false));
}

useEffect(() => {
  fetchData();
  console.log(fetchData())
}, [])


  return (
    <div className="App">

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
