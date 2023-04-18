import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import simpleLogo from '../images/simple-logo.png';

function DetailHeader() {
  return (
    <Box height="57px" sx={{ bgcolor: '#1ec800', textAlign: 'center' }}>
      <Grid container alignItems="center" sx={{ display: 'flex', padding: '5px' }}>
        <Image src={simpleLogo} width={40} alt="naverlogo" />
        <Typography color="white" sx={{ fontSize: '20px', fontWeight: 'bold' }}>Pay</Typography>
      </Grid>
    </Box>
  );
}

export default DetailHeader;
