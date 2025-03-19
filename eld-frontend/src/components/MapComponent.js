import React, { useEffect, useRef } from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ route }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        const initializeMap = async () => {
            if (typeof window !== 'undefined') {
                const L = await import('leaflet');

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

                const defaultCenter = [39.8283, -98.5795]; // Center of USA
                const defaultZoom = 5;

                const safeRoute = Array.isArray(route) && route.length > 0 ? route : [];
                const center = safeRoute.length > 0 ? safeRoute[0] : defaultCenter;

                if (mapInstanceRef.current) {
                    mapInstanceRef.current.remove();
                }

                setTimeout(() => {
                    if (!isMounted || !mapRef.current) return;

                    mapInstanceRef.current = L.map(mapRef.current, {
                        center: center,
                        zoom: defaultZoom,
                        zoomControl: false, // Prevents unnecessary zooming
                        dragging: true, // Keeps dragging enabled
                        scrollWheelZoom: false // Prevents accidental zooming
                    });

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(mapInstanceRef.current);

                    if (safeRoute.length > 0) {
                        const polyline = L.polyline(safeRoute, { color: 'blue' }).addTo(mapInstanceRef.current);
                        mapInstanceRef.current.fitBounds(polyline.getBounds(), { padding: [50, 50] });
                    }

                    setIsLoading(false);
                }, 100);
            } catch (error) {
                console.error("Error initializing map:", error);
                setIsLoading(false);
            }
        };

        setupMap();

        return () => {
            isMounted = false;
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [route]);

    return (
        <Paper elevation={3} sx={{ p: 2, height: '450px', width: '100%', position: 'relative', overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom>Route Map</Typography>

            {isLoading && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="400px"
                    width="100%"
                >
                    <CircularProgress />
                </Box>
            )}

            <Box
                ref={mapRef}
                sx={{
                    height: '400px',
                    width: '100%',
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
    );
};

export default MapComponent;
