import React, { useEffect, useRef } from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import 'leaflet/dist/leaflet.css';

// We need to import Leaflet this way for proper SSR/CSR compatibility
const MapComponent = ({ route }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        // Dynamically import Leaflet only on client-side
        const initializeMap = async () => {
            if (typeof window !== 'undefined') {
                const L = await import('leaflet');

                // Fix Leaflet's default icon issue
                const icon = require('leaflet/dist/images/marker-icon.png').default;
                const iconShadow = require('leaflet/dist/images/marker-shadow.png').default;

                let DefaultIcon = L.icon({
                    iconUrl: icon,
                    shadowUrl: iconShadow,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41]
                });
                L.Marker.prototype.options.icon = DefaultIcon;

                return L;
            }
            return null;
        };

        let isMounted = true;

        const setupMap = async () => {
            try {
                setIsLoading(true);
                const L = await initializeMap();

                if (!L || !isMounted || !mapRef.current) return;

                // Set default center if no route is provided
                const defaultCenter = [39.8283, -98.5795]; // Center of USA
                const defaultZoom = 4;

                // Ensure route is always an array
                const safeRoute = Array.isArray(route) && route.length > 0 ? route : [];
                const center = safeRoute.length > 0 ? safeRoute[0] : defaultCenter;

                // Cleanup old map instance if it exists
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.remove();
                }

                // Create new map with a delay to ensure DOM is ready
                setTimeout(() => {
                    if (!isMounted || !mapRef.current) return;

                    // Create the map instance
                    mapInstanceRef.current = L.map(mapRef.current).setView(center, defaultZoom);

                    // Add tile layer
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(mapInstanceRef.current);

                    // Add route if available
                    if (safeRoute.length > 0) {
                        const polyline = L.polyline(safeRoute, { color: 'blue' }).addTo(mapInstanceRef.current);
                        mapInstanceRef.current.fitBounds(polyline.getBounds());
                    }

                    setIsLoading(false);
                }, 100);
            } catch (error) {
                console.error("Error initializing map:", error);
                setIsLoading(false);
            }
        };

        setupMap();

        // Cleanup function
        return () => {
            isMounted = false;
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [route]);

    // This effect ensures map is properly resized after container is fully rendered
    useEffect(() => {
        if (mapInstanceRef.current) {
            setTimeout(() => {
                mapInstanceRef.current.invalidateSize();
            }, 250);
        }
    }, [isLoading]);

    return (
        <Paper elevation={3} sx={{ p: 2, height: '450px', width: '450px', position: 'relative' }}>
            <Typography variant="h6" gutterBottom>Route Map</Typography>

            {isLoading && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="absolute"
                    top="50px"
                    left={0}
                    right={0}
                    bottom={0}
                >
                    <CircularProgress />
                </Box>
            )}

            <Box
                ref={mapRef}
                sx={{
                    position: 'absolute',
                    top: '50px',
                    left: '16px', // Account for padding
                    right: '-50px',
                    bottom: '16px',
                    borderRadius: 1,
                    visibility: isLoading ? 'hidden' : 'visible'
                }}
            />

            {!isLoading && Array.isArray(route) && route.length === 0 && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '16px'
                    }}
                >
                    Submit a trip to see the route on the map.
                </Typography>
            )}
        </Paper>
        // <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
        //   <Typography variant="h6" gutterBottom>Route Map</Typography>
        //   {isLoading && (
        //     <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        //       <CircularProgress />
        //     </Box>
        //   )}
        //   <Box 
        //     ref={mapRef} 
        //     sx={{ 
        //       height: '100px', 
        //       width: '100%',
        //       borderRadius: 1,
        //       visibility: isLoading ? 'hidden' : 'visible'
        //     }}
        //   />
        //   {!isLoading && Array.isArray(route) && route.length === 0 && (
        //     <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        //       Submit a trip to see the route on the map.
        //     </Typography>
        //   )}
        // </Paper>
    );
};

export default MapComponent;