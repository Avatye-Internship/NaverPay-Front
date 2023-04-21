import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FormHelperText } from '@mui/material';

// 테마 색상을 변경
const theme = createTheme({
  palette: {
    primary: {
      main: '#03c75a', // 체크박스에 선택된 경우의 색상
    },
    secondary: {
      main: '#0000ff', // 체크박스에 선택되지 않은 경우의 색상
    },
  },
});

function CustomCheckbox(props: any) {
  return (
    <ThemeProvider theme={theme}>
      <Checkbox {...props} />
    </ThemeProvider>
  );
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'© '}
      <Link color="inherit" href="https://naver.com/">
        NAVER Corp.
      </Link>
    </Typography>
  );
}

export default function SignUp() {
  // 초기값 세팅
  const [email, setEmail] = React.useState('');
  const [emailCode, setEmailCode] = React.useState('');
  const [realCode, setRealCode] = React.useState('');
  const [name, setName] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [rePwd, setRePwd] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [birth, setBirth] = React.useState('');
  const [gender, setGender] = React.useState<string | null>(null);
  const [allCheck, setAllCheck] = React.useState(false);
  const [useCheck, setUseCheck] = React.useState(false);
  const [infoCheck, setInfoCheck] = React.useState(false);
  const [marketingCheck, setMarketingCheck] = React.useState(false);
  const [register, setRegister] = React.useState(false);

  // 유효성 검사
  const [emailValid, setEmailValid] = React.useState(true);
  const [emailCodeValid, setEmailCodeValid] = React.useState(true);
  const [pwdValid, setPwdValid] = React.useState(true);
  const [repwdValid, setRepwdValid] = React.useState(true);
  const [nameValid, setNameValid] = React.useState(true);
  const [birthValid, setBirthValid] = React.useState(true);
  const [nicknameValid, setNicknameValid] = React.useState(true);

  // 에러 메세지
  const [emailError, setEmailError] = React.useState('');
  const [emailCodeErr, setEmailCodeErr] = React.useState('');
  const [pwdError, setPwdError] = React.useState('');
  const [repwdError, setRepwdError] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [birthError, setBirthError] = React.useState('');
  const [nicknameError, setNicknameError] = React.useState('');
  const [termError, setTermError] = React.useState('');
  const [registerError, setRegisterError] = React.useState('');
  const router = useRouter();

  // 이메일
  const onEmailHandler = (e : any) => {
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurr = e.target.value;
    setEmail(emailCurr);
    if (!emailRegex.test(emailCurr) || emailCurr === '') {
      setEmailError('이메일 형식으로 입력해주세요');
      setEmailValid(false);
    } else {
      setEmailValid(true);
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

  // 비밀번호
  const onPwdHandler = (e : any) => {
    const pwdRegex = /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    const pwdCurr = e.target.value;
    setPwd(pwdCurr);
    if (!pwdRegex.test(pwdCurr) || pwd === '') {
      setPwdError('영어와 숫자를 조합해 8~15자로 입력해주세요');
      setPwdValid(false);
    } else {
      setPwdValid(true);
    }
  };

  // 비밀번호 확인
  const onPwdConfirmHandler = (e : any) => {
    const PwdConfirmCurr = e.target.value;
    setRePwd(PwdConfirmCurr);
    if (pwd !== PwdConfirmCurr || rePwd === '') {
      setRepwdError('비밀번호가 일치하지 않습니다');
      setRepwdValid(false);
    } else {
      setRepwdValid(true);
    }
  };

  // 이름 확인
  const onNameHandler = (e : any) => {
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    const nameCurr = e.target.value;
    setName(nameCurr);
    if (!nameRegex.test(nameCurr) || name === '') {
      setNameError('올바른 이름을 입력해주세요.');
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  };

  // 생년월일 확인
  const onBirthHandler = (e : any) => {
    const birthCurr = e.target.value;
    setBirth(birthCurr);
    if (birth?.length > 0 && birth?.length !== 8) {
      setBirthError('생년월일을 8자리 입력해주세요.');
      setBirthValid(false);
    } else {
      setBirthValid(true);
    }
  };

  // 닉네임 확인
  const onNicknameHandler = (e : any) => {
    const nicknameRegex = /^[가-힣a-zA-Z]+$/;
    const nicknameCurr = e.target.value;
    setNickname(nicknameCurr);
    if (!nicknameRegex.test(nicknameCurr) || nickname === '') {
      setNicknameError('올바른 닉네임을 입력해주세요.');
      setNicknameValid(false);
    } else {
      setNicknameValid(true);
    }
  };

  // 성별 확인
  const onGenderHandler = (e : any) => {
    const genderCurr = e.target.value;
    setGender(genderCurr);
    if (genderCurr === '') {
      setGender(null);
    }
  };

  const allBtnEvent = () => { // 전체 동의
    if (allCheck === false) {
      setAllCheck(true);
      setInfoCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
      setTermError('');
    } else {
      setAllCheck(false);
      setInfoCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
      setTermError('필수 약관에 동의해주세요.');
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
      setTermError('필수 약관에 동의해주세요.');
    }
  };

  const infoBtnEvent = () => {
    if (infoCheck === false) {
      setInfoCheck(true);
    } else {
      setInfoCheck(false);
      setTermError('필수 약관에 동의해주세요.');
    }
  };

  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };

  React.useEffect(() => {
    if (infoCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
    if (infoCheck === true && useCheck === true) {
      setTermError('');
    }
    if (
      (emailValid === true && email.length > 0)
      && (pwdValid === true && pwd.length > 0)
      && (repwdValid === true && rePwd.length > 0)
      && (nameValid === true && name.length > 0)
      && (birthValid === true)
      && (nicknameValid === true && nickname.length > 0)
      && (useCheck === true) && (infoCheck === true)
    ) {
      setRegister(true);
      setRegisterError('');
    }
  }, [infoCheck, useCheck, marketingCheck]);

  const onhandlePost = async () => {
    const signUpBody = {
      nickname,
      email,
      pwd,
      name,
      gender,
      birth,
      terms: [
        {
          term_id: 1,
          is_agree: useCheck,
        },
        {
          term_id: 2,
          is_agree: infoCheck,
        },
        {
          term_id: 3,
          is_agree: marketingCheck,
        },
      ],
    };
    const response = await axios.post('/api/users', signUpBody)
      .then((res) => res.data);
    if (response.statusCode === 201) {
      alert('회원가입에 성공했습니다.');
      router.push('/login');
      console.log(response.data);
    } else {
      setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
      alert('회원가입에 실패하였습니다.');
      router.push('/sign-up');
    }
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    console.log(emailValid);
    if (
      (emailValid === true && email.length > 0)
      && (pwdValid === true && pwd.length > 0)
      && (repwdValid === true && rePwd.length > 0)
      && (nameValid === true && name.length > 0)
      && (birthValid === true)
      && (nicknameValid === true && nickname.length > 0)
      && (useCheck === true) && (infoCheck === true)
    ) {
      await onhandlePost();
    } else {
      setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image src="/MicrosoftTeams-image.png" priority alt="naver" width={165} height={35} />
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
            <Grid container spacing={3} sx={{ mt: -1 }}>
              <Grid container spacing={2} sx={{ mt: -1 }} component="form" onSubmit={clickCodeSendBtn}>
                <Grid item xs={8}>
                  <TextField
                    onBlur={onEmailHandler}
                    onChange={onEmailHandler}
                    required
                    fullWidth
                    autoFocus
                    id="email"
                    label="이메일"
                    error={emailValid !== true}
                    helperText={emailValid !== true ? emailError : ''}
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
              <Grid item xs={12}>
                <TextField
                  onBlur={onPwdHandler}
                  onChange={onPwdHandler}
                  required
                  fullWidth
                  autoFocus
                  id="pwd"
                  label="비밀번호 (숫자+영문자 8자리 이상 15자리 이하)"
                  name="pwd"
                  type="password"
                  error={pwdValid !== true}
                  helperText={pwdValid !== true ? pwdError : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onBlur={onPwdConfirmHandler}
                  onChange={onPwdConfirmHandler}
                  required
                  fullWidth
                  autoFocus
                  id="checkPwd"
                  label="비밀번호 재확인"
                  name="checkPwd"
                  type="password"
                  error={repwdValid !== true}
                  helperText={repwdValid !== true ? repwdError : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onBlur={onNameHandler}
                  onChange={onNameHandler}
                  required
                  fullWidth
                  autoFocus
                  name="name"
                  label="이름"
                  type="name"
                  id="name"
                  error={nameValid !== true}
                  helperText={nameValid !== true ? nameError : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onBlur={onBirthHandler}
                  onChange={onBirthHandler}
                  fullWidth
                  autoFocus
                  name="birth"
                  label="생년월일"
                  type="birth"
                  id="birth"
                  error={birthValid !== true}
                  helperText={birthValid !== true ? birthError : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="gender-label">성별</InputLabel>
                  <Select labelId="gender-label" label="성별" placeholder="성별" defaultValue="" onChange={onGenderHandler}>
                    <MenuItem value="">성별</MenuItem>
                    <MenuItem value="남성">남성</MenuItem>
                    <MenuItem value="여성">여성</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onBlur={onNicknameHandler}
                  onChange={onNicknameHandler}
                  required
                  fullWidth
                  autoFocus
                  name="nickname"
                  label="닉네임"
                  type="nickname"
                  id="nickname"
                  error={nicknameValid !== true}
                  helperText={nicknameValid !== true ? nicknameError : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<CustomCheckbox value="termAll" id="all-check" checked={allCheck} onChange={allBtnEvent} />}
                  label="전체동의"
                />
                <p />
                <FormControlLabel
                  control={<CustomCheckbox value="term1" id="check1" checked={useCheck} onChange={useBtnEvent} />}
                  label="이용약관 동의(필수)"
                />
                <FormControlLabel
                  control={<CustomCheckbox value="term2" id="check2" checked={infoCheck} onChange={infoBtnEvent} />}
                  label="개인정보 수집 및 이용 동의(필수)"
                />
                <FormControlLabel
                  control={<CustomCheckbox value="term3" id="check3" checked={marketingCheck} onChange={marketingBtnEvent} />}
                  label="마케팅약관 동의(선택)"
                />
                <FormHelperText style={{ color: 'red', fontSize: '13px' }}>{termError}</FormHelperText>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              color="success"
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              style={{ fontSize: '18px', fontWeight: 'bolder', backgroundColor: '#03c75a' }}
            >
              가입하기
            </Button>
            <FormHelperText style={{ color: 'red', fontSize: '13px' }}>{registerError}</FormHelperText>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
