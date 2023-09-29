import './App.css';
import { useEffect, useState } from 'react';

function App() {
const [data, setData] = useState([]);

const fetchData = () => {
  return fetch("https://backend-microservice-urlshortener.onrender.com/api/getALL")
    .then((response) => response.json())
    .then((data) => setData(data));
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
      <button onclick="fetchData()">Fetch Data</button>
        <ul>
          {data.map((dataObj, index) => (
            <li key={dataObj.id}>{dataObj.url}{dataObj.short_url}</li>
          ))}
          
        </ul>
    
      </body>
    </div>
  );
}

export default App;
