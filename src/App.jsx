// import React, { useEffect, useState } from "react";
// import { S2 } from "s2-geometry"; // Import S2 library

// export default function App() {
//   const [nearbyVehicles, setNearbyVehicles] = useState([]);

//   // Example vehicles
//   const vehicles = [
//     { id: 1, lat: 12.9716, lng: 77.5946 }, // Bangalore
//     { id: 2, lat: 12.9721, lng: 77.5950 }, // Nearby Bangalore
//     { id: 3, lat: 13.0827, lng: 80.2707 }  // Chennai
//   ];

//   // Example user location
//   const userLat = 12.9718;
//   const userLng = 77.5947;

//   useEffect(() => {
//     const level = 12; // Precision level (~3km cells)

//     // Encode vehicles into S2 keys
//     const encodedVehicles = vehicles.map((v) => {
//       const key = S2.latLngToKey(v.lat, v.lng, level);
//       return { ...v, key };
//     });

//     // Encode user location
//     const userKey = S2.latLngToKey(userLat, userLng, level);

//     // Find vehicles in the same cell
//     let nearby = encodedVehicles.filter((v) => v.key === userKey);

//     // If none found, expand search to neighbor cells
//     if (nearby.length === 0) {
//       const neighbors = S2.latLngToNeighborKeys(userLat, userLng, level);
//       nearby = encodedVehicles.filter((v) =>
//         [userKey, ...neighbors].includes(v.key)
//       );
//     }

//     setNearbyVehicles(nearby);
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>🚗 Nearby Vehicles</h2>
//       {nearbyVehicles.length > 0 ? (
//         <ul>
//           {nearbyVehicles.map((v) => (
//             <li key={v.id}>
//               Vehicle {v.id} → Lat: {v.lat}, Lng: {v.lng}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No vehicles nearby</p>
//       )}
//     </div>
//   );
// }


// import React, { useState } from "react";

// const App= () =>{
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   // Fetch address suggestions (Photon API)
//   const fetchSuggestions = async (input) => {
//     if (!input) {
//       setSuggestions([]);
//       return;
//     }

//     const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(input)}&limit=5`;

//     const response = await fetch(url);
//     const data = await response.json();

//     if (data && data.features) {
//       setSuggestions(data.features);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   // Handle suggestion click
//   const selectLocation = (place) => {
//     const coords = place.geometry.coordinates;
//     console.log(place.properties)
//     setSelectedLocation({
//       address: place.properties.name || place.properties.city || place.properties.country,
//       lat: coords[1],
//       lng: coords[0],
//     });
//     setQuery(place.properties.name || "");
//     setSuggestions([]);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>📍 Free Address Autocomplete (OSM)</h2>

//       <input
//         type="text"
//         value={query}
//         onChange={(e) => {
//           setQuery(e.target.value);
//           fetchSuggestions(e.target.value);
//         }}
//         placeholder="Enter address"
//         style={{ padding: "5px", width: "300px" }}
//       />

//       {/* Suggestions dropdown */}
//       {suggestions.length > 0 && (
//         <ul
//           style={{
//             border: "1px solid #ccc",
//             marginTop: "5px",
//             listStyle: "none",
//             padding: "5px",
//             width: "300px",
//             background: "#fff",
//             position: "absolute",
//             zIndex: 10,
//           }}
//         >
//           {suggestions.map((s, idx) => (
//             <li
//               key={idx}
//               onClick={() => selectLocation(s)}
//               style={{ padding: "5px", cursor: "pointer" }}
//             >
//               {s.properties.name}, {s.properties.city || ""} {s.properties.country || ""}
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Show selected location */}
//       {selectedLocation && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>✅ Selected Location</h3>
//           <p><b>Address:</b> {selectedLocation.address}</p>
//           <p><b>Latitude:</b> {selectedLocation.lat}</p>
//           <p><b>Longitude:</b> {selectedLocation.lng}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from "react";

// function App() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   // Send message to backend
//   const sendMessage = async () => {
//     await fetch("http://localhost:5000/send", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message }),
//     });
//     setMessage("");
//   };

//   // Fetch consumed messages every 2 sec
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       const res = await fetch("http://localhost:5000/messages");
//       const data = await res.json();
//       setMessages(data);
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1>Kafka Demo (React + Node.js)</h1>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Enter message"
//       />
//       <button onClick={sendMessage}>Send</button>

//       <h2>Consumed Messages:</h2>
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>{msg}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;




// import React, { useState } from "react";

// function App() {
//   const [rider, setRider] = useState({ lat: "", lng: "" });
//   const [driver, setDriver] = useState({ lat: "", lng: "" });
//   const [eta, setEta] = useState(null);

//   const getETA = async () => {
//     try {
//       const response = await fetch("http://localhost:4000/eta", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ rider, driver }),
//       });
//       const data = await response.json();
//       setEta(data);
//     } catch (err) {
//       console.error("❌ Error:", err);
//     }
//   };

//   return (
//     <div style={{ padding: "30px", fontFamily: "Arial" }}>
//       <h2>🚖 ETA Calculator (OSRM)</h2>

//       <h3>Rider Location</h3>
//       <input
//         type="text"
//         placeholder="Latitude"
//         value={rider.lat}
//         onChange={(e) => setRider({ ...rider, lat: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Longitude"
//         value={rider.lng}
//         onChange={(e) => setRider({ ...rider, lng: e.target.value })}
//       />

//       <h3>Driver Location</h3>
//       <input
//         type="text"
//         placeholder="Latitude"
//         value={driver.lat}
//         onChange={(e) => setDriver({ ...driver, lat: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Longitude"
//         value={driver.lng}
//         onChange={(e) => setDriver({ ...driver, lng: e.target.value })}
//       />

//       <br /><br />
//       <button onClick={getETA}>Get ETA</button>

//       {eta && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>✅ Result:</h3>
//           {eta.error ? (
//             <p style={{ color: "red" }}>{eta.error}</p>
//           ) : (
//             <p>
//               Distance: <b>{eta.distance_km} km</b> <br />
//               Duration: <b>{eta.duration_min} min</b>
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register } from './components/Register';
import Login from './components/Login';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Example of protected route */}
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
