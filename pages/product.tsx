import * as React from 'react';
import {
  Avatar,
  Box, Button, Container, Divider, List, ListItem, ListItemText, Paper,
} from '@mui/material';
import axios from 'axios';

export default function Product() {
  const [data, setData] = React.useState([]);
  const [url, setUrl] = React.useState('');
  const [category, setCategory] = React.useState('all');

  // const history = useHistory();

  // React.useEffect(() => {
  //   setUrl(window.location.href);
  // }, []);

  const handleSubmit = async (category) => {
    try {
      const response = await axios.get(`/api/product?category=${category}`);
      console.log(category);
      console.log(response.data);
      console.log(response.status);
      if (response.status === 200) {
        setData(response.data);
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

  // const handleClick = (Category) => {
  //   setSearchParams({ category: Category });
  // };

  return (
    <div>
      <p>{url}</p>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
          }}
        />
        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-evenly' }}>
          <a href="/product?category=all">
            <Button variant="contained" style={{ borderRadius: '30px' }}>
              전체
            </Button>
          </a>
          <a href="/product?category=card">
            <Button variant="contained" style={{ borderRadius: '30px' }}>
              카드
            </Button>
          </a>
          <a href="/product?category=shopping">
            <Button variant="contained" style={{ borderRadius: '30px' }}>
              쇼핑
            </Button>
          </a>
          <a href="/product?category=life">
            <Button variant="contained" style={{ borderRadius: '30px' }}>
              생활
            </Button>
          </a>
          <a href="/product?category=join">
            <Button variant="contained" style={{ borderRadius: '30px' }}>
              회원가입
            </Button>
          </a>
        </Box>
        <Paper variant="elevation" sx={{ my: { xs: 3 }, p: { xs: 1 } }} style={{ borderRadius: '10px' }}>
          <List>
            {Array.isArray(data) && data.map((item : any) => (
              <React.Fragment key={item.product_id}>
                <ListItem key={item.product_id}>
                  <Avatar alt="이미지 설명" src={item.main_img} style={{ width: '70px', height: '70px' }} />
                  <ListItemText primary={item.name.replace(/"/gi, '')} secondary={item.description.replace(/"/gi, '')} />
                  <ListItemText
                    primary={`${item.product_point}원`}
                    style={{
                      textAlign: 'center', borderRadius: '16px', backgroundColor: '#e3f6ed', color: '#09aa5c', maxWidth: '72px', minHeight: '25px',
                    }}
                  />
                </ListItem>
                {item.product_id <= data.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>
    </div>
  );
}
