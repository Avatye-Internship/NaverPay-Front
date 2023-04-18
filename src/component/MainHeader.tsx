import Image from 'next/image';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import naverPayLogo from '../images/naver-pay-logo.png';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: 'white',
  display: 'block',
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 72,
  },
}));
function MainHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static">
        <StyledToolbar>
          {/* <Box sx={{ mr: 2 }}> */}
          <Image src={naverPayLogo} width={76} alt="headerlogo" />
          {/* </Box> */}
          <Typography
            color="black"
            align="center"
            variant="h6"
            noWrap
            component="div"
            sx={{ alignSelf: 'flex-end' }}
          >
            홈
          </Typography>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
