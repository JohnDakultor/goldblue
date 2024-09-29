import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import "./../App.css";

export default function Cards({ title, customStyles, children }) {
  return (
    <Card className="card" sx={{ ...customStyles }}>
      <CardContent>
        <Typography variant="h5" component="div" fontWeight="bold">
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
