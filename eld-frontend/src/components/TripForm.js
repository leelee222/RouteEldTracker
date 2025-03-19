import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Stack, 
  Paper, 
  Typography, 
  Box, 
  Autocomplete 
} from '@mui/material';

const TripForm = ({ onSubmit }) => {
    const cityOptions = [
      "New York, NY",
      "Boston, MA", 
      "Washington, DC",
      "Chicago, IL",
      "Los Angeles, CA",
      "San Francisco, CA",
      "Seattle, WA",
      "Miami, FL",
      "Dallas, TX",
      "Denver, CO"
    ];

    const [trip, setTrip] = useState({
        current_location: '',
        pickup_location: '',
        dropoff_location: '',
        current_cycle_used: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (onSubmit) {
            onSubmit(trip);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Enter Trip Details</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={3}>
                    <Autocomplete
                        id="current_location"
                        options={cityOptions}
                        freeSolo
                        value={trip.current_location}
                        onChange={(e, newValue) => setTrip({ ...trip, current_location: newValue || '' })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Current Location"
                                variant="outlined"
                                placeholder="e.g., New York, NY"
                                required
                            />
                        )}
                    />
                    
                    <Autocomplete
                        id="pickup_location"
                        options={cityOptions}
                        freeSolo
                        value={trip.pickup_location}
                        onChange={(e, newValue) => setTrip({ ...trip, pickup_location: newValue || '' })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Pickup Location"
                                variant="outlined"
                                placeholder="e.g., Chicago, IL"
                                required
                            />
                        )}
                    />
                    
                    <Autocomplete
                        id="dropoff_location"
                        options={cityOptions}
                        freeSolo
                        value={trip.dropoff_location}
                        onChange={(e, newValue) => setTrip({ ...trip, dropoff_location: newValue || '' })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Dropoff Location"
                                variant="outlined"
                                placeholder="e.g., San Francisco, CA"
                                required
                            />
                        )}
                    />
                    
                    <TextField
                        id="current_cycle_used"
                        label="Current Cycle Used (Hrs)"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 70 } }}
                        value={trip.current_cycle_used}
                        onChange={(e) => setTrip({ ...trip, current_cycle_used: Number(e.target.value) })}
                        required
                    />
                    
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        fullWidth
                    >
                        Calculate Route
                    </Button>
                </Stack>
            </Box>
        </Paper>
    );
};

export default TripForm;