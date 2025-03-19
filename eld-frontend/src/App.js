// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import TripForm from "./components/TripForm";
// import MapComponent from "./components/MapComponent";
// import LogSheet from "./components/LogSheet";
// import "./App.css";

// function App() {
//   const [trips, setTrips] = useState([]);
//   const [route, setRoute] = useState([]);
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTrips = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("https://routeeldtracker-production.up.railway.app/api/trips/");
//         setTrips(response.data);
//         if (response.data.length > 0) {
//           generateRouteAndLogs(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching trips:", error);
//         setError("Failed to fetch trip data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrips();
//   }, []);
  
//   const toRadians = (degrees) => {
//     return degrees * Math.PI / 180;
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
//       console.error("Invalid coordinates:", { lat1, lon1, lat2, lon2 });
//       return 0; // Return a default value instead of NaN
//     }
    
//     const R = 3958.8;
//     const dLat = toRadians(lat2 - lat1);
//     const dLon = toRadians(lon2 - lon1);
//     const a = 
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
//       Math.sin(dLon/2) * Math.sin(dLon/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     const distance = R * c;
//     return distance;
//   };

//   const calculateTripDetails = (trip) => {
//     const distance = calculateDistance(
//       trip.pickup_location_lat, 
//       trip.pickup_location_lng,
//       trip.dropoff_location_lat, 
//       trip.dropoff_location_lng
//     );
    
//     const drivingTime = distance / 55;
    
//     const restStops = Math.ceil(drivingTime / 11);
    
//     const totalTripTime = drivingTime + (restStops * 10) + 2;
//     const arrivalDate = new Date();
//     arrivalDate.setHours(arrivalDate.getHours() + totalTripTime);

    
//     return {
//       distance: distance.toFixed(0),
//       drivingTime: drivingTime, 
//       restStops: restStops,
//       arrivalTime: arrivalDate.toLocaleString()
//     };
//   };

//   const generateRouteAndLogs = (trips) => {
//     console.log(trips);
//     if (trips.length > 0) {
//       const latestTrip = trips[trips.length - 1];

//       const routeCoordinates = [
//         [latestTrip.current_location_lat, latestTrip.current_location_lng], // Current location
//         [latestTrip.pickup_location_lat, latestTrip.pickup_location_lng], // Pickup location
//         [latestTrip.dropoff_location_lat, latestTrip.dropoff_location_lng], // Dropoff location
//       ];
//       setRoute(routeCoordinates);

//       const tripDetails = calculateTripDetails(latestTrip);
      
//       const generatedLogs = [
//         `Trip from ${latestTrip.pickup_location} to ${latestTrip.dropoff_location}`,
//         `Current cycle used: ${latestTrip.current_cycle_used} hours`,
//         `Estimated driving time: ${tripDetails.drivingTime.toFixed(1)} hours`,
//         `Required rest stops: ${tripDetails.restStops}`,
//         `Estimated arrival: ${tripDetails.arrivalTime}`,
//       ];
//       setLogs(generatedLogs);
//     }
//   };

//   const handleFormSubmit = async (tripData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.post("https://routeeldtracker-production.up.railway.app/api/trips/", tripData);
//       console.log(response.data);
//       setTrips([...trips, response.data]);
//       generateRouteAndLogs([...trips, response.data]);
//     } catch (error) {
//       console.error("Error submitting trip:", error);
//       setError("Failed to submit trip data. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>RouteEldTracker</h1>
      
//       {error && <div className="error-message">{error}</div>}
      
//       <div className="container">
//         {/* Trip Form */}
//         <div className="form-container">
//           <h2>Enter Trip Details</h2>
//           <TripForm onSubmit={handleFormSubmit} />
//         </div>

//         {/* Map Component */}
//         <div className="map-container">
//           <h2>Route Map</h2>
//           {/* {loading ? (
//             <div className="loading">Loading map...</div>
//           ) : (
//             <MapComponent route={route} />
//           )} */}
//         </div>

//         {/* ELD Logs */}
//         <div className="logs-container">
//           <h2>ELD Logs</h2>
//           {loading ? (
//             <div className="loading">Calculating logs...</div>
//           ) : (
//             <LogSheet logs={logs} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import TripForm from "./components/TripForm";
// import MapComponent from "./components/MapComponent";
// import LogSheet from "./components/LogSheet";
// import "./App.css";

// function App() {
//   const [trips, setTrips] = useState([]);
//   const [route, setRoute] = useState([]);
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Pre-defined coordinates for common cities
//   const cityCoordinates = {
//     "New York, NY": { lat: 40.7128, lng: -74.0060 },
//     "Boston, MA": { lat: 42.3601, lng: -71.0589 },
//     "Washington, DC": { lat: 38.9072, lng: -77.0369 },
//     "Chicago, IL": { lat: 41.8781, lng: -87.6298 },
//     "Los Angeles, CA": { lat: 34.0522, lng: -118.2437 },
//     "San Francisco, CA": { lat: 37.7749, lng: -122.4194 },
//     "Seattle, WA": { lat: 47.6062, lng: -122.3321 },
//     "Miami, FL": { lat: 25.7617, lng: -80.1918 },
//     "Dallas, TX": { lat: 32.7767, lng: -96.7970 },
//     "Denver, CO": { lat: 39.7392, lng: -104.9903 },
//   };

//   // Get coordinates for a location string
//   const getCoordinates = (locationString) => {
//     if (cityCoordinates[locationString]) {
//       return cityCoordinates[locationString];
//     }
//     // Default to New York if location not found
//     console.warn(`Coordinates not found for: ${locationString}, using default`);
//     return { lat: 40.7128, lng: -74.0060 };
//   };

//   useEffect(() => {
//     const fetchTrips = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("https://routeeldtracker-production.up.railway.app/api/trips/");
//         setTrips(response.data);
//         if (response.data.length > 0) {
//           generateRouteAndLogs(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching trips:", error);
//         setError("Failed to fetch trip data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrips();
//   }, []);
  
//   const toRadians = (degrees) => {
//     return degrees * Math.PI / 180;
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     // Validate coordinates
//     if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
//       console.error("Invalid coordinates:", { lat1, lon1, lat2, lon2 });
//       return 0;
//     }
    
//     const R = 3958.8; // Earth's radius in miles
//     const dLat = toRadians(lat2 - lat1);
//     const dLon = toRadians(lon2 - lon1);
//     const a = 
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
//       Math.sin(dLon/2) * Math.sin(dLon/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     const distance = R * c;
//     return distance;
//   };

//   const calculateTripDetails = (trip) => {
//     // Get coordinates for each location
//     const currentCoords = getCoordinates(trip.current_location);
//     const pickupCoords = getCoordinates(trip.pickup_location);
//     const dropoffCoords = getCoordinates(trip.dropoff_location);
    
//     // Calculate distance from pickup to dropoff
//     const distance = calculateDistance(
//       pickupCoords.lat, 
//       pickupCoords.lng,
//       dropoffCoords.lat, 
//       dropoffCoords.lng
//     );
    
//     // Calculate driving time based on average speed of 55 mph
//     const drivingTime = distance / 55;
    
//     // Calculate required rest stops (1 per 11 hours of driving)
//     const restStops = Math.ceil(drivingTime / 11);
    
//     // Calculate total trip time including rest stops (10 hours each) and 
//     // additional 2 hours for loading/unloading
//     const totalTripTime = drivingTime + (restStops * 10) + 2;
    
//     // Calculate arrival time
//     const arrivalDate = new Date();
//     arrivalDate.setHours(arrivalDate.getHours() + totalTripTime);

//     return {
//       distance: distance.toFixed(0),
//       drivingTime: drivingTime.toFixed(1), 
//       restStops: restStops,
//       arrivalTime: arrivalDate.toLocaleString()
//     };
//   };

//   const generateRouteAndLogs = (trips) => {
//     if (trips.length > 0) {
//       const latestTrip = trips[trips.length - 1];
//       console.log("Latest trip data:", latestTrip);
      
//       // Get coordinates for route
//       const currentCoords = getCoordinates(latestTrip.current_location);
//       const pickupCoords = getCoordinates(latestTrip.pickup_location);
//       const dropoffCoords = getCoordinates(latestTrip.dropoff_location);

//       // Create route coordinates
//       const routeCoordinates = [
//         [currentCoords.lat, currentCoords.lng],
//         [pickupCoords.lat, pickupCoords.lng],
//         [dropoffCoords.lat, dropoffCoords.lng]
//       ];
//       setRoute(routeCoordinates);

//       // Calculate trip details
//       const tripDetails = calculateTripDetails(latestTrip);
//       console.log("Trip details:", tripDetails);
      
//       // Generate logs
//       const generatedLogs = [
//         `Trip from ${latestTrip.pickup_location} to ${latestTrip.dropoff_location}`,
//         `Distance: ${tripDetails.distance} miles`,
//         `Current cycle used: ${latestTrip.current_cycle_used} hours`,
//         `Estimated driving time: ${tripDetails.drivingTime} hours`,
//         `Required rest stops: ${tripDetails.restStops}`,
//         `Estimated arrival: ${tripDetails.arrivalTime}`,
//       ];
//       setLogs(generatedLogs);
//     }
//   };

//   const handleFormSubmit = async (tripData) => {
//     setLoading(true);
//     setError(null);
//     console.log("Submitting trip data:", tripData);
//     try {
//       const response = await axios.post("https://routeeldtracker-production.up.railway.app/api/trips/", tripData);
//       setTrips([...trips, response.data]);
//       generateRouteAndLogs([...trips, response.data]);
//     } catch (error) {
//       console.error("Error submitting trip:", error);
//       setError("Failed to submit trip data. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>RouteEldTracker</h1>
      
//       {error && <div className="error-message">{error}</div>}
      
//       <div className="container">
//         {/* Trip Form */}
//         <div className="form-container">
//           <h2>Enter Trip Details</h2>
//           <TripForm onSubmit={handleFormSubmit} />
//         </div>

//         {/* Map Component */}
//         <div className="map-container">
//           <h2>Route Map</h2>
//           {loading ? (
//             <div className="loading">Loading map...</div>
//           ) : (
//             <MapComponent route={route} />
//           )}
//         </div>

//         {/* ELD Logs */}
//         <div className="logs-container">
//           <h2>ELD Logs</h2>
//           {loading ? (
//             <div className="loading">Calculating logs...</div>
//           ) : (
//             <LogSheet logs={logs} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Alert, 
  LinearProgress, 
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';

import TripForm from "./components/TripForm";
import MapComponent from "./components/MapComponent";
import LogSheet from "./components/LogSheet";
import DriverLogChart from "./components/Export";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [trips, setTrips] = useState([]);
  const [route, setRoute] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pre-defined coordinates for common cities
  const cityCoordinates = {
    "New York, NY": { lat: 40.7128, lng: -74.0060 },
    "Boston, MA": { lat: 42.3601, lng: -71.0589 },
    "Washington, DC": { lat: 38.9072, lng: -77.0369 },
    "Chicago, IL": { lat: 41.8781, lng: -87.6298 },
    "Los Angeles, CA": { lat: 34.0522, lng: -118.2437 },
    "San Francisco, CA": { lat: 37.7749, lng: -122.4194 },
    "Seattle, WA": { lat: 47.6062, lng: -122.3321 },
    "Miami, FL": { lat: 25.7617, lng: -80.1918 },
    "Dallas, TX": { lat: 32.7767, lng: -96.7970 },
    "Denver, CO": { lat: 39.7392, lng: -104.9903 },
  };

  // Get coordinates for a location string
  const getCoordinates = (locationString) => {
    if (cityCoordinates[locationString]) {
      return cityCoordinates[locationString];
    }
    // Default to New York if location not found
    console.warn(`Coordinates not found for: ${locationString}, using default`);
    return { lat: 40.7128, lng: -74.0060 };
  };

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://routeeldtracker-production.up.railway.app/api/trips/");
        setTrips(response.data);
        if (response.data.length > 0) {
          generateRouteAndLogs(response.data);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
        setError("Failed to fetch trip data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);
  
  const toRadians = (degrees) => {
    return degrees * Math.PI / 180;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Validate coordinates
    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
      console.error("Invalid coordinates:", { lat1, lon1, lat2, lon2 });
      return 0;
    }
    
    const R = 3958.8; // Earth's radius in miles
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  const calculateTripDetails = (trip) => {
    // Get coordinates for each location
    const currentCoords = getCoordinates(trip.current_location);
    const pickupCoords = getCoordinates(trip.pickup_location);
    const dropoffCoords = getCoordinates(trip.dropoff_location);
    
    // Calculate distance from pickup to dropoff
    const distance = calculateDistance(
      pickupCoords.lat, 
      pickupCoords.lng,
      dropoffCoords.lat, 
      dropoffCoords.lng
    );
    
    // Calculate driving time based on average speed of 55 mph
    const drivingTime = distance / 55;
    
    // Calculate required rest stops (1 per 11 hours of driving)
    const restStops = Math.ceil(drivingTime / 11);
    
    // Calculate total trip time including rest stops (10 hours each) and 
    // additional 2 hours for loading/unloading
    const totalTripTime = drivingTime + (restStops * 10) + 2;
    
    // Calculate arrival time
    const arrivalDate = new Date();
    arrivalDate.setHours(arrivalDate.getHours() + totalTripTime);

    return {
      distance: distance.toFixed(0),
      drivingTime: drivingTime.toFixed(1), 
      restStops: restStops,
      arrivalTime: arrivalDate.toLocaleString()
    };
  };

  const generateRouteAndLogs = (trips) => {
    if (trips.length > 0) {
      const latestTrip = trips[trips.length - 1];
      console.log("Latest trip data:", latestTrip);
      
      // Get coordinates for route
      const currentCoords = getCoordinates(latestTrip.current_location);
      const pickupCoords = getCoordinates(latestTrip.pickup_location);
      const dropoffCoords = getCoordinates(latestTrip.dropoff_location);

      // Create route coordinates
      const routeCoordinates = [
        [currentCoords.lat, currentCoords.lng],
        [pickupCoords.lat, pickupCoords.lng],
        [dropoffCoords.lat, dropoffCoords.lng]
      ];
      setRoute(routeCoordinates);

      // Calculate trip details
      const tripDetails = calculateTripDetails(latestTrip);
      console.log("Trip details:", tripDetails);
      
      // Generate logs
      const generatedLogs = [
        `Trip from ${latestTrip.pickup_location} to ${latestTrip.dropoff_location}`,
        `Distance: ${tripDetails.distance} miles`,
        `Current cycle used: ${latestTrip.current_cycle_used} hours`,
        `Estimated driving time: ${tripDetails.drivingTime} hours`,
        `Required rest stops: ${tripDetails.restStops}`,
        `Estimated arrival: ${tripDetails.arrivalTime}`,
      ];
      setLogs(generatedLogs);
    }
  };

  const handleFormSubmit = async (tripData) => {
    setLoading(true);
    setError(null);
    console.log("Submitting trip data:", tripData);
    
    try {
      // Add coordinates to the trip data
      const enrichedTripData = {
        ...tripData,
        // Get coordinates for each location
        current_location_lat: getCoordinates(tripData.current_location).lat,
        current_location_lng: getCoordinates(tripData.current_location).lng,
        pickup_location_lat: getCoordinates(tripData.pickup_location).lat,
        pickup_location_lng: getCoordinates(tripData.pickup_location).lng,
        dropoff_location_lat: getCoordinates(tripData.dropoff_location).lat,
        dropoff_location_lng: getCoordinates(tripData.dropoff_location).lng,
      };

      const response = await axios.post("-/api/trips/", enrichedTripData);
      setTrips([...trips, response.data]);
      generateRouteAndLogs([...trips, response.data]);
    } catch (error) {
      console.error("Error submitting trip:", error);
      setError("Failed to submit trip data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', maxHeight: '81.5', py: 4 }}>
        <Container>
          <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
            RouteEldTracker
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {loading && <LinearProgress sx={{ mb: 2 }} />}
          
          <Grid container spacing={2}>
            {/* Trip Form */}
            <Grid item xs={12} md={6}>
              <TripForm onSubmit={handleFormSubmit} />
            </Grid>

            {/* Map Component */}
            <Grid item xs={12} md={6}>
              <MapComponent route={route} />
            </Grid>

            {/* ELD Logs */}
            <Grid item xs={12} md={6}>
              <LogSheet logs={logs} />
            </Grid>
            <Grid item xs={12} md={6}>
              <DriverLogChart/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;