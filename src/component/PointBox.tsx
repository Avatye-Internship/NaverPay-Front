import { styled } from '@mui/material/styles';
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import naverPayLogo from '../images/naver-pay-logo.png';

const PointPaper = styled(Paper)(() => ({
  width: '265px',
  background: 'linear-gradient(134deg,#0dc56c -2%,#09aa9e 98%)',
  borderRadius: 16,
}));
function PointBox() {
  const [point, setPoint] = useState(0);
  const [nickname, setNickname] = useState('');
  const [profileImg, setProfileImg] = useState('');

  useEffect(() => {
    axios.get('/api/users/point').then((res) => res.data)
      .then((res) => {
        if (res.statusCode === 200) {
          setPoint(res.data.point);
        }
      });
  });

  useEffect(() => {
    axios.get('/api/users/profile').then((res) => res.data)
      .then((res) => {
        setNickname(res.data.nickname);
        setProfileImg(res.data.profile_img);
      });
  });
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="24px"
      paddingLeft="24px"
      paddingRight="24px"
    >
      <PointPaper elevation={2}>
        <Box margin={2}>
          <Grid container spacing={2}>
            <Grid item>
              <Image src={naverPayLogo} width={50} alt="headerlogo" />
            </Grid>
            <Grid item>
              <Typography
                color="white"
                sx={{
                  fontSize: '15px', lineHeight: '22px', fontWeight: 'bold', textShadow: '0 1px 0 rgba(0,0,0,.3)',
                }}
              >
                {nickname}
                님의 포인트
              </Typography>
            </Grid>
          </Grid>
          <Typography align="center" color="white" marginTop={2} sx={{ fontSize: '22px', fontWeight: 'bold', textShadow: '0 1px 0 rgba(0,0,0,.3)' }}>
            {point}
            {' '}
            원
          </Typography>
        </Box>
      </PointPaper>
    </Box>
  );
}

export default PointBox;
