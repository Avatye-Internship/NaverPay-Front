import * as React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { FormHelperText } from '@mui/material';

interface TermsForm{
  term1: boolean;
  term2: boolean;
  term3: boolean;
}

interface SignUpForm extends TermsForm{
  email: string;
  pwd: string;
  checkPwd: string;
  name: string;
  birth: string;
  gender: string;
  nickname: string;
}

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
  const [gender, setGender] = React.useState('');
  const [allCheck, setAllCheck] = React.useState(false);
  const [useCheck, setUseCheck] = React.useState(false);
  const [infoCheck, setInfoCheck] = React.useState(false);
  const [marketingCheck, setMarketingCheck] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const SignupSchema = yup.object().shape({
    email: yup.string().email('이메일 형식에 맞지 않습니다.').required('필수 정보입니다.'),
    pwd: yup.string().required('필수 정보입니다.')
      .matches(/^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,15}$/, '8~15자 영문, 숫자를 사용하세요.'),
    checkPwd: yup.string().required('필수 정보입니다.').oneOf([yup.ref('pwd'), 'null'], '비밀번호가 일치하지 않습니다.'),
    name: yup.string().required('필수 정보입니다.').matches(/^[a-zA-Z가-힣]{1,}$/, '한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)'),
    birth: yup.string().test(
      'len',
      '생년월일은 8자리로 입력해주세요.',
      (val) => val?.length === 8 || !val,
    ),
    nickname: yup.string().required('필수 정보입니다.'),
    term1: yup.boolean().oneOf([true], '약관에 동의해주세요.'),
    term2: yup.boolean().oneOf([true], '약관에 동의해주세요.'),
  });

  const methods = useForm<SignUpForm>({
    resolver: yupResolver(SignupSchema),
    mode: 'all', // 'onBlur',onTouched, onSubmit
    // defaultValues,
  });

  const {
    control,
    // getValues,
    handleSubmit,
    formState: { errors },
    // formState,
    setError, clearErrors,
  } = methods;

  const allBtnEvent = () => { // 전체 동의
    if (allCheck === false) {
      setAllCheck(true);
      setInfoCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
      // clearErrors('term1');
      // clearErrors('term2');
    } else {
      setAllCheck(false);
      setInfoCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
      // setError('term1', { message: '이용약관에 동의해야 합니다.' });
      // setError('term2', { message: '개인정보 수집 및 이용에 동의해야 합니다.' });
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
      // clearErrors('term1');
    } else {
      setUseCheck(false);
      // setError('term1', { message: '이용약관에 동의해야 합니다.' });
    }
  };

  const infoBtnEvent = () => {
    if (infoCheck === false) {
      setInfoCheck(true);
      // clearErrors('term2');
    } else {
      setInfoCheck(false);
      // setError('term2', { message: '개인정보 수집 및 이용에 동의해야 합니다.' });
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
  }, [infoCheck, useCheck, marketingCheck]);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<SignUpForm>({
  //   mode: 'onChange',
  //   reValidateMode: 'onChange',
  //   resolver: yupResolver(SignupSchema),
  // });

  const submitForm: SubmitHandler<SignUpForm> = (data: any) => console.log(data);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault(); // form 전송
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

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
          <Box component="form" onSubmit={handleSubmit(submitForm)} sx={{ mt: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      id="email"
                      label="이메일"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="pwd"
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      id="pwd"
                      label="비밀번호"
                      name="pwd"
                      type="password"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="checkPwd"
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      id="checkPwd"
                      label="비밀번호 재확인"
                      name="checkPwd"
                      type="password"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      name="name"
                      label="이름"
                      type="name"
                      id="name"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="birth"
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      name="birth"
                      label="생년월일"
                      type="birth"
                      id="birth"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="gender">성별</InputLabel>
                  <Select
                    labelId="gender"
                    id="gender"
                    value={gender}
                    label="성별"
                    onChange={handleChange}
                  >
                    <MenuItem value="성별">성별</MenuItem>
                    <MenuItem value="여성">여성</MenuItem>
                    <MenuItem value="남성">남성</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="nickname"
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      name="nickname"
                      label="닉네임"
                      type="nickname"
                      id="nickname"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={<CustomCheckbox value="termAll" id="all-check" checked={allCheck} onChange={allBtnEvent} />}
                  label="전체동의"
                />
                <p /> */}
                <Controller
                  name="term1"
                  control={control}
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      control={<CustomCheckbox value="term1" id="check1" checked={value} onChange={(e:any) => onChange(e.target.checked)} />}
                      label="이용약관 동의(필수)"
                    />
                  )}
                />
                <Controller
                  name="term2"
                  control={control}
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      control={<CustomCheckbox value="term2" id="check2" checked={value} onChange={(e:any) => onChange(e.target.checked)} />}
                      label="개인정보 수집 및 이용 동의(필수)"
                    />
                  )}
                />
                <Controller
                  name="term3"
                  control={control}
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      control={<CustomCheckbox value="term3" id="check3" checked={value} onChange={(e:any) => onChange(e.target.checked)} />}
                      label="마케팅약관 동의(선택)"
                    />
                  )}
                />
                {/* <FormControlLabel
                  control={<CustomCheckbox value="term1" id="term1" checked={useCheck} onChange={useBtnEvent} />}
                  label="이용약관 동의(필수)"
                /> */}
                {/* <FormControlLabel
                  control={<CustomCheckbox value="term2" id="check2" checked={infoCheck} onChange={infoBtnEvent} />}
                  label="개인정보 수집 및 이용 동의(필수)"
                />
                <FormControlLabel
                  control={<CustomCheckbox value="term3" id="check3" checked={marketingCheck} onChange={marketingBtnEvent} />}
                  label="마케팅약관 동의(선택)"
                /> */}
              </Grid>
              { (errors.term1 || errors.term2) && (
                <p style={{
                  color: 'red',
                  // alignItems: 'center',
                }}
                >
                  이용약관과 개인정보 수집 및 이용 약관에 동의가 필요합니다.
                </p>
              )}
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
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}