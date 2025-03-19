import React from 'react';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Divider 
} from '@mui/material';

const LogSheet = ({ logs }) => {
    return (
        <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>ELD Logs</Typography>
            
            {logs.length > 0 ? (
                <List>
                    {logs.map((log, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                <ListItemText 
                                    primary={log} 
                                />
                            </ListItem>
                            {index < logs.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    No ELD logs available. Please submit a trip to generate logs.
                </Typography>
            )}
        </Paper>
    );
};

export default LogSheet;