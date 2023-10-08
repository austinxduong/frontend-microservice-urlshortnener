import './App.css';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from './CopyToClipboard'


function App() {
const [api, setAPI] = useState([]);
const [loading, setLoading] = useState(false);
const [position, setPosition] = useState({ x: 0, y: 0 })



async function fetchData() {
  try {
    setLoading(true)
    const response = await fetch('https://backend-microservice-urlshortener.onrender.com/api/getALL')
    const jsonData = await response.json()
    const dataOutput = setAPI(jsonData)
    setLoading(false)
    return dataOutput
  } catch(err) {
    alert("there was an error fetching data from the server")
    console.error("there was an error fetching data", err)
  }
 
}

// async function fetchData() {
//     setLoading(true)
//     return await fetch("https://backend-microservice-urlshortener.onrender.com/api/getALL")
//     .then((response) => response.json())
//     .then((data) => setAPI(data))
//     .then((loading) => setLoading(false))
//     .catch((error) => alert("there was an error fetching data from the server", console.error("there was an error fetching data", error)))
// }
    

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
              
          
              <li key={apiData._id} class="api-urls">{apiData.url} [short URL]: {apiData.short_url}<br /><ul class="url-links"> <CopyToClipboard copyText={"https://backend-microservice-urlshortener.onrender.com" + "/" + "api" + "/" + "shorturl" + "/" + apiData.short_url}/> https://backend-microservice-urlshortener.onrender.com/api/shorturl/{apiData.short_url}</ul></li>
               
            ))}
          </ul>
                
    
             
                
              
        </div>
   
      </body>
    </div>
  );
}

export default App;
