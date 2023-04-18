import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import DetailHeader from '../src/component/DetailHeader';
import DetailFooter from '../src/component/DetailFooter';
import styles from '../styles/mainpage.module.css';
import { useState, useEffect } from 'react';



function ProductDetail() {
  const [data, setData] = useState([]);

  useEffect(())
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <DetailHeader />
      <Box display="flex" flex={1}>
        <Grid container flex={1} direction="column" alignItems="center" columns={{ xs: 4, md: 12 }}>
          <Grid>
            <img alt="product_img" width={540} src="https://cdn-ao.adison.co/uploads/images/2023/4/14/efaed7cbdf7218727977.jpg" />
          </Grid>
          <Grid item>
            <Typography>제목 : 클라마스크 브랜드 스토어 내용 : 알림받기 추가하면</Typography>
            <Typography>즉시적립! (단, 24시간 내 알림해제 시 포인트 회수)</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" fullWidth sx={{ fontSize: '18px', fontWeight: 'bolder', backgroundColor: '#09b65a' }}>참여하고 포인트 받기</Button>
          </Grid>
        </Grid>
        {/* <Box flex={1}><h1>메인</h1></Box> */}
      </Box>
      <DetailFooter />
    </Box>
  );
}
export default ProductDetail;
