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
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import naverlogo from '../src/images/naver-logo.png';
import { theme } from './login';

// const validationSchema = yup.object().shape({
//   email: yup.string().required('이메일을 입력해주세요').email('이메일 형식이 올바르지 않습니다.'),
//   password: yup.string().required('비밀번호를 입력해주세요').matches(/^[A-Za-z0-9]{8,15}$/, '영어와 숫자를 조합해 8~15자로 입력해주세요'),
//   emailCode: yup.string().required('인증번호를 입력해주세요'),
//   passwordConfirm: yup.string().required('비밀번호를 입력해주세요').oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
// });
function TestPage() {
  const router = useRouter();
  // 이메일, 인증코드, 비밀번호, 비밀번호 확인
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [realCode, setRealCode] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');

  // 오류메세지 상태 저장
  const [emailErr, setEmailErr] = useState('');
  const [emailCodeErr, setEmailCodeErr] = useState('');
  const [pwdErr, setPwdErr] = useState('');
  const [pwdConfirmErr, setPwdConfirmErr] = useState('');

  // 유효성 검사
  const [emailValid, setEmailValid] = useState(true);
  const [emailCodeValid, setEmailCodeValid] = useState(true);
  const [pwdValid, setPwdValid] = useState(true);
  const [pwdConfirmValid, setPwdConfirmValid] = useState(false); // 비번 같은지 검사

  // 이메일
  const onEmailHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    const emailReg = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurr = e.target.value;
    setEmail(emailCurr);
    if (!emailReg.test(emailCurr)) {
      setEmailErr('이메일 형식으로 입력해주세요');
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  // 비밀번호
  const onPwdHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    const pwdReg = /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    const pwdCurr = e.target.value;
    setPwd(pwdCurr);
    if (!pwdReg.test(pwdCurr)) {
      setPwdErr('영어와 숫자를 조합해 8~15자로 입력해주세요');
      setPwdValid(false);
    } else {
      setPwdValid(true);
    }
  };

  // 이메일 코드 같은지 검사
  const onEmailCodeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailCodeCurr = e.target.value;
    setEmailCode(emailCodeCurr);
    if (realCode === emailCodeCurr) {
      setEmailCodeValid(true);
    } else {
      setEmailCodeErr('인증코드가 일치하지 않습니다');
      setEmailCodeValid(false);
    }
  };

  // 비밀번호 확인
  const onPwdConfirmHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const PwdConfirmCurr = e.target.value;
    setPwdConfirm(PwdConfirmCurr);
    if (pwd === PwdConfirmCurr) {
      setPwdConfirmValid(true);
    } else {
      setPwdConfirmErr('비밀번호가 일치하지 않습니다');
      setPwdConfirmValid(false);
    }
  };

  // 이메일 발송
  const clickCodeSendBtn = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/users/check/email-pwd', { email }).then((res) => {
      console.log(res.data);
      return res.data;
    });
    if (response.statusCode === 200) {
      setRealCode(response.data.verificationCode);
    } else if (response.statusCode === 401) {
      alert(response.message);
      setEmail('');
    }
  };

  // const onSubmit = async (e) => {
  //   const response = await axios.patch('/api/users/find/pwd', { email, pwd });
  //   if (response.data.statusCode === 200) {
  //     alert('비밀번호 변경에 성공했습니다.');
  //     router.push('/login');
  //   } else {
  //     alert('이전 비밀번호와 일치합니다. 다른 비밀번호를 입력해주세요');
  //     setPwd('');
  //     setPwdConfirm('');
  //     setPwdValid(false);
  //     setPwdSameValid(false);
  //   }
  // };

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
              marginBottom: 5,
            }}
            >
              <Image src={naverlogo} width={190} alt="logo" />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }} variant="body1" color="text.primary" align="left">이메일 인증</Typography>
              <Grid container spacing={2} sx={{ mt: -1 }} component="form" onSubmit={clickCodeSendBtn}>
                <Grid item xs={8}>
                  <TextField
                    onChange={onEmailHandler}
                    error={emailValid !== true}
                    helperText={emailValid !== true ? emailErr : ''}
                    fullWidth
                    required
                    placeholder="이메일"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />

                </Grid>
                <Grid item xs={4}>
                  <Button type="button" variant="contained" color="success" fullWidth sx={{ height: 56 }} style={{ fontSize: '14px', fontWeight: 'bolder', backgroundColor: '#03c75a' }}>인증번호 받기</Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={emailCode}
                    error={emailCodeValid !== true}
                    helperText={emailCodeValid !== true ? '인증코드가 일치하지 않습니다' : ''}
                    fullWidth
                    onChange={onEmailCodeHandler}
                    required
                    name="email code"
                    placeholder="인증코드 입력"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box marginTop={5}>
              <Typography sx={{ fontWeight: 'bold' }} variant="body1" color="text.primary" align="left">
                비밀번호 변경
              </Typography>
              <Grid container spacing={3} sx={{ mt: -1 }}>
                <Grid item xs={12}>
                  <TextField

                    fullWidth
                    required
                    type="password"
                    placeholder="새로운 비밀번호"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HttpsOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />

                </Grid>
                <Grid item xs={12}>

                  <TextField
                    required
                    fullWidth
                    placeholder="새로운 비밀번호 확인"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HttpsOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 3, mb: 3, height: 56 }} style={{ fontSize: '18px', fontWeight: 'bolder', backgroundColor: '#03c75a' }}>비밀번호 변경하기</Button>
          </Box>
        </Container>
      </ThemeProvider>
    </div>

  );
}

export default TestPage;
