import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
// import 'swiper/swiper.scss';
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
import PointBox from '@/src/component/PointBox';
import MainHeader from '@/src/component/MainHeader';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar, Box, Button, IconButton, List, ListItem, ListItemText, SwipeableDrawer, Typography,
} from '@mui/material';
import { useState } from 'react';

const StyledAccordion = styled(Accordion)(() => ({
  paddingTop: '5px',
  paddingBottom: '5px',
  paddingLeft: '30px',
  paddingRight: '30px',
  width: '532px',
  borderRadius: '25px',
  boxShadow: '0 4px 12px 0 rgba(0,0,0,.04);',
}));

function ExpandCustomIcon() {
  return (
    <IconButton>
      <Avatar sx={{ bgcolor: '#e9e9e9', color: 'black' }}>
        <ExpandMoreIcon />
      </Avatar>
    </IconButton>
  );
}

function CustomAccordion() {
  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<ExpandCustomIcon />}>
        <Box alignItems="center">
          <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>간단 회원가입 하면</Typography>
          <Typography sx={{ fontWeight: 'bold', color: '#09b65a', fontSize: '18px' }}>900~2,500원 즉시적립</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>리스트 컴포넌트</Typography>
      </AccordionDetails>
    </StyledAccordion>
  );
}

SwiperCore.use([Navigation, Pagination]);
export default function Main() {
  return (
    <div>
      {/* 헤더 */}
      <div>
        <MainHeader />
      </div>
      <hr />
      <div>
        {/* 포인트 박스 */}
        <PointBox />
        <div>
          <Swiper
            className="banner"
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
          </Swiper>
        </div>
        <Grid container spacing={3} mt={3} direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <CustomAccordion />
          </Grid>
          <Grid item xs={12}>
            <CustomAccordion />
          </Grid>
          <Grid item xs={12}>
            <CustomAccordion />
          </Grid>
        </Grid>
      </div>
    </div>

  );
}