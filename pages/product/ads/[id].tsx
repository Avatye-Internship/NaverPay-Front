import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import DetailHeader from '../src/component/DetailHeader';
import DetailFooter from '../src/component/DetailFooter';
import styles from '../styles/mainpage.module.css';

const PointButton = styled(Button)(() => ({

  marginTop: '40px',
  fontSize: '26px',
  fontWeight: 'bolder',
  backgroundColor: '#09b65a',
  height: '84px',
}));

interface MatchParams {
    id: string;
}

function ProductDetail(props: MatchParams) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`/api/product/ads/${id}`).then((res) => res.data)
      .then((res) => {
        if (res.statusCode === 200) {
          setData(res.data);
        }
      });
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <DetailHeader />
      {/* 메인 컨텐츠 박스 */}
      <Box display="flex" flex={1}>

        <Grid container flex={1} direction="column" alignItems="center" width={540}>
          <Grid>
            <img alt="product_img" width={540} src={data.detail_img} />
          </Grid>
          <Grid width={540}>
            <Typography marginTop="40px" fontSize="28px" fontWeight="bold" color="black">{data.description}</Typography>
            <Typography marginTop="14px" fontSize="22px" color="#888888">
              네이버 포인트
              {' '}
              {data.product_point}
              원 지급!
              {' '}
            </Typography>
          </Grid>
          <Grid width={540}>
            <PointButton variant="contained" fullWidth>참여하고 포인트 받기</PointButton>
          </Grid>
        </Grid>
      </Box>
      <DetailFooter />
    </Box>
  );
}
export default ProductDetail;
