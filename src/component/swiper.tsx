import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import {
  Avatar, Box, Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

export default function SwiperComponent(props: { data: any;}) {
  const { data } = props;
  const router = useRouter();
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop
        autoplay={{ delay: 3000 }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        { data.map((item : any, index: number) => (
          <React.Fragment key={item.product_id}>
            { index < 2 && (
            <SwiperSlide onClick={() => router.push(`/product/ads/${item.product_id}`)} key={item.product_id} tag="li" style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center' }}>
              <Box alignItems="center" style={{ display: 'flex', marginRight: '35px' }}>
                <Avatar alt="이미지 설명" src={item.main_img} style={{ width: '70px', height: '70px' }} />
                <Box justifyContent="center" alignItems="center" display="flex" flexDirection="column">
                  <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{item.name}</Typography>
                  <Typography sx={{ fontSize: '15px' }}>{item.description}</Typography>
                  <Box
                    marginTop="10px"
                    sx={{
                      borderRadius: '16px', backgroundColor: '#e3f6ed', color: '#09aa5c', maxWidth: '110px', minHeight: '25px',
                    }}
                  >
                    <Typography
                      marginX="12px"
                      sx={{ fontWeight: 'bold', color: '#09b65a', fontSize: '16px' }}
                    >
                      {item.product_point}
                      원 적립
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
            )}
          </React.Fragment>
        ))}
      </Swiper>
    </div>
  );
}
