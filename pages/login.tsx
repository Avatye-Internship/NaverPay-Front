import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import naverlogo from '../src/images/naver-logo.png';
// import { setCookie } from '../src/cookie';

// 테마 색상을 변경
export const theme = createTheme({
  palette: {
    primary: {
      main: '#03c75a', // 체크박스에 선택된 경우의 색상
    },
    secondary: {
      main: '#0000ff', // 체크박스에 선택되지 않은 경우의 색상
    },
  },
});

const validationSchema = yup.object().shape({
  email: yup.string().required('이메일을 입력해주세요').email('이메일 형식이 올바르지 않습니다.'),
  password: yup.string().required('비밀번호를 입력해주세요').matches(/^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,15}$/, '영어와 숫자를 조합해 8~15자로 입력해주세요'),
});

function LoginPage() {
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  const router = useRouter();
  const onSubmit = async (data) => {
    const response = await axios.post('/api/users/login/local', { email: data.email, pwd: data.password })
      .then((res) => res.data);
        // setCookie('accessToken', res.data.data.token, { path: '/', secure: true, sameSite: 'none' });
    if (response.statusCode === 200) {
      alert('로그인에 성공했습니다.');
      router.push('/product');
    } else {
      alert('등록되지 않은 회원입니다.');
      reset();
    }
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Box sx={{
              display: 'flex',
            }}
            >
              <Image priority src={naverlogo} width={190} alt="naver" />
            </Box>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="email"
                  defaultValue=""
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      label="Email"
                      required
                      fullWidth
                      autoComplete="email"
                      placeholder="이메일"
                      autoFocus
                      helperText={error ? error.message : ''}
                      error={!!error}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlineOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="password"
                  defaultValue=""
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      helperText={error ? error.message : ''}
                      margin="normal"
                      label="Password"
                      type="password"
                      required
                      fullWidth
                      name="password"
                      autoComplete="current-password"
                      placeholder="비밀번호"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HttpsOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 3, height: 50 }} style={{ fontSize: '18px', fontWeight: 'bolder', backgroundColor: '#03c75a' }}>로그인</Button>
              </Box>

            </Paper>
            <Box sx={{
              display: 'flex',
            }}
            >
              <Grid container justifyContent="center" alignItems="center" spacing={4}>
                <Grid item>
                  <Link href="/find-pwd" underline="none" color="gray">비밀번호 찾기</Link>
                </Grid>
                <Grid item>
                  <Link href="/sign-up" underline="none" color="gray">회원가입</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default LoginPage;
