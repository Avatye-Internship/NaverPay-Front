import * as React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button, Container, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { useRouter } from 'next/router';
import MainHeader from '../src/component/MainHeader';
import PointBox from '../src/component/PointBox';
import SwiperComponent from './swiper';

const StyledAccordion = styled(Accordion)(() => ({
  paddingTop: '5px',
  paddingBottom: '5px',
  paddingLeft: '10px',
  paddingRight: '10px',
  width: '532px',
  borderRadius: '10px',
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

function ProductList(props: { data: any; cnt: any;}) {
  const router = useRouter();
  const { data, cnt } = props;
  return (
    <List>
      {Array.isArray(data) && data.map((item : any, index: number) => (
        <React.Fragment key={item.product_id}>
          { index < cnt && (
            <ListItem onClick={() => router.push(`/product/ads/${item.product_id}`)}>
              <Avatar alt="이미지 설명" src={item.main_img} style={{ width: '70px', height: '70px' }} />
              <ListItemText primary={item.name} primaryTypographyProps={{ fontWeight: '700' }} secondary={item.description} />
              <ListItemText
                primary={`${item.product_point}원`}
                primaryTypographyProps={{ fontWeight: '700' }}
                style={{
                  textAlign: 'center', borderRadius: '16px', backgroundColor: '#e3f6ed', color: '#09aa5c', maxWidth: '72px', minHeight: '25px',
                }}
              />
            </ListItem>
          )}
          { cnt === 2 && index + 1 < data.length - 1 && <Divider />}
          { cnt !== 2 && index < data.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}

function CustomAccordion(props: { Category: any; content1: any; content2: any; }) {
  const [data, setData] = React.useState([]);
  const [category, setCategory] = React.useState('all');
  const { Category, content1, content2 } = props;

  const handleSubmit = async (category) => {
    try {
      const response = await axios.get(`/api/product?category=${category}`);
      console.log(response.data);
      console.log(response.status);
      if (response.data.statusCode === 200) {
        setData(response.data.data);
      } else {
        alert('카테고리별 조회 실패');
      }
    } catch (error) {
      alert('카테고리별 조회 실패');
      console.error(error);
    }
  };

  const handleCategoryChange = (event, value: string) => {
    setCategory(value);
    handleSubmit(value);
  };

  return (
    <StyledAccordion>
      <AccordionSummary
        expandIcon={<ExpandCustomIcon />}
        onClick={(event) => handleCategoryChange(event, Category)}
      >
        <Box alignItems="center">
          <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{content1}</Typography>
          <Typography sx={{ fontWeight: 'bold', color: '#09b65a', fontSize: '18px' }}>{content2}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <ProductList data={data} cnt={2} />
      </AccordionDetails>
    </StyledAccordion>
  );
}

export default function Product() {
  const [data, setData] = React.useState([]);
  // const [url, setUrl] = React.useState('');
  const [category, setCategory] = React.useState('all');
  const [color] = React.useState('white');
  // const history = useHistory();

  // React.useEffect(() => {
  //   setUrl(window.location.href);
  // }, []);

  const cardProps = {
    Category: 'card',
    content1: '네이버페이가 추천하는',
    content2: '이 달의 혜택 좋은 카드',
  };

  const shoppingProps = {
    Category: 'shopping',
    content1: '상품을 구매하면 적립금 실화?',
    content2: '역대급 적립 브랜드 모음!',
  };

  const quickrewardProps = {
    Category: 'quickreward',
    content1: '구독 팔로우 방문하면',
    content2: '12~240원 즉시적립',
  };

  const joinProps = {
    Category: 'join',
    content1: '간단 회원가입 하면',
    content2: '900~2,500원 즉시적립',
  };

  const handleSubmit = async (category) => {
    try {
      const response = await axios.get(`/api/product?category=${category}`);
      console.log(category);
      console.log(response.data);
      console.log(response.status);
      if (response.data.statusCode === 200) {
        setData(response.data.data);
      } else {
        alert('카테고리별 조회 실패');
      }
    } catch (error) {
      alert('카테고리별 조회 실패');
      console.error(error);
    }
  };

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryValue = searchParams.get('category') || 'all';
    setCategory(categoryValue);
    handleSubmit(categoryValue);
  }, []);

  // const handleClick = () => {
  //   setColor('black');
  // };

  // const handleClick = (Category) => {
  //   setSearchParams({ category: Category });
  // };
  return (
    <div style={{ backgroundColor: '#F4F6F9' }}>
      <div>
        <MainHeader />
      </div>
      <Container component="main" maxWidth="sm">
        <PointBox />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            alignItems: 'center',
          }}
        />
        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-evenly' }}>
          <a href="/product?category=all">
            <Button variant="contained" style={{ borderRadius: '30px', backgroundColor: color, color: '#767678' }}>
              전체
            </Button>
          </a>
          <a href="/product?category=card">
            <Button variant="contained" style={{ borderRadius: '30px', backgroundColor: '#fff', color: '#767678' }}>
              카드
            </Button>
          </a>
          <a href="/product?category=shopping">
            <Button variant="contained" style={{ borderRadius: '30px', backgroundColor: '#fff', color: '#767678' }}>
              쇼핑
            </Button>
          </a>
          <a href="/product?category=quickreward">
            <Button variant="contained" style={{ borderRadius: '30px', backgroundColor: '#fff', color: '#767678' }}>
              생활
            </Button>
          </a>
          <a href="/product?category=join">
            <Button variant="contained" style={{ borderRadius: '30px', backgroundColor: '#fff', color: '#767678' }}>
              회원가입
            </Button>
          </a>
        </Box>
        { category === 'all' && (
          <>
            <Paper variant="elevation" sx={{ my: { xs: 3 }, p: { xs: 3 } }} style={{ borderRadius: '10px' }}>
              <SwiperComponent data={data} />
            </Paper>
            <Grid container spacing={1.5} mt={1} direction="column" justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <CustomAccordion {...cardProps} />
              </Grid>
              <Grid item xs={12}>
                <CustomAccordion {...shoppingProps} />
              </Grid>
              <Grid item xs={12}>
                <CustomAccordion {...quickrewardProps} />
              </Grid>
              <Grid item xs={12}>
                <CustomAccordion {...joinProps} />
              </Grid>
            </Grid>
          </>
        ) }
        <Paper variant="elevation" sx={{ my: { xs: 5 }, p: { xs: 1 } }} style={{ borderRadius: '10px' }}>
          <ProductList data={data} cnt={data.length} />
        </Paper>
      </Container>
    </div>
  );
}
