import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ lat: latitude, lon: longitude });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async function fetchLocation() {
    try {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
    } catch (error) {
      setError("Error getting location:", error);
    }
  }

  async function handleCLick() {
    fetchLocation();
    // useEffect(() => {
    // }, []);
  }

  return (
    <div>
      <h1>Current Location</h1>
      <button onClick={handleCLick}>Click Me to get Coordinates</button>
      {location ? (
        <p>
          Latitude: {location.lat}, Longitude: {location.lon}
        </p>
      ) : null}
    </div>
  );
}

export default App;
