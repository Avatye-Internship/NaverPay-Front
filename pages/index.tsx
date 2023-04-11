import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import axios from 'axios';
import { useState } from 'react';
import ResponseDto from '@/src/ResponseDto';
import { useCookies } from 'react-cookie';
import { getCookie, setCookie } from '@/src/cookie';

const inter = Inter({ subsets: ['latin'] })
const signUpBody = {
  nickname : "test2",
  profileImg : "ㅇㅇ",
  email : "test2@naver.com",
  pwd : "1111",
  name : "이름",
  gender : "여성",
  birth : "20011227",
  terms : [
      {
          term_id : 4,
          is_agree : 1
      },
      {
          term_id : 5,
          is_agree : 1
      },
      {
          term_id : 6,
          is_agree : 1
      }
  ]
}

const profileBody = {
  name:"dd",
  phone:"010-3333-2222"
}

const findPwdBody = {
  email : "이메일",
  newPwd : "새 비밀번호"
}

const loginBody = { 
  email : "test2@naver.com", // 아이디
	pwd : "1111" // 비번
}

export default function Home() {
  // const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  // 내 정보 조회
  async function findMyDetail() {
    try {
      const data = await axios.get('/api/users').then((res) => { console.log(res.data); return res.data})
      console.log('mydetail page', data.data)
    } catch (error) {
      console.log(error)
    }
  }
  // 로컬 로그인
  async function localLogin() {
    try {
      const data = await axios.post('/api/users/login/local',loginBody)
        .then((res) => {
          console.log('index page',res.data);
          setCookie('accessToken', res.data.data['token'], { path: "/", secure: true, sameSite: "none"}) // 쿠키에 토큰 저장
    })} catch (error) {
      console.log(error)
    }
    return ;
  }
  // 회원가입
  async function signUp() {
    let data;
    try {
      data =  await axios.post('/api/users', signUpBody)
      console.log('signup page', data.data)
    } catch (error) {
      console.log(error)
    }
    console.log(data)
   return data;

  }
  // 닉네임, 프로필이미지만 조회
  async function findUserBasicInfo() {
    const data = await axios.get('/api/users/basic-info').then((res) => console.log('index tsx', res.data))
    return data;
  }

  // 이메일 유효성 인증
  async function checkEmail() {
    const data = await axios.post('/api/users/check/email', { email: 'ddddd'})
    return data
  }
  // 비밀번호 찾기
  async function findPwd() {
    const data = await axios.patch('/api/users/find/pwd', findPwdBody)
    return data
  }
  // 소셜 로그인
  async function socialLogin() {
    const data = await axios.get('http://localhost:8000/api/users/login/kakao')
    return data
  }

  return (
 <>
<div>
<button onClick={findMyDetail}>
회원 정보 가져오기
</button>
<p></p>
<button onClick={findUserBasicInfo}>
회원 닉네임, 프로필 가져오기
</button>
<p></p>
<button onClick={signUp}>
회원가입
</button>
<p></p>
<button onClick={localLogin}>
로컬 로그인
</button>
<p></p>
<button onClick={socialLogin}>
소셜 로그인
</button>
<div>
  <Link href="http://localhost:8000/api/users/login/kakao"><h1>소셜로그인 링크</h1></Link>
</div>
 </div>
</>
  )
}
