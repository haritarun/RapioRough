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


import React, { useState } from "react";

const App= () =>{
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Fetch address suggestions (Photon API)
  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(input)}&limit=5`;

    const response = await fetch(url);
    const data = await response.json();

    if (data && data.features) {
      setSuggestions(data.features);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const selectLocation = (place) => {
    const coords = place.geometry.coordinates;
    setSelectedLocation({
      address: place.properties.name || place.properties.city || place.properties.country,
      lat: coords[1],
      lng: coords[0],
    });
    setQuery(place.properties.name || "");
    setSuggestions([]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📍 Free Address Autocomplete (OSM)</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        placeholder="Enter address"
        style={{ padding: "5px", width: "300px" }}
      />

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul
          style={{
            border: "1px solid #ccc",
            marginTop: "5px",
            listStyle: "none",
            padding: "5px",
            width: "300px",
            background: "#fff",
            position: "absolute",
            zIndex: 10,
          }}
        >
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              onClick={() => selectLocation(s)}
              style={{ padding: "5px", cursor: "pointer" }}
            >
              {s.properties.name}, {s.properties.city || ""} {s.properties.country || ""}
            </li>
          ))}
        </ul>
      )}

      {/* Show selected location */}
      {selectedLocation && (
        <div style={{ marginTop: "20px" }}>
          <h3>✅ Selected Location</h3>
          <p><b>Address:</b> {selectedLocation.address}</p>
          <p><b>Latitude:</b> {selectedLocation.lat}</p>
          <p><b>Longitude:</b> {selectedLocation.lng}</p>
        </div>
      )}
    </div>
  );
}

export default App;