// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root'),
// );

import Link from 'next/link';
import axios from 'axios';
import { setCookie } from '@/src/cookie';

const signUpBody = {
  nickname: 'test2',
  profileImg: 'ㅇㅇ',
  email: 'skarudals27@naver.com',
  pwd: '1111',
  name: '이름',
  gender: null,
  birth: '20011227',
  terms: [
    {
      term_id: 1,
      is_agree: 1,
    },
    {
      term_id: 2,
      is_agree: 1,
    },
    {
      term_id: 3,
      is_agree: 1,
    },
  ],
};

const profileBody = {
  name: 'dd',
  phone: '010-3333-2222',
};

const findPwdBody = {
  email: '이메일',
  newPwd: '새 비밀번호',
};

const loginBody = {
  email: 'skarudals27@naver.com', // 아이디
  pwd: '1111', // 비번
};

const productId = {
  id: 1,
};

async function test() {
  await fetch('/api/users', { method: 'GET' })
    .then((res) => res.json)
    .then((data) => console.log(data));
}

export default function Home() {
  // const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  // 내 정보 조회
  async function findMyDetail() {
    try {
      const data = await axios.get('/api/users').then((res) => { console.log(res.data); return res.data; });
      console.log('mydetail page', data.data);
    } catch (error) {
      console.log(error);
    }
  }
  // 로컬 로그인
  async function localLogin() {
    try {
      await axios.post('/api/users/login/local', loginBody)
        .then((res) => {
          console.log('index page', res.data);
          setCookie('accessToken', res.data.data.token, { path: '/', secure: true, sameSite: 'none' }); // 쿠키에 토큰 저장
        });
    } catch (error) {
      console.log(error);
    }
    return 1;
  }
  // 회원가입
  async function signUp() {
    let data;
    try {
      data = await axios.post('/api/users', signUpBody);
      console.log('signup page', data.data);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
    return data;
  }
  // 닉네임, 프로필이미지만 조회
  async function findUserBasicInfo() {
    const data = await axios.get('/api/users/basic-info').then((res) => console.log('index tsx', res.data));
    return data;
  }

  // 이메일 유효성 인증
  async function checkEmail() {
    const data = await axios.post('/api/users/check/email', { email: 'ngm9464@gmail.com' });
    return data;
  }
  // 비밀번호 찾기
  async function findPwd() {
    const data = await axios.patch('/api/users/find/pwd', findPwdBody);
    return data;
  }
  // 소셜 로그인
  async function socialLogin() {
    const data = await axios.get('http://localhost:8000/api/users/login/kakao');
    return data;
  }

  // 포인트 조회
  async function findPoint() {
    const data = await axios.get('/api/users/point').then((res) => console.log(res.data));
    return data;
  }
  // 상품 id별 조회
  async function findProductById() {
    const data = await axios.get('/api/product/ads/1').then((res) => console.log(res.data));
    return data;
  }
  // 카테고리별 상품 조회
  async function findProductByCategory() {
    const data = await axios.get('/api/product', { params: { category: 'card' } }).then((res) => console.log(res.data));
    return data;
  }
  // 참여 상태 수정 및 포인트 적립
  async function updatePointByStatus() {
    const data = await axios.get('/api/product/ads/1/user-status').then((res) => console.log(res.data));
    return data;
  }

  return (
    <div>
      <button type="button" onClick={test}>test</button>
      <button type="button" onClick={findMyDetail}>
        회원 정보 가져오기
      </button>
      <p />
      <button type="button" onClick={findUserBasicInfo}>
        회원 닉네임, 프로필 가져오기
      </button>
      <p />
      <button type="button" onClick={signUp}>
        회원가입
      </button>
      <p />
      <button type="button" onClick={localLogin}>
        로컬 로그인
      </button>
      <p />
      <button type="button" onClick={socialLogin}>
        소셜 로그인
      </button>
      <p />
      <button type="button" onClick={findPoint}>
        포인트 조회
      </button>
      <p />
      <button type="button" onClick={findProductById}>
        상품 id별 조회
      </button>
      <p />
      <button type="button" onClick={findProductByCategory}>
        상품 카테고리별 조회
      </button>
      <p />
      <button type="button" onClick={updatePointByStatus}>
        참여 상태 수정 및 포인트 적립
      </button>
      <div>
        <Link href="/login">로그인페이지 링크</Link>
      </div>
      <div>
        <button type="button" onClick={findMyDetail}>
          회원 정보 가져오기
        </button>
        <p />
        <button type="button" onClick={findUserBasicInfo}>
          회원 닉네임, 프로필 가져오기
        </button>
        <p />
        <button type="button" onClick={signUp}>
          회원가입
        </button>
        <p />
        <button type="button" onClick={localLogin}>
          로컬 로그인
        </button>
        <p />
        <button type="button" onClick={socialLogin}>
          소셜 로그인
        </button>
        <button type="button" onClick={checkEmail}>
          이메일 유효성 인증
        </button>
        <div>
          <Link href="http://localhost:8000/api/users/login/kakao">소셜로그인 링크</Link>
        </div>
        <div>
          <Link href="/heesootest">테스트 페이지</Link>

        </div>
      </div>
    </div>
  );
}
