import './App.css';
import { useEffect, useState } from 'react';

function App() {
const [api, setAPI] = useState([]);

const fetchData = () => {
  return fetch("https://backend-microservice-urlshortener.onrender.com/api/getALL")
    .then((response) => response.json())
    .then((data) => setAPI(data));
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
      <button onlick="fetchData()">Fetch Data</button>
      <div class ="api-container">
        <ul class="api-ul">
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
