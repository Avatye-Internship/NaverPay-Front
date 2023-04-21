import React from 'react';
import { Box } from '@mui/material';

function ScrollBox({ children }) {
  return (
    <Box sx={{ overflowY: 'scroll', height: 200 }}>
      111
    </Box>
  );
}

export default ScrollBox;
